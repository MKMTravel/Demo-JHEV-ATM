// Extra components for the Umrah Ramadan video: hadith quote panel (A) and price pop (B).
import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, GOLD, SANS, DISPLAY, EASE, POP_SHADOW, GoldWord, HalftoneDisc, StickerLabel, Sparkle} from './kinpop';
import {Eyebrow, useInOut} from './calm';

const CL = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// QUOTE PANEL (calm): navy glass, gold quote mark, phrases reveal as spoken, one key phrase in gold
export const QuotePanel: React.FC<{dur: number; eyebrow: string; phrases: {t: string; at: number; gold?: boolean}[]; source?: string; sourceAt?: number; y: number; width?: number}> =
({dur, eyebrow, phrases, source, sourceAt = 20, y, width = 900}) => {
  const {f, p, out, blur} = useInOut(dur, 18);
  const line = interpolate(f, [12, 40], [0, 1], {...CL, easing: EASE});
  const shine = interpolate(f, [10, 40], [-0.3, 1.3], CL);
  return (
    <div style={{position: 'absolute', left: (1080 - width) / 2, width, top: y, transform: `translateY(-50%) translateY(${(1 - p) * 40}px) scale(${0.94 + 0.06 * p})`, opacity: Math.min(1, p * 1.4) * out, filter: `blur(${blur}px)`}}>
      <div style={{position: 'relative', borderRadius: 32, padding: '42px 52px 40px', overflow: 'hidden', textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(48,70,224,.93) 0%, rgba(30,50,200,.92) 45%, rgba(18,32,107,.95) 100%)', boxShadow: '0 28px 64px rgba(6,10,40,.45), 0 0 0 1.5px rgba(255,255,255,.22) inset'}}>
        <div style={{position: 'absolute', top: 0, bottom: 0, width: 220, left: `${shine * 100}%`, transform: 'skewX(-18deg)', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent)'}} />
        <div style={{position: 'absolute', left: 30, top: -18, fontFamily: 'Georgia, serif', fontSize: 190, lineHeight: 1, opacity: 0.22 * p, background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>“</div>
        <Eyebrow t={eyebrow} at={4} size={24} />
        <div style={{marginTop: 20}}>
          {phrases.map((ph, i) => {
            const q = interpolate(f, [ph.at, ph.at + 14], [0, 1], {...CL, easing: EASE});
            const pop = ph.gold ? spring({frame: f - ph.at, fps: 30, config: {damping: 9, stiffness: 200, mass: 0.6}}) : 1;
            const flash = ph.gold ? interpolate(f, [ph.at, ph.at + 3, ph.at + 11], [0.9, 0.9, 0], CL) : 0;
            return (
              <div key={i} style={{opacity: q, transform: `translateY(${(1 - q) * 18}px)`, filter: `blur(${(1 - q) * 6}px)`}}>
                {ph.gold ? (
                  <div style={{display: 'inline-block', transform: `scale(${0.8 + 0.2 * pop})`, filter: 'drop-shadow(0 4px 0 rgba(10,16,60,.6))'}}>
                    <GoldWord t={ph.t} size={74} flash={flash} font={SANS} />
                  </div>
                ) : (
                  <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 50, lineHeight: 1.18, color: C.white, letterSpacing: '-0.01em'}}>{ph.t}</div>
                )}
              </div>
            );
          })}
        </div>
        {source && <div style={{marginTop: 22, opacity: interpolate(f, [sourceAt, sourceAt + 12], [0, 1], CL), fontFamily: SANS, fontWeight: 600, fontSize: 26, letterSpacing: '0.14em', color: 'rgba(255,233,168,.85)'}}>{source}</div>}
        <div style={{position: 'absolute', left: 0, bottom: 0, height: 5, width: `${line * 100}%`, background: `linear-gradient(90deg, ${C.g3}, ${C.g1}, ${C.g2})`}} />
      </div>
      <Sparkle x={width - 16} y={-4} size={58} at={14} dur={dur} />
    </div>
  );
};

// PRICE POP (punchy): halftone disc + big gold price with red flash + tilted sticker label + sparkles
export const PricePop: React.FC<{dur: number; price: string; label: string; cx: number; cy: number; r?: number; size?: number}> = ({dur, price, label, cx, cy, r = 300, size = 190}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - 2, fps, config: {damping: 9, stiffness: 190, mass: 0.7}});
  const out = interpolate(f, [dur - 6, dur], [1, 0], {...CL, easing: Easing.in(Easing.cubic)});
  const flash = interpolate(f, [2, 5, 13], [1, 1, 0], CL);
  const push = interpolate(f, [0, dur], [1, 1.06]);
  return (
    <AbsoluteFill>
      <HalftoneDisc cx={cx} cy={cy} r={r} at={0} dur={dur} />
      <div style={{position: 'absolute', left: 0, width: 1080, top: cy, display: 'flex', justifyContent: 'center', transform: `translateX(${cx - 540}px) translateY(-50%) scale(${s * out * push}) rotate(${-4 + (1 - Math.min(s, 1)) * -12}deg)`, filter: POP_SHADOW}}>
        <GoldWord t={price} size={size} flash={flash} />
      </div>
      <StickerLabel t={label} x={cx - 40} y={cy - r + 20} size={78} rot={-8} at={7} dur={dur} />
      <Sparkle x={cx + r - 30} y={cy - r + 60} size={70} at={10} dur={dur} />
      <Sparkle x={cx - r + 20} y={cy + r - 70} size={50} at={14} dur={dur} />
      <Sparkle x={cx + r - 10} y={cy + r - 40} size={40} at={18} dur={dur} />
    </AbsoluteFill>
  );
};

