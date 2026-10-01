#!/bin/bash
# usage: check.sh  -> renders stills at (id, frame) pairs and composites over the offline edit
SRC=$(ls /root/.claude/uploads/*/*sketch_2.mp4 | head -1)
BUG=${BUG:-}
mkdir -p out/chk && rm -f out/chk/*
i=0
while read id fr; do
  [ -z "$id" ] && continue
  from=$(node -e "const s=require('fs').readFileSync('src/Root.tsx','utf8');const m=s.match(/id: '$id', from: ([0-9.]+)/);console.log(m[1])")
  t=$(node -e "console.log(($from+$fr/30).toFixed(3))")
  npx remotion still src/index.ts $id out/chk/g_$i.png --frame=$fr </dev/null >/dev/null 2>&1
  ffmpeg -nostdin -v error -y -ss $t -i "$SRC" -frames:v 1 out/chk/v_$i.png
  ffmpeg -nostdin -v error -y -i out/chk/v_$i.png -i out/chk/g_$i.png -filter_complex "[0]scale=1080:1920[b];[b][1]overlay,crop=1080:960:0:880,scale=720:-1" out/chk/c_$i.png
  i=$((i+1))
done
ffmpeg -nostdin -v error -y -framerate 1 -i out/chk/c_%d.png -vf tile=${COLS:-6}x${ROWS:-2} -frames:v 1 out/sheet.png
