// Ramadan 2 v2 (MIX like project 1): one graphic per shot, one category per graphic, bold punch for key points.
import React from 'react';
import {Composition, AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing} from 'remotion';
import {HookStack, PunchWords, DuoCaption, PopIcon} from './kinpop';
import {KineticTitle, InfoCard, NavyPanel, CTA, EndCard} from './calm';
import {SyncTitle, PricePop} from './extras';
import {SANS, C} from './kinpop';

const FPS = 30;
type G = {id: string; part: 1 | 2 | 0; from: number; to: number; el: (L: (t: number) => number, dur: number) => React.ReactNode};

// small calm label under a floating tile
const TileLabel: React.FC<{t: string; x: number; y: number; at: number}> = ({t, x, y, at}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  return <div style={{position: 'absolute', left: x - 200, width: 400, top: y, textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 14}px)`,
    fontFamily: SANS, fontWeight: 800, fontSize: 46, letterSpacing: '0.06em', color: C.white, textShadow: `0 3px 0 ${C.navy}, 0 6px 16px rgba(5,10,40,.6)`}}>{t}</div>;
};

export const GFX2: G[] = [
  // ================= PART 1
  // shot 0-4.07 wide mosque: bold hook
  {id: '01_P1-Hook-RamaiSangatOrang', part: 1, from: 0.2, to: 4.0, el: (L, dur) => (<>
    <HookStack x={60} y={360} align="left" dur={dur} words={[{t: 'UMRAH', s: 120, at: L(0.3)}, {t: 'RAMADAN', s: 168, at: L(1.15)}]} />
    <HookStack x={990} y={1060} align="right" rotY={12} rotZ={3} dur={dur} words={[{t: 'RAMAI', s: 116, at: L(2.4)}, {t: 'SANGAT', s: 100, at: L(2.85)}, {t: 'ORANG!', s: 150, at: L(3.25)}]} />
    <PopIcon kind="moon" x={880} y={500} size={180} rot={10} at={L(1.3)} fill="blue" tile dur={dur} />
  </>)},
  // shot 4.07-8.97 medium gold wall: caption -> bold punch
  {id: '02_P2-SekaliSeumurHidup', part: 1, from: 4.3, to: 8.95, el: (L) => (<>
    <DuoCaption y={1220} size={58} items={[{l1: 'PELUANG UNTUK KITA', l2: 'MUNGKIN SEKALI SAHAJA', hl: ['SEKALI', 'SAHAJA'], from: 0, to: L(7.85)}]} />
    <PunchWords y={1220} items={[{t: 'SEUMUR HIDUP', from: L(7.85), to: L(8.95), s: 140}]} />
  </>)},
  // shot 8.97-12.97 calligraphy: calm lead-in + bold RISIKO
  {id: '03_P3-JanganAmbilRisiko', part: 1, from: 10.0, to: 12.95, el: (L, dur) => (
    <SyncTitle y={1240} dur={dur} eyebrow="TOLONG" eyebrowAt={L(10.1)} size={74}
      rows={[[{t: 'JANGAN', at: L(11.1)}, {t: 'AMBIL', at: L(11.6)}], [{t: 'RISIKO!', at: L(12.0), punch: 180}]]} />
  )},
  // shot 12.97-18.27 wide white: calm title above head
  {id: '04_T1-MusimPalingSibuk', part: 1, from: 13.3, to: 16.4, el: (L, dur) => (
    <KineticTitle eyebrow="MUSIM RAMADAN" lines={['MUSIM UMRAH', 'PALING SIBUK']} gold={['SIBUK']} sizes={[74, 100]} y={480} dur={dur} at={L(13.6)} />
  )},
  // same shot, next point: ticket + hotel tiles
  {id: '05_T2-TiketHotel', part: 1, from: 16.45, to: 18.25, el: (L, dur) => (<>
    <PopIcon kind="plane" x={250} y={470} size={200} rot={-8} at={L(16.6)} fill="white" tile dur={dur} />
    <TileLabel t="TIKET" x={250} y={600} at={L(16.7)} />
    <PopIcon kind="bed" x={830} y={470} size={200} rot={8} at={L(17.55)} fill="blue" tile dur={dur} />
    <TileLabel t="HOTEL" x={830} y={600} at={L(17.65)} />
  </>)},
  // shot 18.27-19.87 closer: semua orang berebut
  {id: '06_P4-SemuaOrangBerebut', part: 1, from: 18.35, to: 19.85, el: (L) => (<>
    <DuoCaption y={1180} size={60} items={[{l1: 'SEMUA ORANG', from: 0, to: L(19.05)}]} />
    <PunchWords y={1180} items={[{t: 'BEREBUT!', from: L(19.05), to: L(19.85), s: 160}]} />
  </>)},
  // shot 19.87-26.67 hall: calm panel
  {id: '07_T3-PilihAgensiDipercayai', part: 1, from: 20.6, to: 26.6, el: (L, dur) => (
    <NavyPanel dur={dur} y={1260} eyebrow="INILAH MASANYA" title="Pilih betul-betul" title2="agensi yang dipercayai" gold={['dipercayai']} width={900} />
  )},
  // shot 26.67-35.87 black A, point 1: invitation
  {id: '08_T4-JomBersamaMKM', part: 1, from: 26.85, to: 30.95, el: (L, dur) => (
    <KineticTitle eyebrow="JOM, SAYA NAK AJAK" lines={['PERGI UMRAH', 'BERSAMA MKM']} gold={['MKM']} sizes={[76, 96]} y={1230} dur={dur} at={L(26.9)} />
  )},
  // same shot, point 2: PJH only
  {id: '09_C1-StatusPJH', part: 1, from: 31.15, to: 35.85, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="PJH" icon="shield" eyebrow="MKM Ticketing Travel & Tours" title="Pemegang status PJH" titleBlue={['PJH']}
      rows={[{t: 'Pengelola Jemaah Haji', at: L(33.4), icon: 'shield', strong: ['Haji']}, {t: 'Diiktiraf Tabung Haji', at: L(34.4), icon: 'check', strong: ['Tabung', 'Haji']}]} />
  )},
  // shot 35.87-40.59 black B: rekod terbang 100% (bold)
  {id: '10_P5-RekodTerbang100', part: 1, from: 36.3, to: 40.5, el: (L) => (<>
    <DuoCaption y={1200} size={60} items={[{l1: 'INSYAALLAH', l2: 'REKOD TERBANG KAMI', hl: ['REKOD', 'TERBANG'], from: 0, to: L(38.55)}]} />
    <PunchWords y={1200} items={[{t: '100%', from: L(38.55), to: L(40.5), s: 230}]} />
  </>)},
  // ================= PART 2
  // shot 0-5.53 lobby: flight card
  {id: '11_C2-DirectFlight', part: 2, from: 0.2, to: 5.45, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="PENERBANGAN" icon="plane" eyebrow="Kami menggunakan" title="Penerbangan direct" titleBlue={['direct']}
      rows={[{t: 'AMAL by Malaysia Airlines', at: L(2.75), icon: 'plane', strong: ['AMAL']}]} />
  )},
  // shot 5.53-12.7 closer lobby, point 1: 15 tahun (bold)
  {id: '12_P6-15Tahun', part: 2, from: 5.75, to: 8.95, el: (L) => (<>
    <DuoCaption y={1200} size={60} items={[{l1: 'PENGALAMAN', from: 0, to: L(6.85)}, {l1: 'MEMBAWA JEMAAH', hl: ['JEMAAH'], from: L(7.95), to: L(8.95)}]} />
    <PunchWords y={1200} items={[{t: '15 TAHUN', from: L(6.85), to: L(7.95), s: 190}]} />
  </>)},
  // same shot, point 2: hotel
  {id: '13_C3-Hotel', part: 2, from: 9.05, to: 12.65, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="HOTEL" icon="bed" eyebrow="Penginapan" title="Hotel selesa & dekat" titleBlue={['selesa', 'dekat']}
      rows={[{t: 'Selesa', at: L(9.8), icon: 'bed', strong: ['Selesa']}, {t: 'Sangat dekat', at: L(11.5), icon: 'pin', strong: ['dekat']}]} />
  )},
  // shot 12.7-19.7 corridor: ibadah (qiam, terawih)
  {id: '14_T5-QiamTerawih', part: 2, from: 13.7, to: 19.65, el: (L, dur) => (<>
    <SyncTitle y={1230} dur={dur} eyebrow="BILA HOTEL DEKAT DENGAN MASJID" eyebrowAt={L(13.9)} size={70}
      rows={[[{t: 'NAK', at: L(16.15)}, {t: 'QIAM,', at: L(16.4)}], [{t: 'NAK', at: L(17.1)}, {t: 'TERAWIH', at: L(17.35)}], [{t: 'SANGAT', at: L(18.3)}, {t: 'MUDAH', at: L(18.6), gold: true, s: 96}]]} />
    <PopIcon kind="moon" x={175} y={560} size={160} rot={-10} at={L(16.4)} fill="blue" tile dur={dur} />
    <PopIcon kind="star4" x={905} y={600} size={150} rot={10} at={L(17.35)} fill="gold" tile dur={dur} />
  </>)},
  // shot 19.7-25.73 carpark, point 1: exclusive gifts
  {id: '15_C4-HadiahEksklusif', part: 2, from: 19.95, to: 23.0, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="EKSKLUSIF" icon="gift" eyebrow="Hadiah untuk jemaah" title="Hadiah eksklusif" titleBlue={['eksklusif']}
      rows={[{t: 'Cenderahati', at: L(20.15), icon: 'gift', strong: ['Cenderahati']}, {t: 'Set bagasi', at: L(21.4), icon: 'luggage', strong: ['bagasi']}]} />
  )},
  // same shot, point 2: PERCUMA (bold pop)
  {id: '16_P7-Percuma', part: 2, from: 23.1, to: 25.65, el: (L) => (<>
    <DuoCaption y={1280} size={60} items={[{l1: 'KITA AKAN BERIKAN', l2: 'SECARA...', from: 0, to: L(24.45)}]} />
    <Sequence from={L(24.45)}><PricePop dur={L(25.65) - L(24.45)} price="PERCUMA!" label="UNTUK ANDA" cx={540} cy={1310} r={270} /></Sequence>
  </>)},
  // shot 25.73-37.73 office front, point 1: jom daftar (calm)
  {id: '17_T6-JomDaftar', part: 2, from: 26.75, to: 31.1, el: (L, dur) => (
    <NavyPanel dur={dur} y={1250} eyebrow="JOM DAFTAR" title="Umrah Ramadan" title2="bersama MKM" gold={['Ramadan', 'MKM']} width={820} />
  )},
  // same shot, point 2: slot terhad (bold)
  {id: '18_P8-SlotSangatTerhad', part: 2, from: 31.2, to: 33.4, el: (L) => (
    <PunchWords y={1200} items={[{t: 'SLOT', from: 0, to: L(31.65), s: 170}, {t: 'SANGAT', from: L(31.65), to: L(31.95), s: 160}, {t: 'TERHAD!', from: L(31.95), to: L(33.4), s: 190}]} />
  )},
  // shot 37.73-41.91 MKM backdrop: CTA
  {id: '19_CTA-KlikLink', part: 2, from: 37.95, to: 41.9, el: (L, dur) => (
    <CTA dur={dur} y={1330} q="Nak tengok tarikh" q2="yang masih ada?" qGold={['tarikh']} label="KLIK LINK DI BAWAH" sub="SLOT TERHAD" />
  )},
  // option: link in bio
  {id: '19b_CTA-KlikLinkDiBio', part: 2, from: 37.95, to: 41.9, el: (L, dur) => (
    <CTA dur={dur} y={1330} q="Nak tengok tarikh" q2="yang masih ada?" qGold={['tarikh']} label="KLIK LINK DI BIO" sub="SLOT TERHAD" icon="link" />
  )},
  // ================= END CARD
  {id: '20_EndCard-Summary', part: 0, from: 0, to: 6, el: (L, dur) => (
    <EndCard dur={dur} eyebrow="JOM DAFTAR" title={'UMRAH\nRAMADAN'} sub="peluang mungkin sekali seumur hidup" cta="KLIK LINK DI BAWAH" chip="SLOT SANGAT TERHAD"
      items={['Status PJH, Pengelola Jemaah Haji', 'Rekod terbang 100%', 'Direct flight AMAL by Malaysia Airlines', '15 tahun pengalaman', 'Hotel selesa & dekat masjid', 'Cenderahati & set bagasi percuma']} />
  )},
  {id: '20b_EndCard-Summary-DiBio', part: 0, from: 0, to: 6, el: (L, dur) => (
    <EndCard dur={dur} eyebrow="JOM DAFTAR" title={'UMRAH\nRAMADAN'} sub="peluang mungkin sekali seumur hidup" cta="KLIK LINK DI BIO" chip="SLOT SANGAT TERHAD" icon="link"
      items={['Status PJH, Pengelola Jemaah Haji', 'Rekod terbang 100%', 'Direct flight AMAL by Malaysia Airlines', '15 tahun pengalaman', 'Hotel selesa & dekat masjid', 'Cenderahati & set bagasi percuma']} />
  )},
];

export const Root2: React.FC = () => (<>
  {GFX2.map((g) => {
    const dur = Math.round((g.to - g.from) * FPS);
    const L = (t: number) => Math.round((t - g.from) * FPS);
    const Comp: React.FC = () => <AbsoluteFill>{g.el(L, dur)}</AbsoluteFill>;
    return <Composition key={g.id} id={g.id.replace(/_/g, '-')} component={Comp} durationInFrames={dur} fps={FPS} width={1080} height={1920} />;
  })}
</>);
