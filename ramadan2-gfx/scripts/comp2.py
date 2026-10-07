import sys, os, re, cv2, numpy as np, subprocess
S=sys.argv[1]; out=sys.argv[2]; files=sys.argv[3:]
M={'01':(1,0.2),'02':(1,4.3),'03':(1,10.3),'04':(1,13.3),'05':(1,20.7),'06':(1,26.85),'07':(1,33.3),'08':(2,0.2),'09':(2,5.75),'10':(2,9.05),'11':(2,19.95),'12':(2,26.75),'13':(2,37.95),'14':(2,41.0)}
tiles=[]
for f in files:
    b=os.path.basename(f); k=b[:2]; part,fr=M[k]; n=int(re.search(r'@(\d+)',b).group(1))
    t=fr+n/30 if k!='14' else 41.0
    tmp=f'{S}/r2/work/_bg.png'
    subprocess.run(['ffmpeg','-v','error','-y','-ss',f'{t:.3f}','-i',f'{S}/r2/src/q{part}.mp4','-frames:v','1','-vf','scale=1080:1920',tmp])
    bg=cv2.imread(tmp).astype(np.float32); fg=cv2.imread(f,cv2.IMREAD_UNCHANGED).astype(np.float32)
    if fg.shape[2]==3: fg=np.dstack([fg,np.full(fg.shape[:2],255,np.float32)])
    a=fg[:,:,3:4]/255; c=fg[:,:,:3]*a+bg*(1-a)
    c=cv2.resize(c.astype(np.uint8),(432,768),interpolation=cv2.INTER_AREA)
    cv2.putText(c,b[:24],(8,760),cv2.FONT_HERSHEY_SIMPLEX,0.45,(0,255,255),1); tiles.append(c)
while len(tiles)%7: tiles.append(np.zeros_like(tiles[0]))
cv2.imwrite(out,np.vstack([np.hstack(tiles[i:i+7]) for i in range(0,len(tiles),7)]))
