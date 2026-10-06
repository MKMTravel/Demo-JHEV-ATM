import sys, sherpa_onnx, soundfile as sf, numpy as np, glob
M=sys.argv[1]; wavs=sys.argv[2:]
d=glob.glob(M+'/sherpa-onnx-whisper-medium/*')
enc=[x for x in d if 'encoder.int8' in x][0]; dec=[x for x in d if 'decoder.int8' in x][0]; tok=[x for x in d if 'tokens' in x][0]
rec=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=enc, decoder=dec, tokens=tok, language="ms", task="transcribe", num_threads=4)
cfg=sherpa_onnx.VadModelConfig(); cfg.silero_vad.model=M+'/silero_vad.onnx'; cfg.silero_vad.min_silence_duration=0.35; cfg.silero_vad.max_speech_duration=8; cfg.sample_rate=16000
for w in wavs:
    a,sr=sf.read(w, dtype='float32')
    vad=sherpa_onnx.VoiceActivityDetector(cfg, buffer_size_in_seconds=120)
    segs=[]; ws=512
    for i in range(0,len(a),ws):
        vad.accept_waveform(a[i:i+ws])
        while not vad.empty(): segs.append((vad.front.start, vad.front.samples)); vad.pop()
    vad.flush()
    while not vad.empty(): segs.append((vad.front.start, vad.front.samples)); vad.pop()
    print('==', w, flush=True)
    for st,smp in segs:
        s=rec.create_stream(); s.accept_waveform(16000, np.array(smp, dtype=np.float32)); rec.decode_stream(s)
        print(f"{st/16000:6.2f}-{(st+len(smp))/16000:6.2f} {s.result.text}", flush=True)
