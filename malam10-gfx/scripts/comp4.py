import sys, os, re, cv2, numpy as np, subprocess
S=sys.argv[1]; out=sys.argv[2]; files=sys.argv[3:]
M={'01':11.85,'02':15.2,'03':17.1,'04':23.9,'05':27.7,'06':33.1,'07':36.15,'08':40.45,'09':43.7,'10':47.0,'11':49.35,'12':51.5,'12b':51.5,'13':53.0}
tiles=[]
for f in files:
    b=os.path.basename(f); k=b.split('-')[0]; n=int(re.search(r'@(\d+)',b).group(1))
    t=M[k]+n/30 if k!='13' else 53.0
    tmp=f'{S}/r3/work/_bg.png'
    subprocess.run(['ffmpeg','-v','error','-y','-ss',f'{t:.3f}','-i',f'{S}/r3/src/m.mp4','-frames:v','1','-vf','scale=1080:1920',tmp])
    bg=cv2.imread(tmp).astype(np.float32); fg=cv2.imread(f,cv2.IMREAD_UNCHANGED).astype(np.float32)
    if fg.shape[2]==3: fg=np.dstack([fg,np.full(fg.shape[:2],255,np.float32)])
    a=fg[:,:,3:4]/255; c=fg[:,:,:3]*a+bg*(1-a)
    c=cv2.resize(c.astype(np.uint8),(432,768),interpolation=cv2.INTER_AREA)
    cv2.putText(c,b[:26],(8,760),cv2.FONT_HERSHEY_SIMPLEX,0.45,(0,255,255),1); tiles.append(c)
while len(tiles)%8: tiles.append(np.zeros_like(tiles[0]))
cv2.imwrite(out,np.vstack([np.hstack(tiles[i:i+8]) for i in range(0,len(tiles),8)]))
