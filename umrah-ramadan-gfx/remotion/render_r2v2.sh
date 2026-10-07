#!/bin/bash
S=/tmp/claude-0/-home-user-Demo-JHEV-ATM/9ad433fd-22ed-5e3b-8351-44a750dfbb1f/scratchpad
cd $S/remo
OUT=/home/user/Demo-JHEV-ATM/ramadan2-gfx/MOV_v2; mkdir -p $OUT out/seq3
B=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
npx remotion bundle src/index2.ts --out-dir=out/bundle2 >/dev/null 2>&1
for id in $(grep -o "id: '[0-9][0-9]_[^']*'" src/Root2.tsx | sed "s/id: '//;s/'//"); do
  cid=${id//_/-}; rm -rf "out/seq3/${id:?}"
  npx remotion render out/bundle2 $cid out/seq3/$id --sequence --image-format=png --concurrency=4 --browser-executable=$B --log=error || { echo "FAIL $id"; continue; }
  first=$(ls out/seq3/$id | head -1); pat=$(echo $first | sed -E 's/[0-9]+\.png$//'); nd=$(echo $first | sed -E 's/.*-([0-9]+)\.png$/\1/' | tr -d '\n' | wc -c)
  ffmpeg -v error -y -framerate 30 -start_number 0 -i out/seq3/$id/${pat}%0${nd}d.png -c:v prores_ks -profile:v 4444 -qscale:v 9 -pix_fmt yuva444p10le -alpha_bits 8 -vendor apl0 $OUT/$id.mov && echo "OK $id $(stat -c%s $OUT/$id.mov)"
done
echo ALLDONE
