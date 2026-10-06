// MKM "Calm Premium" pack (style A), tuned to the clean white-card look of the 1002_12 reference.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, GOLD, SANS, EASE, ICONS, IconKind, Sparkle} from './kinpop';

const CL = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const BLUE_GRAD = `linear-gradient(135deg, #3046E0 0%, ${C.blue} 45%, ${C.navy} 100%)`;
const SOFT = 'drop-shadow(0 4px 16px rgba(8,14,60,.55)) drop-shadow(0 1px 2px rgba(8,14,60,.6))';

// shared enter/exit: rise + scale in, fade + blur out over the last 10 frames
export const useInOut = (dur: number, inLen = 16, outLen = 10, delay = 0) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [delay, delay + inLen], [0, 1], {...CL, easing: EASE});
  const out = interpolate(f, [dur - outLen, dur], [1, 0], {...CL, easing: Easing.in(Easing.quad)});
  return {f, p, out, blur: (1 - out) * 10};
};

export const Glyph: React.FC<{kind: IconKind; size: number; color: string}> = ({kind, size, color}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{display: 'block'}}><path d={ICONS[kind]} fill={color} /></svg>
);

// gold caps eyebrow with hairlines that draw out from the text
export const Eyebrow: React.FC<{t: string; at?: number; size?: number; color?: string; line?: string}> = ({t, at = 0, size = 26, color = C.g2, line}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 14], [0, 1], {...CL, easing: EASE});
  const l = interpolate(f, [at + 4, at + 22], [0, 1], {...CL, easing: EASE});
  const hl = <div style={{width: 64 * l, height: 2, background: line ?? `linear-gradient(90deg, transparent, ${C.g2})`, borderRadius: 2}} />;
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, opacity: p, transform: `translateY(${(1 - p) * 10}px)`}}>
      <div style={{transform: 'scaleX(-1)'}}>{hl}</div>
      <div style={{fontFamily: SANS, fontWeight: 800, fontSize: size, letterSpacing: '0.22em', color, textTransform: 'uppercase', paddingLeft: '0.22em'}}>{t}</div>
      {hl}
    </div>
  );
};

// words rise out of an overflow-hidden mask, staggered
type W = {t: string; gold?: boolean};
const parse = (s: string, gold: string[] = []): W[] => s.split(' ').map((t) => ({t, gold: gold.includes(t.replace(/[?!.,]/g, ''))}));
export const RevealLine: React.FC<{text: string; gold?: string[]; at: number; size: number; stagger?: number; weight?: number; goldColor?: string; color?: string}> =
({text, gold = [], at, size, stagger = 3, weight = 800, color = C.white, goldColor}) => {
  const f = useCurrentFrame();
  return (
    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap', gap: size * 0.26}}>
      {parse(text, gold).map((w, i) => {
        const p = interpolate(f, [at + i * stagger, at + i * stagger + 14], [0, 1], {...CL, easing: EASE});
        return (
          <span key={i} style={{display: 'inline-block', overflow: 'hidden', padding: `${size * 0.08}px ${size * 0.04}px ${size * 0.14}px`, margin: `-${size * 0.08}px -${size * 0.04}px -${size * 0.14}px`}}>
            <span style={{display: 'inline-block', transform: `translateY(${(1 - p) * 110}%)`, fontFamily: SANS, fontWeight: weight, fontSize: size, lineHeight: 1.04, letterSpacing: '-0.015em', whiteSpace: 'nowrap',
              ...(w.gold ? (goldColor ? {color: goldColor} : {background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}) : {color})}}>{w.t}</span>
          </span>
        );
      })}
    </div>
  );
};

// 1) KINETIC TITLE: eyebrow + 1-3 headline lines, white with gold keywords, soft shadow only (calm)
export const KineticTitle: React.FC<{eyebrow?: string; lines: string[]; gold?: string[]; y: number; dur: number; size?: number; sizes?: number[]; at?: number}> =
({eyebrow, lines, gold = [], y, dur, size = 78, sizes, at = 0}) => {
  const {out, blur} = useInOut(dur);
  const f = useCurrentFrame();
  const drift = interpolate(f, [0, dur], [1, 1.03]);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: y, transform: `translateY(-50%) scale(${drift})`, opacity: out, filter: `blur(${blur}px) ${SOFT}`, textAlign: 'center'}}>
      {eyebrow && <div style={{marginBottom: 18}}><Eyebrow t={eyebrow} at={at} /></div>}
      {lines.map((l, i) => {
        const s = sizes?.[i] ?? size;
        return <RevealLine key={i} text={l} gold={gold} at={at + 4 + i * 6} size={s} />;
      })}
    </div>
  );
};

