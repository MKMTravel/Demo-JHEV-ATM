#!/bin/bash
# Renders every graphic to a transparent ProRes 4444 .mov (30fps, 1080x1920) in ../haramain-overlays
set -e
cd "$(dirname "$0")"
OUT=../haramain-overlays; mkdir -p $OUT out/seq
for id in $(node -e "const s=require('fs').readFileSync('src/Root.tsx','utf8');for(const m of s.matchAll(/id: '([^']+)'/g))console.log(m[1])"); do
  rm -rf out/seq/$id
  npx remotion render src/index.ts $id out/seq/$id --sequence --image-format=png </dev/null >/dev/null 2>&1
  first=$(ls out/seq/$id | head -1); pat=$(echo $first | sed -E 's/[0-9]+\.png/%0LEN.png/'); n=$(echo $first | sed -E 's/.*-([0-9]+)\.png/\1/'); len=${#n}; pat=${pat/LEN/${len}d}
  name=$(echo $id | sed -E 's/^([0-9]{2})-/\1_/')
  ffmpeg -nostdin -v error -y -framerate 30 -i out/seq/$id/$pat -c:v prores_ks -profile:v 4444 -qscale:v ${Q:-9} -pix_fmt yuva444p10le -alpha_bits 8 -vendor apl0 $OUT/$name.mov
  echo "$name $(du -h $OUT/$name.mov | cut -f1)"
done
echo DONE
