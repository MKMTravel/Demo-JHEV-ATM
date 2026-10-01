import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, GOLD_GRAD} from './theme';
import {Stage, PopWord, GoldRule, LabelPill, Check, ClockIcon, cardStyle, prog, ease} from './kit';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/* ---------- T1  "Pengangkutan sangat penting" ---------- */
export const T1: React.FC<{dur: number}> = ({dur}) => (
  <Stage dur={dur} bottom={1450}>
    <PopWord text="Pengangkutan" delay={0} size={104} tilt={-2} />
    <PopWord text="Sangat" delay={6} size={158} tilt={2} />
    <PopWord text="Penting" delay={12} size={158} gold tilt={-2} />
    <GoldRule delay={24} width={420} />
  </Stage>
);

/* ---------- shared: sprites cropped from the original Haramain train animation ---------- */
const Seq: React.FC<{name: 'bar' | 'train'; k: number; max: number; style?: React.CSSProperties}> = ({name, k, max, style}) => {
  const i = Math.max(0, Math.min(max, Math.floor(k)));
  return <Img src={staticFile(`gfx/${name}_${String(i).padStart(3, '0')}.png`)} style={style} />;
};
const TRAIN_W = 930; // sprite px
const TRAIN_H = 505;
const BAR_W = 880;
const BAR_H = 222;

/* ---------- T2  "Kita naik train" (original train rush-in) ---------- */
export const T2: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const s = 0.62;
  const drift = interpolate(f, [30, dur], [0, 22], clamp);
  const shadowIn = prog(f, 20, 12);
  return (
    <Stage dur={dur} bottom={1480}>
      <PopWord text="Kita naik" delay={8} size={66} tilt={-3} />
      <PopWord text="Train" delay={13} size={158} gold tilt={2} />
      <div style={{position: 'relative', width: TRAIN_W * s, height: TRAIN_H * s, marginTop: 10, transform: `translateX(${drift}px)`, opacity: shadowIn > 0 ? 1 : 0}}>
        <Seq name="train" k={f - 4} max={28} style={{width: TRAIN_W * s, height: TRAIN_H * s}} />
      </div>
    </Stage>
  );
};

/* ---------- C1  Fresh / Kemas / Sihat ---------- */
const Row: React.FC<{text: string; delay: number}> = ({text, delay}) => {
  const f = useCurrentFrame();
  const p = prog(f, delay, 18);
  const tick = prog(f, delay + 6, 12);
  return (
    <div
      style={{
        ...cardStyle,
        borderRadius: 999,
        width: 520,
        height: 92,
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        padding: '0 34px 0 26px',
        opacity: p,
        transform: `translateX(${(1 - p) * -90}px) scale(${0.94 + 0.06 * p})`,
      }}
    >
      <div style={{transform: `scale(${0.4 + 0.6 * tick}) rotate(${(1 - tick) * -40}deg)`}}>
        <Check size={50} />
      </div>
      <div style={{fontWeight: 800, fontSize: 48, color: C.navy, letterSpacing: '-0.01em'}}>{text}</div>
      <div style={{marginLeft: 'auto', width: 34, height: 4, borderRadius: 4, background: C.red, opacity: tick}} />
    </div>
  );
};

export const C1: React.FC<{dur: number}> = ({dur}) => (
  <Stage dur={dur} bottom={1470}>
    <LabelPill text="INSYAALLAH NAK" delay={0} />
    <div style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16, alignItems: 'center'}}>
      <Row text="Fresh" delay={4} />
      <Row text="Kemas" delay={24} />
      <Row text="Sihat" delay={46} />
    </div>
  </Stage>
);

