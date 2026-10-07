import subprocess
S='/tmp/claude-0/-home-user-Demo-JHEV-ATM/9ad433fd-22ed-5e3b-8351-44a750dfbb1f/scratchpad'
M='/home/user/Demo-JHEV-ATM/ramadan2-gfx/MOV'
off={1:0,2:40.588,0:82.5}
items=[('01_T1-RamaiSangatOrang',1,0.2),('02_T2-SekaliSeumurHidup',1,4.3),('03_T3-JanganAmbilRisiko',1,10.3),('04_C1-MusimPalingSibuk_part1',1,13.3),('04_C1-MusimPalingSibuk_part2',1,13.3+101/30),
('05_T4-PilihAgensiDipercayai',1,20.7),('06_T5-JomBersamaMKM',1,26.85),('07_C2-PJH-Rekod100_part1',1,33.3),('07_C2-PJH-Rekod100_part2',1,33.3+108/30),
('08_C3-DirectFlight',2,0.2),('09_T6-15Tahun',2,5.75),('10_C4-Hotel_part1',2,9.05),('10_C4-Hotel_part2',2,9.05+107/30),('10_C4-Hotel_part3',2,9.05+214/30),
('11_C5-HadiahPercuma',2,19.95),('12_T7-JomDaftar-SlotTerhad',2,26.75),('13_CTA-KlikLink',2,37.95),('14_EndCard-Summary_part1',0,0),('14_EndCard-Summary_part2',0,2),('14_EndCard-Summary_part3',0,4)]
cmd=['ffmpeg','-v','error','-y','-i',f'{S}/r2/src/q1.mp4','-i',f'{S}/r2/src/q2.mp4']
for n,_,_ in items: cmd+=['-i',f'{M}/{n}.mov']
fc=['[0:v]scale=1080:1920,fps=30,setsar=1[v0];[0:a]aresample=48000[a0];[1:v]scale=1080:1920,fps=30,setsar=1[v1];[1:a]aresample=48000[a1]',
    '[v0][a0][v1][a1]concat=n=2:v=1:a=1[cv][ca];[cv]tpad=stop_mode=add:stop_duration=6:color=black[b0];[ca]apad=pad_dur=6[aout]']
prev='b0'
for i,(n,p,t) in enumerate(items):
    fc.append(f'[{i+2}:v]setpts=PTS-STARTPTS+{off[p]+t:.3f}/TB[g{i}];[{prev}][g{i}]overlay=eof_action=pass:format=auto[o{i}]'); prev=f'o{i}'
fc.append(f'[{prev}]scale=720:1280,format=yuv420p[vout]')
cmd+=['-filter_complex',';'.join(fc),'-map','[vout]','-map','[aout]','-t','88.5','-c:v','libx264','-preset','medium','-b:v','2300k','-maxrate','3000k','-bufsize','5000k','-c:a','aac','-b:a','128k','-movflags','+faststart',
 '/home/user/Demo-JHEV-ATM/ramadan2-gfx/preview/Preview_Ramadan2_GFX.mp4']
print('rc',subprocess.run(cmd).returncode)
