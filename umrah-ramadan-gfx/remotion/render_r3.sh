#!/bin/bash
S=/tmp/claude-0/-home-user-Demo-JHEV-ATM/9ad433fd-22ed-5e3b-8351-44a750dfbb1f/scratchpad
cd $S/remo
OUT=/home/user/Demo-JHEV-ATM/malam10-gfx/MOV; mkdir -p $OUT out/seq4
B=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
LIM=31457280
npx remotion bundle src/index3.ts --out-dir=out/bundle3 >/dev/null 2>&1
for id in $(grep -o "id: '[0-9][0-9]b\?_[^']*'" src/Root3.tsx | sed "s/id: '//;s/'//"); do
  cid=${id//_/-}; rm -rf "out/seq4/${id:?}"
  npx remotion render out/bundle3 $cid out/seq4/$id --sequence --image-format=png --concurrency=4 --browser-executable=$B --log=error || { echo "FAIL $id"; continue; }
  first=$(ls out/seq4/$id | head -1); pat=$(echo $first | sed -E 's/[0-9]+\.png$//'); nd=$(echo $first | sed -E 's/.*-([0-9]+)\.png$/\1/' | tr -d '\n' | wc -c); N=$(ls out/seq4/$id | wc -l); IN="out/seq4/$id/${pat}%0${nd}d.png"
  enc(){ ffmpeg -v error -y -framerate 30 -start_number $1 -i $IN -frames:v $2 -c:v prores_ks -profile:v 4444 -qscale:v $3 -pix_fmt yuva444p10le -alpha_bits 8 -vendor apl0 $4; }
  enc 0 $N 9 $OUT/$id.mov
  if [ $(stat -c%s $OUT/$id.mov) -gt $LIM ]; then enc 0 $N 16 $OUT/$id.mov; fi
  if [ $(stat -c%s $OUT/$id.mov) -gt $LIM ]; then
    rm -f "${OUT:?}/${id:?}.mov"; per=$(( (N + 2) / 3 ))
    for k in 0 1 2; do st=$((k*per)); n=$per; [ $((st+n)) -gt $N ] && n=$((N-st)); enc $st $n 12 $OUT/${id}_part$((k+1)).mov; echo "OK ${id}_part$((k+1)) offset=$(python3 -c "print(round($st/30,2))") $(stat -c%s $OUT/${id}_part$((k+1)).mov)"; done
  else echo "OK $id $(stat -c%s $OUT/$id.mov)"; fi
done
echo ALLDONE
