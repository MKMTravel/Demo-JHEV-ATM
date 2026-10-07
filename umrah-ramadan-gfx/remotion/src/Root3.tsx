// 10 Malam Terakhir: MIX like Ramadan 2 v2. One graphic per shot, one category per graphic, bold punch for key points.
import React from 'react';
import {Composition, AbsoluteFill, Sequence} from 'remotion';
import {HookStack, PunchWords, DuoCaption, PopIcon} from './kinpop';
import {InfoCard, NavyPanel, CTA, EndCard} from './calm';
import {SyncTitle, PricePop} from './extras';

const FPS = 30;
type G = {id: string; from: number; to: number; el: (L: (t: number) => number, dur: number) => React.ReactNode};

const END_ITEMS = ['Hotel sangat dekat untuk qiamullail', 'Hotel Mövenpick 5 bintang', '50 meter ke dataran Masjidil Haram', 'Bimbingan mutawwif berpengalaman'];

export const GFX3: G[] = [
  // shot 11.8-17.03 close-up: hook (bold)
  {id: '01_P1-Hook-10MalamAkhirRamadan', from: 11.85, to: 14.75, el: (L, dur) => (<>
    <HookStack x={1040} y={880} align="right" rotZ={4} dur={dur} words={[{t: '10', s: 190, at: L(11.9)}, {t: 'MALAM', s: 130, at: L(12.9)}, {t: 'AKHIR', s: 100, at: L(13.3)}, {t: 'RAMADAN', s: 128, at: L(13.65)}]} />
    <PopIcon kind="moon" x={900} y={500} size={170} rot={10} at={L(13.65)} fill="blue" tile dur={dur} />
  </>)},
  // same shot: the question
  {id: '02_P2-NakBeradaDiMana', from: 15.2, to: 17.0, el: (L) => (
    <DuoCaption y={1120} size={62} items={[{l1: 'TUAN-TUAN NAK', l2: 'BERADA DI MANA?', hl: ['DI', 'MANA?'], from: 0, to: L(17.0)}]} />
  )},
  // shot 17.03-21.23 wide seated: better than 1000 months (bold number)
  {id: '03_P3-1000Bulan', from: 17.1, to: 21.2, el: (L, dur) => (
    <SyncTitle y={1130} dur={dur} size={64}
      rows={[[{t: 'MALAM', at: L(17.3)}, {t: 'YANG', at: L(18.2)}], [{t: 'LEBIH', at: L(18.5), gold: true}, {t: 'BAIK', at: L(18.8), gold: true}, {t: 'DARIPADA', at: L(19.4)}], [{t: '1,000 BULAN', at: L(20.2), punch: 170}]]} />
  )},
  // shot 21.23-32.93 wide seated, point 1: qiamullail
  {id: '04_T1-Qiamullail', from: 23.9, to: 27.45, el: (L, dur) => (<>
    <SyncTitle y={1130} dur={dur} eyebrow="QIAMULLAIL" eyebrowAt={L(24.0)} size={64}
      rows={[[{t: 'MEMERLUKAN', at: L(25.0)}, {t: 'TENAGA', at: L(25.8)}], [{t: 'YANG', at: L(26.4)}, {t: 'SANGAT', at: L(26.6)}, {t: 'BANYAK', at: L(26.95), gold: true, s: 90}]]} />
    <PopIcon kind="moon" x={190} y={560} size={160} rot={-10} at={L(24.3)} fill="blue" tile dur={dur} />
    <PopIcon kind="star4" x={890} y={600} size={140} rot={10} at={L(24.6)} fill="gold" tile dur={dur} />
  </>)},
  // same shot, point 2: hotel near (calm panel)
  {id: '05_T2-HotelSangatDekat', from: 27.7, to: 32.9, el: (L, dur) => (
    <NavyPanel dur={dur} y={1250} eyebrow="KAMI DI MKM SEDIAKAN" title="Hotel yang" title2="sangat dekat" gold={['dekat']} width={820} chip="UNTUK ANDA" chipAt={L(32.0)} />
  )},
  // shot 32.93-40.07 medium, point 1: Movenpick 5 star
  {id: '06_C1-Movenpick5Bintang', from: 33.1, to: 36.05, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="HOTEL" icon="bed" eyebrow="Hotel di Makkah" title="Mövenpick" titleBlue={['Mövenpick']}
      rows={[{t: 'Hotel 5 bintang', at: L(34.6), icon: 'star4', strong: ['5', 'bintang']}]} />
  )},
  // same shot, point 2: 50 meter (bold pop)
  {id: '07_P4-50Meter', from: 36.15, to: 40.0, el: (L, dur) => (<>
    <Sequence durationInFrames={L(37.95)}><PricePop dur={L(37.95)} price="50 METER" label="JARAK" cx={540} cy={1240} r={230} size={150} /></Sequence>
    <DuoCaption y={1240} size={60} items={[{l1: 'SAMPAI KE DATARAN', l2: 'MASJIDIL HARAM', hl: ['MASJIDIL', 'HARAM'], from: L(37.95), to: L(40.0)}]} />
  </>)},
  // shot 40.07-43.43 standing: mutawwif card
  {id: '08_C2-BimbinganMutawwif', from: 40.45, to: 43.4, el: (L, dur) => (
    <InfoCard dur={dur} bottom={1500} tag="BIMBINGAN" icon="shield" eyebrow="Bimbingan" title="Mutawwif berpengalaman" titleBlue={['berpengalaman']} />
  )},
  // shot 43.43-46.77 standing: BERPENGALAMAN (bold)
  {id: '09_P5-Berpengalaman', from: 43.7, to: 46.75, el: (L) => (<>
    <DuoCaption y={1150} size={64} items={[{l1: 'BIMBINGAN', l2: 'MUTAWWIF', hl: ['MUTAWWIF'], from: 0, to: L(45.55)}]} />
    <PunchWords y={1150} items={[{t: 'BERPENGALAMAN', from: L(45.55), to: L(46.75), s: 128}]} />
  </>)},
  // shot 46.77-53.78 hall, point 1: don't delay
  {id: '10_T3-JanganTangguhNiat', from: 47.0, to: 49.15, el: (L, dur) => (
    <SyncTitle y={1100} dur={dur} size={70}
      rows={[[{t: 'JANGAN', at: L(47.2)}, {t: 'TANGGUH', at: L(47.6)}], [{t: 'NIAT', at: L(48.2)}, {t: 'YANG', at: L(48.45)}, {t: 'BAIK', at: L(48.7), gold: true, s: 96}]]} />
  )},
  // same shot, point 2: limited (bold)
  {id: '11_P6-KekosonganSangatTerhad', from: 49.35, to: 51.3, el: (L) => (
    <PunchWords y={1100} items={[{t: 'KEKOSONGAN', from: 0, to: L(50.15), s: 136}, {t: 'SANGAT', from: L(50.15), to: L(50.5), s: 160}, {t: 'TERHAD!', from: L(50.5), to: L(51.3), s: 190}]} />
  )},
  // same shot, point 3: CTA (two options)
  {id: '12_CTA-KlikLinkDiBawah', from: 51.5, to: 53.75, el: (L, dur) => (
    <CTA dur={dur} y={1380} q="Berminat?" qGold={['Berminat?']} label="KLIK LINK DI BAWAH" sub="KEKOSONGAN TERHAD" />
  )},
  {id: '12b_CTA-BerminatKlikLinkDiBio', from: 51.5, to: 53.75, el: (L, dur) => (
    <CTA dur={dur} y={1400} label="BERMINAT? KLIK LINK DI BIO" icon="link" />
  )},
  // end card (two options)
  {id: '13_EndCard-Summary', from: 0, to: 6, el: (L, dur) => (
    <EndCard dur={dur} eyebrow="10 MALAM TERAKHIR" title={'UMRAH\nRAMADAN'} sub="malam yang lebih baik daripada 1,000 bulan" cta="KLIK LINK DI BAWAH" chip="KEKOSONGAN SANGAT TERHAD" items={END_ITEMS} />
  )},
  {id: '13b_EndCard-Summary-DiBio', from: 0, to: 6, el: (L, dur) => (
    <EndCard dur={dur} eyebrow="10 MALAM TERAKHIR" title={'UMRAH\nRAMADAN'} sub="malam yang lebih baik daripada 1,000 bulan" cta="KLIK LINK DI BIO" chip="KEKOSONGAN SANGAT TERHAD" icon="link" items={END_ITEMS} />
  )},
];

export const Root3: React.FC = () => (<>
  {GFX3.map((g) => {
    const dur = Math.round((g.to - g.from) * FPS);
    const L = (t: number) => Math.round((t - g.from) * FPS);
    const Comp: React.FC = () => <AbsoluteFill>{g.el(L, dur)}</AbsoluteFill>;
    return <Composition key={g.id} id={g.id.replace(/_/g, '-')} component={Comp} durationInFrames={dur} fps={FPS} width={1080} height={1920} />;
  })}
</>);
