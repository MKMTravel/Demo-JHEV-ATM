import subprocess
S='/tmp/claude-0/-home-user-Demo-JHEV-ATM/9ad433fd-22ed-5e3b-8351-44a750dfbb1f/scratchpad'
M='/home/user/Demo-JHEV-ATM/malam10-gfx/MOV'
END=53.777
items=[('01_P1-Hook-10MalamAkhirRamadan',11.85),('02_P2-NakBeradaDiMana',15.2),('03_P3-1000Bulan',17.1),('04_T1-Qiamullail',23.9),('05_T2-HotelSangatDekat',27.7),
('06_C1-Movenpick5Bintang',33.1),('07_P4-50Meter',36.15),('08_C2-BimbinganMutawwif',40.45),('09_P5-Berpengalaman',43.7),('10_T3-JanganTangguhNiat',47.0),
('11_P6-KekosonganSangatTerhad',49.35),('12_CTA-KlikLinkDiBawah',51.5),('13_EndCard-Summary_part1',END),('13_EndCard-Summary_part2',END+2),('13_EndCard-Summary_part3',END+4)]
cmd=['ffmpeg','-v','error','-y','-i',f'{S}/r3/src/m.mp4']
for n,_ in items: cmd+=['-i',f'{M}/{n}.mov']
fc=['[0:v]scale=1080:1920,fps=30,setsar=1,tpad=stop_mode=add:stop_duration=6:color=black[b0];[0:a]aresample=48000,apad=pad_dur=6[aout]']
prev='b0'
for i,(n,t) in enumerate(items):
    fc.append(f'[{i+1}:v]setpts=PTS-STARTPTS+{t:.3f}/TB[g{i}];[{prev}][g{i}]overlay=eof_action=pass:format=auto[o{i}]'); prev=f'o{i}'
fc.append(f'[{prev}]scale=720:1280,format=yuv420p[vout]')
cmd+=['-filter_complex',';'.join(fc),'-map','[vout]','-map','[aout]','-t',f'{END+6:.2f}','-c:v','libx264','-preset','medium','-b:v','2800k','-maxrate','3500k','-bufsize','6000k','-c:a','aac','-b:a','128k','-movflags','+faststart',
 '/home/user/Demo-JHEV-ATM/malam10-gfx/preview/Preview_10MalamTerakhir_GFX.mp4']
print('rc',subprocess.run(cmd).returncode)
