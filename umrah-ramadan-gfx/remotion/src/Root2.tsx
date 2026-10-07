// Ramadan 2 (calm only): graphics for ramadan_2_pt.1 (q1) and ramadan_2_pt.2 (q2)
import React from 'react';
import {Composition, AbsoluteFill} from 'remotion';
import {KineticTitle, InfoCard, NavyPanel, CTA, EndCard} from './calm';
import {SyncTitle} from './extras';

const FPS = 30;
type G = {id: string; part: 1 | 2 | 0; from: number; to: number; el: (L: (t: number) => number, dur: number) => React.ReactNode};

export const GFX2: G[] = [
  // ---------- PART 1
  {id: '01_T1-RamaiSangatOrang', part: 1, from: 0.2, to: 3.95, el: (L, dur) => (
    <SyncTitle y={540} dur={dur} size={56}
      rows={[[{t: 'UMRAH', at: L(0.3)}, {t: 'BULAN', at: L(0.8)}, {t: 'RAMADAN', at: L(1.15), gold: true}], [{t: 'RAMAI', at: L(2.4), s: 78}, {t: 'SANGAT', at: L(2.85), s: 78}, {t: 'ORANG', at: L(3.25), s: 78}]]} />
  )},
  {id: '02_T2-SekaliSeumurHidup', part: 1, from: 4.3, to: 8.95, el: (L, dur) => (
    <SyncTitle y={1250} dur={dur} eyebrow="PELUANG UNTUK KITA" eyebrowAt={L(4.4)} size={64}
      rows={[[{t: 'MUNGKIN', at: L(6.2)}, {t: 'SEKALI', at: L(6.9)}, {t: 'SAHAJA', at: L(7.4)}], [{t: 'SEUMUR', at: L(7.9), gold: true, s: 96}, {t: 'HIDUP', at: L(8.25), gold: true, s: 96}]]} />
  )},
  {id: '03_T3-JanganAmbilRisiko', part: 1, from: 10.3, to: 12.95, el: (L, dur) => (
    <NavyPanel dur={dur} y={1230} eyebrow="TOLONG" title="Jangan ambil risiko" gold={['risiko']} width={820} />
  )},
  {id: '04_C1-MusimPalingSibuk', part: 1, from: 13.3, to: 20.0, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="MUSIM PUNCAK" icon="calendar" eyebrow="Ramadan" title="Musim umrah paling sibuk" titleBlue={['paling', 'sibuk']}
      rows={[{t: 'Tiket penerbangan', at: L(16.6), icon: 'plane', strong: ['Tiket']}, {t: 'Hotel', at: L(17.6), icon: 'bed', strong: ['Hotel']}, {t: 'Semua orang berebut', at: L(18.6), icon: 'clock', strong: ['berebut']}]} />
  )},
  {id: '05_T4-PilihAgensiDipercayai', part: 1, from: 20.7, to: 26.6, el: (L, dur) => (
    <SyncTitle y={1270} dur={dur} eyebrow="INILAH MASANYA" eyebrowAt={L(20.9)} size={66}
      rows={[[{t: 'PILIH', at: L(22.7)}, {t: 'BETUL-BETUL', at: L(23.2)}], [{t: 'AGENSI', at: L(24.6)}, {t: 'YANG', at: L(25.3)}], [{t: 'DIPERCAYAI', at: L(25.6), gold: true, s: 100}]]} />
  )},
  {id: '06_T5-JomBersamaMKM', part: 1, from: 26.85, to: 32.9, el: (L, dur) => (
    <SyncTitle y={1240} dur={dur} eyebrow="JOM, SAYA NAK AJAK" eyebrowAt={L(26.9)} size={74}
      rows={[[{t: 'PERGI', at: L(28.85)}, {t: 'UMRAH', at: L(29.2)}], [{t: 'BERSAMA', at: L(29.6)}, {t: 'MKM', at: L(30.2), gold: true, s: 100}]]} />
  )},
  {id: '07_C2-PJH-Rekod100', part: 1, from: 33.3, to: 40.5, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="DIPERCAYAI" icon="shield" eyebrow="MKM Ticketing Travel & Tours" title="Status PJH" titleBlue={['PJH']}
      counter={{at: L(37.7), to: 100, label: '100%', unit: 'insyaAllah', pre: 'REKOD TERBANG'}}
      rows={[{t: 'Pengelola Jemaah Haji', at: L(35.3), icon: 'shield', strong: ['Haji']}]} />
  )},
  // ---------- PART 2
  {id: '08_C3-DirectFlight', part: 2, from: 0.2, to: 5.45, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="PENERBANGAN" icon="plane" eyebrow="Kami menggunakan" title="Penerbangan direct" titleBlue={['direct']}
      rows={[{t: 'AMAL by Malaysia Airlines', at: L(2.75), icon: 'plane', strong: ['AMAL']}]} />
  )},
  {id: '09_T6-15Tahun', part: 2, from: 5.75, to: 8.95, el: (L, dur) => (
    <SyncTitle y={1240} dur={dur} eyebrow="PENGALAMAN" eyebrowAt={L(5.85)} size={64}
      rows={[[{t: '15', at: L(6.85), gold: true, s: 140}, {t: 'TAHUN', at: L(7.1), gold: true, s: 140}], [{t: 'MEMBAWA', at: L(7.55)}, {t: 'JEMAAH', at: L(8.1)}]]} />
  )},
  {id: '10_C4-Hotel', part: 2, from: 9.05, to: 19.7, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="HOTEL" icon="bed" eyebrow="Penginapan" title="Hotel selesa & dekat" titleBlue={['selesa', 'dekat']}
      rows={[{t: 'Hotel selesa', at: L(9.8), icon: 'bed', strong: ['selesa']}, {t: 'Sangat dekat dengan masjid', at: L(11.5), icon: 'pin', strong: ['dekat']},
        {t: 'Mudah untuk qiam', at: L(16.2), icon: 'moon', strong: ['qiam']}, {t: 'Senang bertarawih', at: L(17.4), icon: 'star4', strong: ['bertarawih']}]} />
  )},
  {id: '11_C5-HadiahPercuma', part: 2, from: 19.95, to: 25.6, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="PERCUMA" icon="gift" eyebrow="Hadiah eksklusif" title="Kami beri percuma" titleBlue={['percuma']}
      rows={[{t: 'Cenderahati eksklusif', at: L(20.15), icon: 'gift', strong: ['eksklusif']}, {t: 'Set bagasi eksklusif', at: L(21.4), icon: 'luggage', strong: ['bagasi']}]} />
  )},
  {id: '12_T7-JomDaftar-SlotTerhad', part: 2, from: 26.75, to: 33.0, el: (L, dur) => (
    <NavyPanel dur={dur} y={1230} eyebrow="JOM DAFTAR" title="Umrah Ramadan" title2="bersama MKM" gold={['Ramadan', 'MKM']} width={820} chip="SLOT SANGAT TERHAD" chipAt={L(31.3)} />
  )},
  {id: '13_CTA-KlikLink', part: 2, from: 37.95, to: 41.9, el: (L, dur) => (
    <CTA dur={dur} y={1330} q="Nak tengok tarikh" q2="yang masih ada?" qGold={['tarikh']} label="KLIK LINK DI BAWAH" />
  )},
  // ---------- END CARD (after part 2)
  {id: '14_EndCard-Summary', part: 0, from: 0, to: 6, el: (L, dur) => (
    <EndCard dur={dur} eyebrow="JOM DAFTAR" title={'UMRAH\nRAMADAN'} sub="peluang mungkin sekali seumur hidup" cta="KLIK LINK DI BAWAH" chip="SLOT SANGAT TERHAD"
      items={['Status PJH, Pengelola Jemaah Haji', 'Rekod terbang 100%', 'Direct flight AMAL by Malaysia Airlines', '15 tahun pengalaman', 'Hotel selesa & dekat masjid', 'Cenderahati & set bagasi percuma']} />
  )},
];

export const Root2: React.FC = () => (<>
  {GFX2.map((g) => {
    const dur = Math.round((g.to - g.from) * FPS);
    const L = (t: number) => Math.round((t - g.from) * FPS);
    const C: React.FC = () => <AbsoluteFill>{g.el(L, dur)}</AbsoluteFill>;
    return <Composition key={g.id} id={g.id.replace(/_/g, '-')} component={C} durationInFrames={dur} fps={FPS} width={1080} height={1920} />;
  })}
</>);
