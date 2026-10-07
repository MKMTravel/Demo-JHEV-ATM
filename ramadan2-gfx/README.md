# Ramadan 2: motion graphics overlays (MKM), v2

v2 replaces the calm-only v1. Same system as the Umrah Ramadan project: calm A cards/panels for facts, bold B punch typography for key points.
One graphic per shot and one category per graphic (PJH, rekod terbang, flight, 15 tahun, hotel, qiam/terawih, hadiah, percuma, jom daftar, slot terhad are all separate).
Transparent ProRes 4444, 1080x1920, 30fps. Text kept between y 330 and 1500 for the logo bug.
Source: umrah-ramadan-gfx/remotion/src/Root2.tsx (entry src/index2.ts), render with render_r2v2.sh, preview with scripts/preview3.py.
MOV files and preview are not committed (too large). v1 source kept as Root2_calm_v1.tsx.bak.

## Timing (v2, folder MOV_v2)
| Fail | Klip | Mula dalam klip | Timeline penuh | Gaya |
|---|---|---|---|---|
| 01_P1-Hook-RamaiSangatOrang | Pt1 | 00:00.20 | 00:00.20 | B punch |
| 02_P2-SekaliSeumurHidup | Pt1 | 00:04.30 | 00:04.30 | B |
| 03_P3-JanganAmbilRisiko | Pt1 | 00:10.00 | 00:10.00 | mix |
| 04_T1-MusimPalingSibuk | Pt1 | 00:13.30 | 00:13.30 | A |
| 05_T2-TiketHotel | Pt1 | 00:16.45 | 00:16.45 | A tiles |
| 06_P4-SemuaOrangBerebut | Pt1 | 00:18.35 | 00:18.35 | B |
| 07_T3-PilihAgensiDipercayai | Pt1 | 00:20.60 | 00:20.60 | A panel |
| 08_T4-JomBersamaMKM | Pt1 | 00:26.85 | 00:26.85 | A |
| 09_C1-StatusPJH | Pt1 | 00:31.15 | 00:31.15 | A card |
| 10_P5-RekodTerbang100 | Pt1 | 00:36.30 | 00:36.30 | B punch |
| 11_C2-DirectFlight | Pt2 | 00:00.20 | 00:40.79 | A card |
| 12_P6-15Tahun | Pt2 | 00:05.75 | 00:46.34 | B punch |
| 13_C3-Hotel | Pt2 | 00:09.05 | 00:49.64 | A card |
| 14_T5-QiamTerawih | Pt2 | 00:13.70 | 00:54.29 | A |
| 15_C4-HadiahEksklusif | Pt2 | 00:19.95 | 01:00.54 | A card |
| 16_P7-Percuma | Pt2 | 00:23.10 | 01:03.69 | B pop |
| 17_T6-JomDaftar | Pt2 | 00:26.75 | 01:07.34 | A panel |
| 18_P8-SlotSangatTerhad | Pt2 | 00:31.20 | 01:11.79 | B punch |
| 19_CTA-KlikLink | Pt2 | 00:37.95 | 01:18.54 | A CTA |
| 19b_CTA-KlikLinkDiBio (option) | Pt2 | 00:37.95 | 01:18.54 | A CTA |
| 20_EndCard-Summary_part1 / 2 / 3 | Lepas Pt2 | +0s / +2s / +4s | 01:22.50 / 01:24.50 / 01:26.50 | plate |
| 20b_EndCard-Summary-DiBio_part1 / 2 / 3 (option) | Lepas Pt2 | +0s / +2s / +4s | 01:22.50 / 01:24.50 / 01:26.50 | plate |

Options: 19b/20b say "KLIK LINK DI BIO" (link icon) instead of "KLIK LINK DI BAWAH". Use one or the other.

## Wording to verify
- "agensi yang dipercayai": audio at Pt1 25.3s is unclear (sounds like "yang trusted")
- "Diiktiraf Tabung Haji" on the PJH card (added, not said)
- "Rekod terbang 100%" and the end card summary lines
