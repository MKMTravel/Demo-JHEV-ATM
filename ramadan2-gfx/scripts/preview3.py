import subprocess
S='/tmp/claude-0/-home-user-Demo-JHEV-ATM/9ad433fd-22ed-5e3b-8351-44a750dfbb1f/scratchpad'
M='/home/user/Demo-JHEV-ATM/ramadan2-gfx/MOV_v2'
off={1:0,2:40.588,0:82.5}
items=[('01_P1-Hook-RamaiSangatOrang',1,0.2),('02_P2-SekaliSeumurHidup',1,4.3),('03_P3-JanganAmbilRisiko',1,10.0),('04_T1-MusimPalingSibuk',1,13.3),('05_T2-TiketHotel',1,16.45),
('06_P4-SemuaOrangBerebut',1,18.35),('07_T3-PilihAgensiDipercayai',1,20.6),('08_T4-JomBersamaMKM',1,26.85),('09_C1-StatusPJH',1,31.15),('10_P5-RekodTerbang100',1,36.3),
('11_C2-DirectFlight',2,0.2),('12_P6-15Tahun',2,5.75),('13_C3-Hotel',2,9.05),('14_T5-QiamTerawih',2,13.7),('15_C4-HadiahEksklusif',2,19.95),('16_P7-Percuma',2,23.1),
('17_T6-JomDaftar',2,26.75),('18_P8-SlotSangatTerhad',2,31.2),('19_CTA-KlikLink',2,37.95),('20_EndCard-Summary_part1',0,0),('20_EndCard-Summary_part2',0,2),('20_EndCard-Summary_part3',0,4)]
cmd=['ffmpeg','-v','error','-y','-i',f'{S}/r2/src/q1.mp4','-i',f'{S}/r2/src/q2.mp4']
for n,_,_ in items: cmd+=['-i',f'{M}/{n}.mov']
fc=['[0:v]scale=1080:1920,fps=30,setsar=1[v0];[0:a]aresample=48000[a0];[1:v]scale=1080:1920,fps=30,setsar=1[v1];[1:a]aresample=48000[a1]',
    '[v0][a0][v1][a1]concat=n=2:v=1:a=1[cv][ca];[cv]tpad=stop_mode=add:stop_duration=6:color=black[b0];[ca]apad=pad_dur=6[aout]']
prev='b0'
for i,(n,p,t) in enumerate(items):
    fc.append(f'[{i+2}:v]setpts=PTS-STARTPTS+{off[p]+t:.3f}/TB[g{i}];[{prev}][g{i}]overlay=eof_action=pass:format=auto[o{i}]'); prev=f'o{i}'
fc.append(f'[{prev}]scale=720:1280,format=yuv420p[vout]')
cmd+=['-filter_complex',';'.join(fc),'-map','[vout]','-map','[aout]','-t','88.5','-c:v','libx264','-preset','medium','-b:v','2300k','-maxrate','3000k','-bufsize','5000k','-c:a','aac','-b:a','128k','-movflags','+faststart',
 '/home/user/Demo-JHEV-ATM/ramadan2-gfx/preview/Preview_Ramadan2_GFX_v2.mp4']
print('rc',subprocess.run(cmd).returncode)