// SYNC TITLE (mix): calm word-by-word reveal synced to speech, with optional punch words (gold Anton + red flash pop)
export type SW = {t: string; at: number; gold?: boolean; punch?: number; s?: number};
export const SyncTitle: React.FC<{eyebrow?: string; eyebrowAt?: number; rows: SW[][]; y: number; dur: number; size?: number}> = ({eyebrow, eyebrowAt = 0, rows, y, dur, size = 72}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {out, blur} = useInOut(dur);
  const drift = interpolate(f, [0, dur], [1, 1.03]);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: y, transform: `translateY(-50%) scale(${drift})`, opacity: out, filter: `blur(${blur}px)`, textAlign: 'center'}}>
      {eyebrow && <div style={{marginBottom: 16, filter: 'drop-shadow(0 3px 10px rgba(8,14,60,.6))'}}><Eyebrow t={eyebrow} at={eyebrowAt} /></div>}
      {rows.map((row, ri) => (
        <div key={ri} style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: size * 0.26, marginTop: ri ? 4 : 0}}>
          {row.map((w, i) => {
            if (w.punch) {
              const s = f < w.at ? 0 : spring({frame: f - w.at, fps, config: {damping: 10, stiffness: 200, mass: 0.6}});
              const flash = f < w.at ? 0 : interpolate(f, [w.at, w.at + 3, w.at + 11], [0.95, 0.95, 0], CL);
              return (
                <div key={i} style={{opacity: Math.min(1, s * 2), transform: `translateY(${(1 - Math.min(s, 1)) * 50}px) scale(${0.85 + 0.15 * s})`, filter: `${POP_SHADOW} blur(${Math.max(0, 1 - s * 1.5) * 8}px)`}}>
                  <GoldWord t={w.t} size={w.punch} flash={flash} />
                </div>
              );
            }
            const p = interpolate(f, [w.at, w.at + 12], [0, 1], {...CL, easing: EASE});
            const sz = w.s ?? size;
            return (
              <span key={i} style={{display: 'inline-block', overflow: 'hidden', padding: `${sz * 0.08}px ${sz * 0.04}px ${sz * 0.14}px`, margin: `-${sz * 0.08}px -${sz * 0.04}px -${sz * 0.14}px`,
                filter: 'drop-shadow(0 4px 14px rgba(8,14,60,.6)) drop-shadow(0 1px 2px rgba(8,14,60,.7))'}}>
                <span style={{display: 'inline-block', transform: `translateY(${(1 - p) * 110}%)`, fontFamily: SANS, fontWeight: 800, fontSize: sz, lineHeight: 1.04, letterSpacing: '-0.015em', whiteSpace: 'nowrap',
                  ...(w.gold ? {background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'} : {color: C.white})}}>{w.t}</span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