/* ---------- C2  Haramain Speed Train hero (original route bar + train animation) ---------- */
// Timeline (30fps, graphic starts 31.2s on clip 1): train rushes in low during the close-up shot,
// route bar lands on the cut to the wide shot at 33.03s (f=55) when "Haramain Speed Train" is said.
export const C2: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const CUT = 55;
  const sT = 0.72;
  const sB = 0.82;
  const trainK = f - 24;
  const barK = (f - CUT) * 1.7;
  const barIn = prog(f, CUT, 8);
  const trainIn = interpolate(f, [24, 30], [0, 1], clamp);
  const cardP = prog(f, 84, 18);
  return (
    <Stage dur={dur} bottom={1490} exit={9}>
      <div style={{width: BAR_W * sB, height: BAR_H * sB, opacity: barIn, transform: `translateY(${(1 - barIn) * -14}px)`, marginBottom: 2}}>
        {f >= CUT - 1 && <Seq name="bar" k={barK} max={74} style={{width: BAR_W * sB, height: BAR_H * sB}} />}
      </div>
      <div style={{position: 'relative', width: TRAIN_W * sT, height: TRAIN_H * sT, opacity: trainIn, transform: `translateX(${interpolate(f, [24, dur], [0, 16], clamp)}px)`}}>
        {f >= 24 && <Seq name="train" k={trainK} max={51} style={{width: TRAIN_W * sT, height: TRAIN_H * sT}} />}
        <div
          style={{
            ...cardStyle,
            position: 'absolute',
            right: -6,
            top: -4,
            padding: '10px 26px 10px 14px',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            opacity: cardP,
            transform: `translateY(${(1 - cardP) * 22}px) scale(${0.9 + 0.1 * cardP})`,
          }}
        >
          <ClockIcon size={54} />
          <div style={{lineHeight: 1}}>
            <div style={{fontWeight: 900, fontSize: 46, color: C.navy, letterSpacing: '-0.02em'}}>2 JAM</div>
            <div style={{fontWeight: 700, fontSize: 16, letterSpacing: '0.34em', color: C.blue, marginTop: 5, paddingLeft: 3}}>SAHAJA</div>
          </div>
        </div>
      </div>
    </Stage>
  );
};

/* ---------- T3  "Bertenaga dalam ibadah" ---------- */
export const T3: React.FC<{dur: number}> = ({dur}) => (
  <Stage dur={dur} exit={8} bottom={1450}>
    <PopWord text="Bertenaga" delay={0} size={132} tilt={-2} />
    <PopWord text="Dalam" delay={4} size={78} tilt={2} />
    <PopWord text="Ibadah" delay={8} size={178} gold tilt={-2} />
    <GoldRule delay={18} width={380} />
  </Stage>
);

/* ---------- CTA  Klik link di bawah ---------- */
export const CTA: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 16);
  const pulse = (f % 30) / 30;
  const bob = Math.sin(f / 3.2) * 6;
  return (
    <Stage dur={dur} noExit bottom={1425}>
      <div style={{position: 'relative', opacity: p, transform: `translateY(${(1 - p) * 40}px) scale(${0.9 + 0.1 * p})`}}>
        <div style={{position: 'absolute', inset: -4, borderRadius: 999, border: `3px solid ${C.red}`, opacity: 1 - pulse, transform: `scale(${1 + pulse * 0.12})`}} />
        <div style={{...cardStyle, borderRadius: 999, display: 'flex', alignItems: 'center', gap: 26, padding: '16px 18px 16px 48px', boxShadow: '0 20px 44px rgba(18,32,107,.4), 0 0 0 2px rgba(200,0,0,.9)'}}>
          <div style={{fontWeight: 900, fontSize: 40, letterSpacing: '0.06em', color: C.navy}}>KLIK LINK DI BAWAH</div>
          <div style={{width: 76, height: 76, borderRadius: 76, background: `linear-gradient(135deg, ${C.blue}, ${C.navy})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width="40" height="40" viewBox="0 0 40 40" style={{transform: `translateY(${bob}px)`}}>
              <path d="M20 7 V31 M9 21 L20 32 L31 21" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Stage>
  );
};