// 2) INFO CARD: white frosted card (ref 1002_12), blue tag pill, icon header, rows appear when spoken, optional counter ring
export type Row = {t: string; at: number; icon?: IconKind; strong?: string[]};
export const InfoCard: React.FC<{dur: number; tag?: string; icon?: IconKind; eyebrow?: string; title: string; titleBlue?: string[]; rows?: Row[];
  counter?: {at: number; to: number; unit: string; pre?: string; label: string; from?: number}; bottom?: number; top?: number; width?: number; sparkle?: boolean}> =
({dur, tag, icon = 'check', eyebrow, title, titleBlue = [], rows = [], counter, bottom, top, width = 880, sparkle = true}) => {
  const {f, p, out, blur} = useInOut(dur, 18);
  const {fps} = useVideoConfig();
  const ROW = 64;
  const shine = interpolate(f, [10, 40], [-0.3, 1.3], CL);
  const goldLine = interpolate(f, [12, 40], [0, 1], {...CL, easing: EASE});
  const pos: React.CSSProperties = bottom !== undefined ? {bottom: 1920 - bottom} : {top};
  const words = title.split(' ');
  return (
    <div style={{position: 'absolute', left: (1080 - width) / 2, width, ...pos, opacity: Math.min(p * 1.4, 1) * out,
      transform: `translateY(${(1 - p) * 46}px) scale(${0.94 + 0.06 * p})`, transformOrigin: '50% 100%', filter: `blur(${blur}px)`}}>
      <div style={{position: 'relative', borderRadius: 34, padding: '40px 44px 34px', background: 'linear-gradient(180deg, rgba(255,255,255,.97) 0%, rgba(242,245,255,.94) 100%)',
        boxShadow: '0 28px 70px rgba(8,14,60,.38), 0 0 0 1.5px rgba(255,255,255,.9) inset, 0 -2px 0 rgba(30,50,200,.06) inset', overflow: 'hidden'}}>
        {/* shine sweep */}
        <div style={{position: 'absolute', top: 0, bottom: 0, width: 220, left: `${shine * 100}%`, transform: 'skewX(-18deg)', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.75), transparent)', pointerEvents: 'none'}} />
        {/* header */}
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          <div style={{width: 84, height: 84, borderRadius: 42, background: BLUE_GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: '0 8px 18px rgba(30,50,200,.35)', transform: `scale(${spring({frame: f - 6, fps, config: {damping: 12, stiffness: 160}})})`}}>
            <Glyph kind={icon} size={46} color={C.white} />
          </div>
          <div>
            {eyebrow && <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, letterSpacing: '0.2em', color: 'rgba(18,32,107,.62)', textTransform: 'uppercase', marginBottom: 4}}>{eyebrow}</div>}
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 50, lineHeight: 1.08, color: C.navy, letterSpacing: '-0.015em'}}>
              {words.map((w, i) => <span key={i} style={{color: titleBlue.includes(w) ? C.blue : C.navy}}>{w}{i < words.length - 1 ? ' ' : ''}</span>)}
            </div>
          </div>
        </div>
        {(rows.length > 0 || counter) && <div style={{height: 2, background: 'rgba(18,32,107,.1)', margin: '26px 0 10px', transform: `scaleX(${goldLine})`, transformOrigin: 'left'}} />}
        {rows.map((r, i) => {
          const rp = interpolate(f, [r.at, r.at + 12], [0, 1], {...CL, easing: EASE});
          const ck = spring({frame: f - r.at - 2, fps, config: {damping: 11, stiffness: 180}});
          const ws = r.t.split(' ');
          return (
            <div key={i} style={{height: ROW * rp, overflow: 'hidden'}}>
              <div style={{height: ROW, display: 'flex', alignItems: 'center', gap: 20, opacity: rp, transform: `translateX(${(1 - rp) * -24}px)`}}>
                <div style={{width: 44, height: 44, borderRadius: 22, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${ck})`, flexShrink: 0}}>
                  <Glyph kind={r.icon ?? 'check'} size={28} color={C.white} />
                </div>
                <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 40, color: C.navy, letterSpacing: '-0.01em', whiteSpace: 'nowrap'}}>
                  {ws.map((w, k) => <span key={k} style={{color: r.strong?.includes(w) ? C.blue : C.navy, fontWeight: r.strong?.includes(w) ? 800 : 700}}>{w}{k < ws.length - 1 ? ' ' : ''}</span>)}
                </div>
              </div>
            </div>
          );
        })}
        {counter && <CounterRow {...counter} />}
        {/* gold hairline */}
        <div style={{position: 'absolute', left: 0, bottom: 0, height: 5, width: `${goldLine * 100}%`, background: `linear-gradient(90deg, ${C.g3}, ${C.g1}, ${C.g2})`}} />
      </div>
      {tag && (
        <div style={{position: 'absolute', left: 0, right: 0, top: -24, display: 'flex', justifyContent: 'center'}}>
          <div style={{padding: '10px 28px', borderRadius: 999, background: BLUE_GRAD, color: C.white, fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: '0.18em',
            boxShadow: '0 8px 20px rgba(18,32,107,.4)', transform: `scale(${spring({frame: f - 3, fps, config: {damping: 12, stiffness: 170}})})`}}>{tag}</div>
        </div>
      )}
      {sparkle && <Sparkle x={width - 18} y={-6} size={58} at={14} dur={dur} />}
    </div>
  );
};

// counter ring row (e.g. 2 KALI / 1,000)
export const CounterRow: React.FC<{at: number; to: number; unit: string; pre?: string; label: string; from?: number}> = ({at, to, unit, pre, label, from = 0}) => {
  const f = useCurrentFrame();
  const rp = interpolate(f, [at, at + 12], [0, 1], {...CL, easing: EASE});
  const c = interpolate(f, [at + 2, at + 30], [0, 1], {...CL, easing: Easing.out(Easing.cubic)});
  const v = Math.round(from + (to - from) * c);
  const R = 46, L = 2 * Math.PI * R;
  return (
    <div style={{height: 132 * rp, overflow: 'hidden'}}>
      <div style={{height: 132, display: 'flex', alignItems: 'center', gap: 24, opacity: rp}}>
        <svg width={112} height={112} viewBox="0 0 112 112">
          <circle cx={56} cy={56} r={R} fill="none" stroke="rgba(30,50,200,.14)" strokeWidth={8} />
          <circle cx={56} cy={56} r={R} fill="none" stroke={C.blue} strokeWidth={8} strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - c)} transform="rotate(-90 56 56)" />
          <text x={56} y={62} textAnchor="middle" fontFamily='"Plus Jakarta Sans"' fontWeight={800} fontSize={v >= 100 ? 26 : 38} fill={C.navy}>{v.toLocaleString('en-US')}</text>
        </svg>
        <div>
          {pre && <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, letterSpacing: '0.2em', color: 'rgba(18,32,107,.6)'}}>{pre}</div>}
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 48, color: C.blue, letterSpacing: '-0.01em', lineHeight: 1.05}}>{label}</div>
          <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 28, color: 'rgba(18,32,107,.7)'}}>{unit}</div>
        </div>
      </div>
    </div>
  );
};

// 3) NAVY TITLE PANEL (ref 1002_13 "Hotel di Makkah"): gold eyebrow + white title with gold keyword
export const NavyPanel: React.FC<{dur: number; eyebrow: string; title: string; title2?: string; gold?: string[]; y: number; width?: number}> =
({dur, eyebrow, title, title2, gold = [], y, width = 800}) => {
  const {f, p, out, blur} = useInOut(dur, 16);
  const shine = interpolate(f, [8, 36], [-0.3, 1.3], CL);
  const line = interpolate(f, [10, 34], [0, 1], {...CL, easing: EASE});
  return (
    <div style={{position: 'absolute', left: (1080 - width) / 2, width, top: y, transform: `translateY(-50%) translateY(${(1 - p) * 40}px) scale(${0.94 + 0.06 * p})`, opacity: Math.min(1, p * 1.4) * out, filter: `blur(${blur}px)`}}>
      <div style={{position: 'relative', borderRadius: 30, padding: '30px 40px 34px', background: `linear-gradient(135deg, rgba(48,70,224,.94) 0%, rgba(30,50,200,.93) 45%, rgba(18,32,107,.95) 100%)`,
        boxShadow: '0 26px 60px rgba(6,10,40,.45), 0 0 0 1.5px rgba(255,255,255,.22) inset', overflow: 'hidden', textAlign: 'center'}}>
        <div style={{position: 'absolute', top: 0, bottom: 0, width: 200, left: `${shine * 100}%`, transform: 'skewX(-18deg)', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent)'}} />
        <Eyebrow t={eyebrow} at={4} size={24} />
        <div style={{marginTop: 12}}><RevealLine text={title} gold={gold} at={8} size={60} /></div>
        {title2 && <div style={{marginTop: 4}}><RevealLine text={title2} gold={gold} at={13} size={60} /></div>}
        <div style={{position: 'absolute', left: 0, bottom: 0, height: 5, width: `${line * 100}%`, background: `linear-gradient(90deg, ${C.g3}, ${C.g1}, ${C.g2})`}} />
      </div>
      <Sparkle x={width - 14} y={-4} size={56} at={12} dur={dur} />
    </div>
  );
};

// 4) CTA: question line + white pill with blue text and pulsing red arrow (ref 1002_12 / 1002_13 ending)
export const CTA: React.FC<{dur: number; q?: string; qGold?: string[]; label?: string; sub?: string; y?: number}> = ({dur, q, qGold = [], label = 'TEKAN LINK DI BAWAH', sub, y = 1400}) => {
  const {f, p, out, blur} = useInOut(dur, 16);
  const {fps} = useVideoConfig();
  const pill = spring({frame: f - 10, fps, config: {damping: 12, stiffness: 150}});
  const pulse = 1 + 0.035 * Math.max(0, Math.sin((f - 20) / 6));
  const bob = Math.sin(f / 5) * 5;
  const ring = ((f - 20) % 30) / 30;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: y, transform: 'translateY(-50%)', opacity: out, filter: `blur(${blur}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
      {q && <div style={{opacity: p, transform: `translateY(${(1 - p) * 20}px)`, filter: SOFT}}><RevealLine text={q} gold={qGold} at={0} size={52} /></div>}
      <div style={{position: 'relative', transform: `scale(${pill * pulse})`}}>
        {f > 20 && <div style={{position: 'absolute', inset: 0, borderRadius: 999, boxShadow: `0 0 0 ${ring * 22}px rgba(255,255,255,${0.45 * (1 - ring)})`}} />}
        <div style={{display: 'flex', alignItems: 'center', gap: 20, padding: '20px 22px 20px 44px', borderRadius: 999, background: 'linear-gradient(180deg,#FFFFFF,#EEF1FF)',
          boxShadow: '0 18px 40px rgba(6,10,40,.45), 0 0 0 3px rgba(30,50,200,.18) inset'}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 44, color: C.blue, letterSpacing: '0.02em'}}>{label}</div>
          <div style={{width: 64, height: 64, borderRadius: 32, background: `linear-gradient(180deg,#E01818,${C.red})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(200,0,0,.4)'}}>
            <div style={{transform: `translateY(${bob}px)`}}><Glyph kind="arrowDown" size={40} color={C.white} /></div>
          </div>
        </div>
      </div>
      {sub && <div style={{opacity: interpolate(f, [18, 28], [0, 1], CL), padding: '8px 22px', borderRadius: 999, background: C.navy, color: C.g1, fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: '0.18em', boxShadow: '0 8px 18px rgba(6,10,40,.4)'}}>{sub}</div>}
    </div>
  );
};

// 5) END CARD: full-frame summary plate (navy/blue), checklist recap + CTA. Content kept inside the logo-bug safe zone.
export const EndCard: React.FC<{dur: number; eyebrow: string; title: string; sub: string; items: string[]; cta?: string; chip?: string}> = ({dur, eyebrow, title, sub, items, cta = 'TEKAN LINK DI BAWAH', chip}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wipe = interpolate(f, [0, 16], [0, 1], {...CL, easing: Easing.bezier(0.7, 0, 0.3, 1)});
  const out = interpolate(f, [dur - 12, dur], [1, 0], CL);
  const R = wipe * Math.hypot(1080, 1920) * 0.62;
  const divider = interpolate(f, [30, 48], [0, 1], {...CL, easing: EASE});
  const pill = spring({frame: f - (52 + items.length * 9), fps, config: {damping: 12, stiffness: 150}});
  const pulse = 1 + 0.03 * Math.max(0, Math.sin((f - 80) / 6));
  const bob = Math.sin(f / 5) * 5;
  return (
    <AbsoluteFill style={{opacity: out}}>
      <AbsoluteFill style={{clipPath: `circle(${R}px at 540px 960px)`, background: `radial-gradient(120% 70% at 50% 8%, #3A52EE 0%, ${C.blue} 40%, ${C.navy} 100%)`}}>
        <AbsoluteFill style={{opacity: 0.07, backgroundImage: 'linear-gradient(rgba(255,255,255,.9) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,.9) 1.5px, transparent 1.5px)',
          backgroundSize: '72px 72px', backgroundPosition: `0 ${f * 0.5}px`, maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 100%)'}} />
        <AbsoluteFill style={{background: 'radial-gradient(60% 26% at 50% 106%, rgba(242,199,100,.4) 0%, transparent 100%)'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center'}}>
          <Eyebrow t={eyebrow} at={12} size={30} />
          <div style={{marginTop: 18, filter: 'drop-shadow(0 6px 18px rgba(4,8,35,.5))'}}>
            {title.split('\n').map((l, i) => <RevealLine key={i} text={l} gold={['RAMADAN']} at={16 + i * 6} size={i === 0 ? 120 : 96} />)}
          </div>
          <div style={{marginTop: 14, opacity: interpolate(f, [26, 40], [0, 1], CL), fontFamily: SANS, fontStyle: 'italic', fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,.88)'}}>{sub}</div>
          <div style={{margin: '30px auto 0', width: 120 * divider, height: 5, borderRadius: 3, background: GOLD}} />
        </div>
        <div style={{position: 'absolute', left: 120, right: 100, top: 960}}>
          {items.map((t, i) => {
            const at = 46 + i * 9;
            const rp = interpolate(f, [at, at + 12], [0, 1], {...CL, easing: EASE});
            const ck = spring({frame: f - at - 2, fps, config: {damping: 11, stiffness: 180}});
            return (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: 22, height: 74, opacity: rp, transform: `translateX(${(1 - rp) * -30}px)`}}>
                <div style={{width: 46, height: 46, borderRadius: 23, background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${ck})`, flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,.25)'}}>
                  <Glyph kind="check" size={30} color={C.navy} />
                </div>
                <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 40, color: C.white, whiteSpace: 'nowrap', letterSpacing: '-0.01em'}}>{t}</div>
              </div>
            );
          })}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 1350, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
          <div style={{transform: `scale(${pill * pulse})`, display: 'flex', alignItems: 'center', gap: 20, padding: '20px 22px 20px 44px', borderRadius: 999, background: 'linear-gradient(180deg,#FFFFFF,#EEF1FF)', boxShadow: '0 18px 40px rgba(4,8,35,.5)'}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 44, color: C.blue, letterSpacing: '0.02em'}}>{cta}</div>
            <div style={{width: 64, height: 64, borderRadius: 32, background: `linear-gradient(180deg,#E01818,${C.red})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{transform: `translateY(${bob}px)`}}><Glyph kind="arrowDown" size={40} color={C.white} /></div>
            </div>
          </div>
          {chip && <div style={{opacity: interpolate(f, [70 + items.length * 9, 82 + items.length * 9], [0, 1], CL), padding: '9px 24px', borderRadius: 999, background: C.red, color: C.white, fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: '0.18em'}}>{chip}</div>}
        </div>
      </AbsoluteFill>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: interpolate(f, [0, 16, 22], [0.9, 0.6, 0], CL)}}>
        <circle cx={540} cy={960} r={R + 6} fill="none" stroke={C.g2} strokeWidth={8} />
      </svg>
    </AbsoluteFill>
  );
};
