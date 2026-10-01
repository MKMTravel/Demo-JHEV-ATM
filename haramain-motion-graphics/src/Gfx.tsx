import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, GOLD_GRAD} from './theme';
import {Stage, PopWord, GoldRule, LabelPill, Check, ClockIcon, cardStyle, prog, ease} from './kit';
import {TrainSvg} from './Train';

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

/* ---------- T2  "Kita naik train" (train rush-in) ---------- */
const SpeedLines: React.FC<{p: number}> = ({p}) => (
  <div style={{position: 'absolute', left: -60, top: 20, width: 640, height: 140, opacity: (1 - p) * 0.9}}>
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: 14 + i * 26,
          left: 20 + (i % 2) * 70,
          width: 360 - i * 30,
          height: 4,
          borderRadius: 4,
          background: 'linear-gradient(90deg, rgba(255,255,255,0), #fff)',
          filter: 'drop-shadow(0 2px 6px rgba(18,32,107,.5))',
          transform: `translateX(${-p * 160}px)`,
        }}
      />
    ))}
  </div>
);

export const T2: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const rush = interpolate(f, [4, 30], [0, 1], {...clamp, easing: ease});
  const x = (1 - rush) * -1250 + interpolate(f, [30, dur], [0, 36], clamp);
  const settle = prog(f, 26, 16);
  const bob = Math.sin(f / 5) * 1.5 * rush;
  return (
    <Stage dur={dur} bottom={1470}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 26}}>
        <PopWord text="Kita naik" delay={10} size={84} tilt={-3} />
      </div>
      <PopWord text="Train" delay={15} size={196} gold tilt={2} />
      <div style={{position: 'relative', width: 1080, height: 190, marginTop: 14, overflow: 'visible'}}>
        <div style={{position: 'absolute', left: 120, top: 0, transform: `translateX(${x}px) translateY(${bob}px)`, filter: 'drop-shadow(0 18px 20px rgba(18,32,107,.45))'}}>
          <div style={{position: 'relative'}}>
            <SpeedLines p={settle} />
            <TrainSvg width={840} id="t2" />
          </div>
        </div>
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

/* ---------- C2  Haramain Speed Train hero ---------- */
const Route: React.FC<{start: number}> = ({start}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [start, start + 40], [0, 1], {...clamp, easing: ease});
  const W2 = 470;
  return (
    <div style={{position: 'relative', width: W2, height: 86}}>
      <div style={{position: 'absolute', left: 0, top: 0, fontWeight: 800, fontSize: 21, letterSpacing: '0.16em', color: C.navy}}>MEKAH</div>
      <div style={{position: 'absolute', right: 0, top: 0, fontWeight: 800, fontSize: 21, letterSpacing: '0.16em', color: C.navy}}>MADINAH</div>
      <div style={{position: 'absolute', left: 8, right: 8, top: 52, height: 6, borderRadius: 6, background: 'rgba(30,50,200,.14)'}} />
      <div style={{position: 'absolute', left: 8, top: 52, height: 6, borderRadius: 6, width: (W2 - 16) * p, background: `linear-gradient(90deg, ${C.blue}, #4F6BFF)`}} />
      <div style={{position: 'absolute', left: 0, top: 44, width: 22, height: 22, borderRadius: 22, background: C.blue, boxShadow: '0 0 0 5px #fff, 0 0 0 7px rgba(30,50,200,.25)'}} />
      <div style={{position: 'absolute', right: 0, top: 44, width: 22, height: 22, borderRadius: 22, background: p > 0.98 ? C.red : '#fff', border: `4px solid ${C.red}`, boxSizing: 'border-box', boxShadow: '0 0 0 5px #fff'}} />
      <div style={{position: 'absolute', top: 34, left: 8 + (W2 - 16) * p - 30, opacity: 1 - interpolate(p, [0.9, 1], [0, 1], clamp)}}>
        <TrainSvg width={60} id="mini" />
      </div>
    </div>
  );
};

export const C2: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const rush = interpolate(f, [0, 26], [0, 1], {...clamp, easing: ease});
  const x = (1 - rush) * -1250 + interpolate(f, [26, dur], [0, 28], clamp);
  const cardP = prog(f, 54, 20);
  const timeP = prog(f, 66, 16);
  return (
    <Stage dur={dur} bottom={1475}>
      <div
        style={{
          ...cardStyle,
          width: 920,
          overflow: 'hidden',
          opacity: cardP,
          transform: `translateY(${(1 - cardP) * 50}px) scale(${0.95 + 0.05 * cardP})`,
        }}
      >
        <div
          style={{
            background: `linear-gradient(110deg, ${C.navy}, ${C.blue})`,
            color: '#fff',
            fontWeight: 800,
            fontSize: 25,
            letterSpacing: '0.2em',
            padding: '15px 0',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          HARAMAIN SPEED TRAIN
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.gold2}, transparent)`}} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', padding: '24px 40px 26px', gap: 38}}>
          <Route start={62} />
          <div style={{width: 3, alignSelf: 'stretch', background: 'linear-gradient(180deg,transparent,rgba(18,32,107,.2),transparent)'}} />
          <div style={{display: 'flex', alignItems: 'center', gap: 18, opacity: timeP, transform: `scale(${0.85 + 0.15 * timeP})`}}>
            <ClockIcon size={68} />
            <div style={{lineHeight: 1}}>
              <div style={{fontWeight: 900, fontSize: 60, color: C.navy, letterSpacing: '-0.02em'}}>2 JAM</div>
              <div style={{fontWeight: 700, fontSize: 19, letterSpacing: '0.34em', color: C.blue, marginTop: 6, paddingLeft: 4}}>SAHAJA</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{display: 'flex', gap: 16, marginTop: 14}}>
        {[
          ['Lebih cepat', 76],
          ['Lebih selesa', 86],
        ].map(([t, d]: any) => {
          const p = prog(f, d, 16);
          return (
            <div key={t} style={{...cardStyle, borderRadius: 999, padding: '12px 30px 12px 16px', display: 'flex', alignItems: 'center', gap: 14, fontWeight: 700, fontSize: 31, color: C.navy, opacity: p, transform: `translateY(${(1 - p) * 24}px)`}}>
              <Check size={38} />
              {t}
            </div>
          );
        })}
      </div>
      <div style={{position: 'relative', width: 1080, height: 150, marginTop: 6}}>
        <div style={{position: 'absolute', left: 190, top: 0, transform: `translateX(${x}px)`, filter: 'drop-shadow(0 16px 18px rgba(18,32,107,.45))'}}>
          <TrainSvg width={700} id="c2" />
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
