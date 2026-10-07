import subprocess, os, glob
S='/tmp/claude-0/-home-user-Demo-JHEV-ATM/9ad433fd-22ed-5e3b-8351-44a750dfbb1f/scratchpad'
M='/home/user/Demo-JHEV-ATM/umrah-ramadan-gfx/MOV'
off={1:0,2:21.873,3:41.076,4:88.793}
items=[('01_P1-Hook_BEHIND',1,0.3),('CUT',1,0.3),('02_P1-Hook_FRONT',1,0.3),('03_T1-BerbukaDepanKaabah',1,5.62),('04_P2-PahalaMenyamaiHaji',1,13.85),('05_T2-Hadis',1,19.05),
('05b_P8-RamaiNakKejar',2,0.25),('06_T3-TravelDipercayai',2,6.75),('07_C1-StatusPJH',2,10.55),('08_P3-100Trusted',2,16.95),('09_C2-DirectFlight',3,0.2),('10_P4-15Tahun',3,7.2),
('11_C3-Hotel_part1',3,12.5),('11_C3-Hotel_part2',3,12.5+3.7),('11_C3-Hotel_part3',3,12.5+7.4),('12_T4-DiskaunAnak',3,23.75),('13_P5-RM2000',3,30.95),
('14_C4-PakejTermasuk_part1',3,32.55),('14_C4-PakejTermasuk_part2',3,32.55+104/30),('15_P6-Percuma',3,39.65),('16_P7-SangatTerhad',3,42.05),('17_CTA-KlikLink',3,44.95),
('18_EndCard-Summary_part1',4,0),('18_EndCard-Summary_part2',4,2),('18_EndCard-Summary_part3',4,4)]
cmd=['ffmpeg','-v','error','-y']
for p in (1,2,3): cmd+=['-i',f'{S}/src/pt{p}.mp4']
for n,_,_ in items:
    if n=='CUT': cmd+=['-framerate','30','-i',f'{S}/matte/cut1/c_%04d.png']
    else: cmd+=['-i',f'{M}/{n}.mov']
fc=[]
for p in (0,1,2): fc.append(f'[{p}:v]scale=1080:1920,fps=30,setsar=1[v{p}];[{p}:a]aresample=48000[a{p}]')
fc.append('[v0][a0][v1][a1][v2][a2]concat=n=3:v=1:a=1[cv][ca];[cv]tpad=stop_mode=add:stop_duration=6:color=black[b0];[ca]apad=pad_dur=6[aout]')
prev='b0'
for i,(n,p,t) in enumerate(items):
    T=off[p]+t; k=i+3
    fc.append(f'[{k}:v]setpts=PTS-STARTPTS+{T:.3f}/TB[g{i}];[{prev}][g{i}]overlay=eof_action=pass:format=auto[o{i}]')
    prev=f'o{i}'
fc.append(f'[{prev}]scale=720:1280,format=yuv420p[vout]')
cmd+=['-filter_complex',';'.join(fc),'-map','[vout]','-map','[aout]','-t','94.79','-c:v','libx264','-preset','medium','-b:v','2200k','-maxrate','3000k','-bufsize','5000k','-c:a','aac','-b:a','128k','-movflags','+faststart',
 '/home/user/Demo-JHEV-ATM/umrah-ramadan-gfx/preview/Preview_UmrahRamadan_GFX.mp4']
r=subprocess.run(cmd); print('rc',r.returncode)
