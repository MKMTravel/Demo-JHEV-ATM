import React from 'react';
import {Composition, AbsoluteFill} from 'remotion';
import {HookStack, PunchWords, DuoCaption, PopIcon} from './kinpop';
import {KineticTitle, InfoCard, NavyPanel, CTA, EndCard} from './calm';
import {QuotePanel, PricePop, SyncTitle} from './extras';

const FPS = 30;
// Each graphic: part (which source clip), from/to in seconds on that clip, el(L, dur) where L(t) converts clip seconds to local frames.
type G = {id: string; part: 1 | 2 | 3 | 0; from: number; to: number; el: (L: (t: number) => number, dur: number) => React.ReactNode};

export const GFX: G[] = [
  // ---------- PART 1
  {id: '01_P1-Hook_BEHIND', part: 1, from: 0.3, to: 5.55, el: (L, dur) => (<>
    <HookStack x={50} y={350} align="left" dur={dur} words={[{t: 'CUBA', s: 128, at: L(1.15)}, {t: 'BAYANGKAN...', s: 148, at: L(1.45)}]} />
    <PopIcon kind="moon" x={880} y={500} size={190} rot={-10} at={L(1.7)} fill="blue" tile dur={dur} />
  </>)},
  {id: '02_P1-Hook_FRONT', part: 1, from: 0.3, to: 5.55, el: (L, dur) => (
    <HookStack x={1030} y={890} align="right" rotZ={4} dur={dur} words={[{t: 'AZAN', s: 118, at: L(2.45)}, {t: 'MAGHRIB', s: 156, at: L(2.95)}, {t: 'BERKUMANDANG', s: 96, at: L(3.5)}]} />
  )},
  {id: '03_T1-BerbukaDepanKaabah', part: 1, from: 5.62, to: 10.05, el: (L, dur) => (
    <KineticTitle eyebrow="SUASANA RAMADAN" lines={['BERBUKA PUASA', 'DEPAN KAABAH']} gold={['KAABAH']} sizes={[76, 96]} y={590} dur={dur} at={2} />
  )},
  {id: '04_P2-PahalaMenyamaiHaji', part: 1, from: 13.85, to: 18.85, el: (L) => (<>
    <DuoCaption y={1080} size={62} items={[{l1: 'UMRAH DI BULAN', l2: 'RAMADAN', hl: ['RAMADAN'], from: 0, to: L(16.55)}]} />
    <PunchWords y={1080} items={[{t: 'PAHALANYA', from: L(16.55), to: L(17.4), s: 128}, {t: 'MENYAMAI', from: L(17.4), to: L(18.1), s: 134}, {t: 'HAJI!', from: L(18.1), to: L(18.85), s: 190}]} />
  </>)},
  {id: '05_T2-Hadis', part: 1, from: 19.05, to: 21.87, el: (L, dur) => (
    <QuotePanel y={1230} dur={dur} eyebrow="SABDA RASULULLAH SAW" source="HR BUKHARI & MUSLIM" sourceAt={20}
      phrases={[{t: 'Umrah di bulan Ramadan', at: 4}, {t: 'MENYAMAI HAJI', at: 10, gold: true}, {t: 'bersamaku.', at: 16}]} />
  )},
  // ---------- PART 2
  {id: '05b_P8-RamaiNakKejar', part: 2, from: 0.25, to: 5.35, el: (L, dur) => (<>
    <SyncTitle y={1250} dur={dur} eyebrow="SEBAB ITU" eyebrowAt={L(0.3)} size={70}
      rows={[[{t: 'RAMAI', at: L(1.3)}, {t: 'YANG', at: L(2.05)}, {t: 'NAK', at: L(2.4)}],
        [{t: 'KEJAR', at: L(2.6), punch: 170}],
        [{t: 'UMRAH', at: L(3.6)}, {t: 'BULAN', at: L(4.3)}, {t: 'RAMADAN', at: L(4.55), gold: true}]]} />
    <PopIcon kind="plane" x={170} y={600} size={170} rot={-10} at={L(3.6)} fill="white" tile dur={dur} />
    <PopIcon kind="moon" x={915} y={540} size={170} rot={10} at={L(4.55)} fill="blue" tile dur={dur} />
  </>)},
  {id: '06_T3-TravelDipercayai', part: 2, from: 6.75, to: 10.45, el: (L, dur) => (
    <KineticTitle eyebrow="KALAU NAK PERGI" lines={['PERGILAH DENGAN', 'TRAVEL YANG', 'DIPERCAYAI']} gold={['DIPERCAYAI']} sizes={[70, 70, 104]} y={1060} dur={dur} at={0} />
  )},
  {id: '07_C1-StatusPJH', part: 2, from: 10.55, to: 16.6, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="DIPERCAYAI" icon="shield" eyebrow="MKM Ticketing Travel & Tours" title="Status PJH" titleBlue={['PJH']}
      rows={[{t: 'Pengelola Jemaah Haji', at: L(14.6), icon: 'shield', strong: ['Haji']}]} />
  )},
  {id: '08_P3-100Trusted', part: 2, from: 16.95, to: 19.18, el: (L) => (
    <PunchWords y={1000} items={[{t: '100%', from: 0, to: L(18.05), s: 210}, {t: 'TRUSTED', from: L(18.05), to: L(19.18), s: 170}]} />
  )},
  // ---------- PART 3
  {id: '09_C2-DirectFlight', part: 3, from: 0.2, to: 5.95, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="PENERBANGAN" icon="plane" eyebrow="Kami menggunakan" title="Penerbangan direct" titleBlue={['direct']}
      rows={[{t: 'Terus, tanpa transit', at: L(2.15)}, {t: 'AMAL by Malaysia Airlines', at: L(3.0), icon: 'plane', strong: ['AMAL']}]} />
  )},
  {id: '10_P4-15Tahun', part: 3, from: 7.2, to: 11.95, el: (L) => (<>
    <PunchWords y={1060} items={[{t: '15 TAHUN', from: 0, to: L(8.5), s: 190}, {t: 'BERPENGALAMAN', from: L(8.5), to: L(9.6), s: 120}]} />
    <DuoCaption y={1060} size={62} items={[{l1: 'MEMBAWA JEMAAH', l2: 'UMRAH & HAJI', hl: ['UMRAH', 'HAJI'], from: L(9.6), to: L(11.95)}]} />
  </>)},
  {id: '11_C3-Hotel', part: 3, from: 12.5, to: 23.6, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="HOTEL" icon="bed" eyebrow="Penginapan" title="Hotel dekat & selesa" titleBlue={['dekat', 'selesa']}
      rows={[{t: 'Sangat dekat', at: L(13.9), icon: 'pin', strong: ['dekat']}, {t: 'Sangat selesa', at: L(16.2), icon: 'bed', strong: ['selesa']},
        {t: 'Senang berbuka di masjid', at: L(21.0), icon: 'food', strong: ['berbuka']}, {t: 'Mudah untuk bertarawih', at: L(22.5), icon: 'moon', strong: ['bertarawih']}]} />
  )},
  {id: '12_T4-DiskaunAnak', part: 3, from: 23.75, to: 27.5, el: (L, dur) => (
    <NavyPanel dur={dur} y={1300} eyebrow="YANG LEBIH BEST" title="Diskaun untuk" title2="anak-anak" gold={['anak-anak']} />
  )},
  {id: '13_P5-RM2000', part: 3, from: 30.95, to: 32.45, el: (L, dur) => (
    <PricePop dur={dur} price="RM2,000" label="DISKAUN!" cx={600} cy={1250} r={280} />
  )},
  {id: '14_C4-PakejTermasuk', part: 3, from: 32.55, to: 39.45, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="PAKEJ TERMASUK" icon="star4" eyebrow="Umrah Ramadan MKM" title="Ziarah & hadiah" titleBlue={['hadiah']}
      counter={{at: L(33.6), to: 20, label: '20+ TEMPAT', unit: 'lawatan ziarah', pre: 'ZIARAH'}}
      rows={[{t: 'Set bagasi', at: L(36.9), icon: 'luggage', strong: ['bagasi']}, {t: 'Cenderahati eksklusif', at: L(38.2), icon: 'gift', strong: ['eksklusif']}]} />
  )},
  {id: '15_P6-Percuma', part: 3, from: 39.65, to: 41.85, el: (L) => (
    <PunchWords y={1000} items={[{t: 'PERCUMA!', from: 0, to: L(40.85), s: 180}, {t: 'UNTUK ANDA', from: L(40.85), to: L(41.85), s: 130}]} />
  )},
  {id: '16_P7-SangatTerhad', part: 3, from: 42.05, to: 44.75, el: (L) => (<>
    <DuoCaption y={1060} size={62} items={[{l1: 'PAKEJ RAMADAN', l2: 'KITA', hl: ['RAMADAN'], from: 0, to: L(43.55)}]} />
    <PunchWords y={1060} items={[{t: 'SANGAT', from: L(43.55), to: L(44.0), s: 150}, {t: 'TERHAD!', from: L(44.0), to: L(44.75), s: 190}]} />
  </>)},
  {id: '17_CTA-KlikLink', part: 3, from: 44.95, to: 47.72, el: (L, dur) => (
    <CTA dur={dur} y={1420} q="Berminat?" qGold={['Berminat']} label="KLIK LINK DI BAWAH" sub="TEMPAT TERHAD" />
  )},
  {id: '17b_CTA-KlikLinkDiBio', part: 3, from: 44.95, to: 47.72, el: (L, dur) => (
    <CTA dur={dur} y={1420} q="Berminat?" qGold={['Berminat']} label="KLIK LINK DI BIO" sub="TEMPAT TERHAD" icon="link" />
  )},
  {id: '17c_CTA-BerminatKlikLinkDiBio', part: 3, from: 44.95, to: 47.72, el: (L, dur) => (
    <CTA dur={dur} y={1440} label="BERMINAT? KLIK LINK DI BIO" icon="link" />
  )},
  // ---------- END CARD (after part 3)
  {id: '18_EndCard-Summary', part: 0, from: 0, to: 6, el: (L, dur) => (
    <EndCard dur={dur} eyebrow="JOM SERTAI" title={'UMRAH\nRAMADAN'} sub="pahala menyamai haji bersama Nabi SAW" cta="KLIK LINK DI BAWAH" chip="PAKEJ SANGAT TERHAD"
      items={['Status PJH, Pengelola Jemaah Haji', 'Direct flight AMAL by Malaysia Airlines', 'Hotel dekat & selesa', 'Diskaun anak-anak RM2,000', '20+ tempat ziarah', 'Set bagasi & cenderahati percuma']} />
  )},
  {id: '18b_EndCard-Summary-DiBio', part: 0, from: 0, to: 6, el: (L, dur) => (
    <EndCard dur={dur} eyebrow="JOM SERTAI" title={'UMRAH\nRAMADAN'} sub="pahala menyamai haji bersama Nabi SAW" cta="KLIK LINK DI BIO" chip="PAKEJ SANGAT TERHAD" icon="link"
      items={['Status PJH, Pengelola Jemaah Haji', 'Direct flight AMAL by Malaysia Airlines', 'Hotel dekat & selesa', 'Diskaun anak-anak RM2,000', '20+ tempat ziarah', 'Set bagasi & cenderahati percuma']} />
  )},
];

const mk = (g: G) => {
  const dur = Math.round((g.to - g.from) * FPS);
  const L = (t: number) => Math.round((t - g.from) * FPS);
  const C: React.FC = () => <AbsoluteFill>{g.el(L, dur)}</AbsoluteFill>;
  return {dur, C};
};

export const Root: React.FC = () => (<>
  {GFX.map((g) => {
    const {dur, C} = mk(g);
    return <Composition key={g.id} id={g.id.replace(/_/g, '-')} component={C} durationInFrames={dur} fps={FPS} width={1080} height={1920} />;
  })}
</>);
