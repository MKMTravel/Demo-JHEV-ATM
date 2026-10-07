import sys, os, re, cv2, numpy as np, subprocess, glob
S=sys.argv[1]; out=sys.argv[2]; files=sys.argv[3:]
M={'01':(1,0.3),'02':(1,0.3),'03':(1,5.62),'04':(1,13.85),'05':(1,19.05),'06':(2,6.75),'07':(2,10.55),'08':(2,16.95),'09':(3,0.2),'10':(3,7.2),'11':(3,12.5),'12':(3,23.75),'13':(3,30.95),'14':(3,32.55),'15':(3,39.65),'16':(3,42.05),'17':(3,44.95),'18':(3,46.5)}
tiles=[]
for f in files:
    b=os.path.basename(f); k=b[:2]; part,fr=M[k]
    n=int(re.search(r'@(\d+|last)',b).group(1)) if 'last' not in b else None
    if n is None:
        n=int(open(f+'.n').read()) if os.path.exists(f+'.n') else 0
    t=fr+n/30 if k!='18' else 46.5
    tmp=f'{S}/work/_bg.png'
    subprocess.run(['ffmpeg','-v','error','-y','-ss',f'{t:.3f}','-i',f'{S}/src/pt{part}.mp4','-frames:v','1','-vf','scale=1080:1920',tmp])
    bg=cv2.imread(tmp).astype(np.float32); fg=cv2.imread(f,cv2.IMREAD_UNCHANGED).astype(np.float32)
    if fg.shape[2]==3: fg=np.dstack([fg,np.full(fg.shape[:2],255,np.float32)])
    a=fg[:,:,3:4]/255; c=fg[:,:,:3]*a+bg*(1-a)
    c=cv2.resize(c.astype(np.uint8),(432,768),interpolation=cv2.INTER_AREA)
    cv2.putText(c,b[:22],(8,760),cv2.FONT_HERSHEY_SIMPLEX,0.45,(0,255,255),1)
    tiles.append(c)
while len(tiles)%5: tiles.append(np.zeros_like(tiles[0]))
rows=[np.hstack(tiles[i:i+5]) for i in range(0,len(tiles),5)]
cv2.imwrite(out,np.vstack(rows))
