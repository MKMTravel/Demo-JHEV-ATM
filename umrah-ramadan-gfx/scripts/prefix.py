import sys, sherpa_onnx, soundfile as sf, numpy as np, glob
M=sys.argv[1]; d=glob.glob(M+'/sherpa-onnx-whisper-medium/*')
enc=[x for x in d if 'encoder.int8' in x][0]; dec=[x for x in d if 'decoder.int8' in x][0]; tok=[x for x in d if 'tokens' in x][0]
rec=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=enc, decoder=dec, tokens=tok, language="ms", task="transcribe", num_threads=4)
cache={}
for spec in sys.argv[2:]:
    w,a,b,st=spec.split(':'); a=float(a); b=float(b); st=float(st)
    if w not in cache: cache[w]=sf.read(w,dtype='float32')[0]
    print('##',w,a,b,flush=True); prev=None; t=a+0.5
    while t<=b+0.01:
        x=cache[w][int(a*16000):int(t*16000)]
        s=rec.create_stream(); s.accept_waveform(16000,x); rec.decode_stream(s)
        if s.result.text!=prev: print(f"  ..{t:.2f}: {s.result.text}",flush=True); prev=s.result.text
        t+=st
