#!/bin/bash
S=/tmp/claude-0/-home-user-Demo-JHEV-ATM/9ad433fd-22ed-5e3b-8351-44a750dfbb1f/scratchpad
cd $S/remo
OUT=/home/user/Demo-JHEV-ATM/umrah-ramadan-gfx/MOV; mkdir -p $OUT out/seq
B=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
npx remotion bundle src/index.ts --out-dir=out/bundle >/dev/null 2>&1
for id in $(grep -o "id: '[0-9][0-9]_[^']*'" src/Root.tsx | sed "s/id: '//;s/'//"); do
  cid=${id//_/-}; rm -rf out/seq/$id
  npx remotion render out/bundle $cid out/seq/$id --sequence --image-format=png --concurrency=4 --browser-executable=$B --log=error || { echo "FAIL $id"; continue; }
  first=$(ls out/seq/$id | head -1); pat=$(echo $first | sed -E 's/[0-9]+\.png$//'); nd=$(echo $first | sed -E 's/.*-([0-9]+)\.png$/\1/' | tr -d '\n' | wc -c)
  ffmpeg -v error -y -framerate 30 -start_number 0 -i out/seq/$id/${pat}%0${nd}d.png -c:v prores_ks -profile:v 4444 -qscale:v 9 -pix_fmt yuva444p10le -alpha_bits 8 -vendor apl0 $OUT/$id.mov && echo "OK $id $(du -m $OUT/$id.mov | cut -f1)MB"
done
echo ALLDONE
