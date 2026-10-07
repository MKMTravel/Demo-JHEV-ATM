# Umrah Ramadan: motion graphics overlays (MKM)

Transparent ProRes 4444 MOV overlays for CapCut. 1080x1920, 30fps, with alpha. Main clips: Pt1 (21.87s), Pt2 (19.20s), Pt3 (47.72s).
Style: calm white/navy cards from ref 1002_12, punchy gold Anton emphasis from ref 1002_13, MKM palette (navy #12206B, blue #1E32C8, red #C80000, gold gradient).
All text kept between y 330 and 1500 (clear of the logo bug top and the tagline strip bottom).

The MOV files and the preview are not committed (too large). Re-render with `remotion/render_all.sh` and `scripts/preview.py`.

## Timing (place each file on a track above the video)
| Fail | Klip | Mula dalam klip | Mula (timeline penuh) | Durasi | Layer |
|---|---|---|---|---|---|
| 01_P1-Hook_BEHIND.mov | Pt1 | 00:00.30 | 00:00.30 | 5.25s | BEHIND |
| 02_P1-Hook_FRONT.mov | Pt1 | 00:00.30 | 00:00.30 | 5.25s | FRONT |
| 03_T1-BerbukaDepanKaabah.mov | Pt1 | 00:05.62 | 00:05.62 | 4.43s | normal |
| 04_P2-PahalaMenyamaiHaji.mov | Pt1 | 00:13.85 | 00:13.85 | 5.00s | normal |
| 05_T2-Hadis.mov | Pt1 | 00:19.05 | 00:19.05 | 2.82s | normal |
| 06_T3-TravelDipercayai.mov | Pt2 | 00:06.75 | 00:28.62 | 3.70s | normal |
| 07_C1-StatusPJH.mov | Pt2 | 00:10.55 | 00:32.42 | 6.05s | normal |
| 08_P3-100Trusted.mov | Pt2 | 00:16.95 | 00:38.82 | 2.23s | normal |
| 09_C2-DirectFlight.mov | Pt3 | 00:00.20 | 00:41.28 | 5.75s | normal |
| 10_P4-15Tahun.mov | Pt3 | 00:07.20 | 00:48.28 | 4.75s | normal |
| 11_C3-Hotel.mov | Pt3 | 00:12.50 | 00:53.58 | 11.10s | normal |
| 12_T4-DiskaunAnak.mov | Pt3 | 00:23.75 | 01:04.83 | 3.75s | normal |
| 13_P5-RM2000.mov | Pt3 | 00:30.95 | 01:12.03 | 1.50s | normal |
| 14_C4-PakejTermasuk.mov | Pt3 | 00:32.55 | 01:13.63 | 6.90s | normal |
| 15_P6-Percuma.mov | Pt3 | 00:39.65 | 01:20.73 | 2.20s | normal |
| 16_P7-SangatTerhad.mov | Pt3 | 00:42.05 | 01:23.13 | 2.70s | normal |
| 17_CTA-KlikLink.mov | Pt3 | 00:44.95 | 01:26.03 | 2.77s | normal |
| 18_EndCard-Summary.mov | Selepas Pt3 | 00:00.00 | 01:28.79 | 6.00s | plate |

Split files: put the parts back-to-back.
- 11_C3-Hotel: part1 at 00:12.50, part2 at 00:16.20, part3 at 00:19.90 (Pt3)
- 14_C4-PakejTermasuk: part1 at 00:32.55, part2 at 00:36.02 (Pt3)
- 18_EndCard-Summary: part1 at 0.0s, part2 at 2.0s, part3 at 4.0s after the end of Pt3

## Hook layering in CapCut (bottom to top, all starting at Pt1 00:00.30)
1. Pt1 video
2. 01_P1-Hook_BEHIND.mov
3. A copy of Pt1 with Remove background > Auto removal (cutout), trimmed the same
4. 02_P1-Hook_FRONT.mov

## Wording to verify
- Hadith card: "Umrah di bulan Ramadan menyamai haji bersamaku", HR Bukhari & Muslim
- "Terus, tanpa transit" on the flight card (added; talent says "penerbangan direct")
- "Status PJH" and the end card summary lines
