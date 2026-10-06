import cv2, numpy as np, sys
for n in sys.argv[1:]:
    cap=cv2.VideoCapture(n); fps=cap.get(5); prev=None; d=[]; i=0
    while True:
        ok,f=cap.read()
        if not ok: break
        g=cv2.resize(cv2.cvtColor(f,cv2.COLOR_BGR2GRAY),(90,160)).astype(np.float32)
        if prev is not None: d.append((np.abs(g-prev).mean(), i))
        prev=g; i+=1
    cuts=sorted([x for x in d if x[0]>18], key=lambda x:x[1])
    print(n, i, fps, [(round(t/fps,2), round(v,1)) for v,t in cuts])
