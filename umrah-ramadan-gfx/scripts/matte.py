import sys, os, cv2, numpy as np, onnxruntime as ort
src, out, t0, t1 = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4])
W, H = 1080, 1920
os.makedirs(out, exist_ok=True)
so = ort.SessionOptions(); so.intra_op_num_threads = 2
sess = ort.InferenceSession(os.environ.get("U2NET", "u2net_human_seg.onnx"), so, providers=["CPUExecutionProvider"])
iname = sess.get_inputs()[0].name
mean = np.array([0.485, 0.456, 0.406], np.float32); std = np.array([0.229, 0.224, 0.225], np.float32)
cap = cv2.VideoCapture(src); fps = cap.get(cv2.CAP_PROP_FPS)
cap.set(cv2.CAP_PROP_POS_FRAMES, int(round(t0 * fps)))
prev = None
for i in range(int(round((t1 - t0) * fps))):
    ok, bgr = cap.read()
    if not ok: break
    x = cv2.resize(cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB), (320, 320), interpolation=cv2.INTER_AREA).astype(np.float32) / 255.0
    d = sess.run(None, {iname: ((x - mean) / std).transpose(2, 0, 1)[None]})[0][0, 0]
    d = (d - d.min()) / (d.max() - d.min() + 1e-6)
    m = cv2.resize(d, (W, H), interpolation=cv2.INTER_LINEAR)
    if prev is not None: m = 0.65 * m + 0.35 * prev   # less flicker
    prev = m
    m = cv2.GaussianBlur(np.clip((m - 0.35) / 0.4, 0, 1), (0, 0), 1.6)
    big = cv2.resize(bgr, (W, H), interpolation=cv2.INTER_LANCZOS4)
    cv2.imwrite(f"{out}/c_{i:04d}.png", np.dstack([big, (m * 255).astype(np.uint8)]))
