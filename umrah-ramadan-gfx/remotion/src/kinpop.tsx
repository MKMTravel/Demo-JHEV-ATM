// MKM "Kinetic Pop" pack (style B). Extracted from the huzeifastudio reference, recoloured to MKM.
import React, {useId} from 'react';
import {
  AbsoluteFill, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig,
  delayRender, continueRender,
} from 'remotion';

export const C = {navy: '#12206B', blue: '#1E32C8', red: '#C80000', g1: '#FFE9A8', g2: '#F2C764', g3: '#C8923A', white: '#FFFFFF'};
export const GOLD = `linear-gradient(180deg, ${C.g1} 0%, ${C.g2} 45%, ${C.g3} 100%)`;
export const DISPLAY = 'Anton, Impact, sans-serif';            // condensed: hook stack, punch words, sticker labels
export const SANS = '"Plus Jakarta Sans", sans-serif';           // brand font: captions, CTA, labels
export const POP_SHADOW = `drop-shadow(0 0 1.5px ${C.navy}) drop-shadow(0 0 1.5px ${C.navy}) drop-shadow(0 5px 0 ${C.navy}) drop-shadow(0 12px 22px rgba(6,10,40,.45))`;
export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const CL = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---- fonts (module level, blocks render until loaded)
const FONTS: [string, string, string][] = [
  ['Anton', 'anton-latin-400-normal.woff2', '400'],
  ['Plus Jakarta Sans', 'plus-jakarta-sans-latin-600-normal.woff2', '600'],
  ['Plus Jakarta Sans', 'plus-jakarta-sans-latin-700-normal.woff2', '700'],
  ['Plus Jakarta Sans', 'plus-jakarta-sans-latin-800-normal.woff2', '800'],
];
if (typeof window !== 'undefined' && typeof FontFace !== 'undefined') {
  const h = delayRender('fonts');
  Promise.all(FONTS.map(([fam, file, w]) => new FontFace(fam, `url(${staticFile(file)})`, {weight: w}).load().then((f) => (document.fonts as any).add(f))))
    .then(() => continueRender(h)).catch(() => continueRender(h));
}

// ---- gold condensed word with optional red entry flash
export const GoldWord: React.FC<{t: string; size: number; flash?: number; font?: string}> = ({t, size, flash = 0, font = DISPLAY}) => (
  <span style={{position: 'relative', display: 'inline-block', fontFamily: font, fontWeight: font === SANS ? 800 : 400, fontSize: size, lineHeight: 0.92, whiteSpace: 'nowrap', textTransform: 'uppercase'}}>
    <span style={{background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>{t}</span>
    {flash > 0 && <span style={{position: 'absolute', left: 0, top: 0, color: C.red, opacity: flash}}>{t}</span>}
  </span>
);

// 1) HOOK STACK: stacked condensed words, mixed sizes, 3D tilt, word-by-word reveal synced to speech.
export type HookWord = {t: string; s: number; at: number};
export const HookStack: React.FC<{words: HookWord[]; x: number; y: number; align?: 'left' | 'right'; rotY?: number; rotZ?: number; dur: number}> =
({words, x, y, align = 'left', rotY = 18, rotZ = -4, dur}) => {
  const f = useCurrentFrame();
  const out = interpolate(f, [dur - 5, dur], [1, 0], CL);
  const drift = interpolate(f, [0, dur], [1, 1.05]);
  const L = align === 'left';
  return (
    <div style={{position: 'absolute', top: y, ...(L ? {left: x} : {right: 1080 - x}), perspective: 1400, opacity: out}}>
      <div style={{transform: `rotateY(${L ? rotY : -rotY}deg) rotateZ(${rotZ}deg) scale(${drift})`, transformOrigin: L ? 'left top' : 'right top',
        display: 'flex', flexDirection: 'column', alignItems: L ? 'flex-start' : 'flex-end', filter: POP_SHADOW}}>
        {words.map((w, i) => {
          const p = interpolate(f, [w.at, w.at + 8], [0, 1], {...CL, easing: EASE});
          const flash = f < w.at ? 0 : interpolate(f, [w.at, w.at + 3, w.at + 11], [0.95, 0.95, 0], CL);
          return (
            <div key={i} style={{opacity: p, transform: `translateX(${(1 - p) * (L ? -60 : 60)}px)`, filter: `blur(${(1 - p) * 8}px)`, marginTop: i ? -w.s * 0.04 : 0}}>
              <GoldWord t={w.t} size={w.s} flash={flash} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 2) PUNCH WORDS: one word/phrase at a time at chest level, hard cut between words.
export type Punch = {t: string; from: number; to: number; s?: number};
export const PunchWords: React.FC<{items: Punch[]; y?: number}> = ({items, y = 1000}) => {
  const f = useCurrentFrame();
  const it = items.find((i) => f >= i.from && f < i.to);
  if (!it) return null;
  const l = f - it.from;
  const p = interpolate(l, [0, 6], [0, 1], {...CL, easing: EASE});
  const flash = interpolate(l, [0, 2, 9], [1, 1, 0], CL);
  const push = interpolate(l, [0, it.to - it.from], [1, 1.07]);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', justifyContent: 'center', transform: 'translateY(-50%)', filter: POP_SHADOW}}>
      <div style={{opacity: interpolate(l, [0, 3], [0, 1], CL), transform: `translateY(${(1 - p) * 70}px) scale(${(0.9 + 0.1 * p) * push})`, filter: `blur(${(1 - p) * 10}px)`}}>
        <GoldWord t={it.t} size={it.s ?? 150} flash={flash} />
      </div>
    </div>
  );
};

// 3) DUO CAPTION: 1-2 short lines, Jakarta 800 caps, white + gold keywords. Key phrases only, not full subtitles.
export type Cap = {l1: string; l2?: string; hl?: string[]; from: number; to: number};
export const DuoCaption: React.FC<{items: Cap[]; y?: number; size?: number}> = ({items, y = 1010, size = 58}) => {
  const f = useCurrentFrame();
  const it = items.find((i) => f >= i.from && f < i.to);
  if (!it) return null;
  const l = f - it.from;
  const p = interpolate(l, [0, 4], [0, 1], {...CL, easing: EASE});
  const line = (s: string) => s.split(' ').map((w, k, a) => (
    <span key={k} style={{color: it.hl?.includes(w) ? C.g2 : C.white}}>{w}{k < a.length - 1 ? ' ' : ''}</span>
  ));
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: y, transform: `translateY(-50%) translateY(${(1 - p) * 12}px) scale(${0.94 + 0.06 * p})`, opacity: p,
      textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: size, lineHeight: 1.02, letterSpacing: '-0.01em', textTransform: 'uppercase',
      textShadow: `0 3px 0 ${C.navy}, 0 6px 18px rgba(5,10,40,.55)`}}>
      <div>{line(it.l1)}</div>
      {it.l2 && <div>{line(it.l2)}</div>}
    </div>
  );
};

// ---- halftone sticker icons (Material icon paths, Apache-2.0)
export const ICONS = {
  plane: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z',
  luggage: 'M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2 0 .55.45 1 1 1s1-.45 1-1h6c0 .55.45 1 1 1s1-.45 1-1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9.5 18H8V9h1.5v9zm3.25 0h-1.5V9h1.5v9zm.75-12h-3V3.5h3V6zM16 18h-1.5V9H16v9z',
  calendar: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z',
  pin: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  bookmark: 'M6.5 2h11A1.5 1.5 0 0 1 19 3.5V22l-7-5.2L5 22V3.5A1.5 1.5 0 0 1 6.5 2z',
  heart: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  share: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z',
  moon: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z',
  check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  clock: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
  food: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z',
  wallet: 'M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  bed: 'M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z',
  arrowDown: 'M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z',
  shield: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z',
  gift: 'M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z',
  star4: 'M12 0C12.8 7.6 16.4 11.2 24 12 16.4 12.8 12.8 16.4 12 24 11.2 16.4 7.6 12.8 0 12 7.6 11.2 11.2 7.6 12 0Z',
} as const;
export type IconKind = keyof typeof ICONS;
const FILLS = {
  gold: [C.g1, C.g2, C.g3, 'rgba(160,100,20,.45)'],
  blue: ['#5B6FF0', C.blue, C.navy, 'rgba(10,18,70,.5)'],
  white: ['#FFFFFF', '#EEF1FF', '#C9D0F5', 'rgba(30,50,200,.35)'],
  red: ['#FF5A4F', C.red, '#8A0000', 'rgba(70,0,0,.45)'],
} as const;

const GLYPH = {gold: C.navy, blue: C.white, white: C.blue, red: C.white} as const;
export const StickerIcon: React.FC<{kind: IconKind; size: number; fill?: keyof typeof FILLS; outline?: boolean; tile?: boolean}> = ({kind, size, fill = 'gold', outline = true, tile = false}) => {
  const id = useId().replace(/:/g, '');
  const [a, b, c, dot] = FILLS[fill];
  if (tile) {
    // chunky "3D app tile": gradient rounded square + navy extrude + halftone + gloss, glyph on top
    return (
      <svg width={size} height={size} viewBox="-1 -1 26 27" style={{overflow: 'visible', display: 'block'}}>
        <defs>
          <linearGradient id={`g${id}`} x1="0" y1="0" x2="0.5" y2="1"><stop offset="0" stopColor={a} /><stop offset="0.55" stopColor={b} /><stop offset="1" stopColor={c} /></linearGradient>
          <pattern id={`h${id}`} width="1.2" height="1.2" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="0.6" cy="0.6" r="0.3" fill={dot} /></pattern>
          <radialGradient id={`m${id}`} cx="0.25" cy="0.2" r="1"><stop offset="0.3" stopColor="#000" /><stop offset="1" stopColor="#fff" /></radialGradient>
          <mask id={`k${id}`}><rect x="0" y="0" width="24" height="24" rx="6" fill={`url(#m${id})`} /></mask>
          <linearGradient id={`s${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        </defs>
        <rect x="0" y="1.8" width="24" height="24" rx="6" fill={C.navy} />
        <rect x="0" y="0" width="24" height="24" rx="6" fill={`url(#g${id})`} stroke={C.navy} strokeWidth={0.9} />
        <rect x="0" y="0" width="24" height="24" rx="6" fill={`url(#h${id})`} mask={`url(#k${id})`} />
        <path d="M6 1.2h12a4.8 4.8 0 0 1 4.8 4.8v1.5C16 5.5 8 5.5 1.2 9V6A4.8 4.8 0 0 1 6 1.2z" fill={`url(#s${id})`} />
        <path d={ICONS[kind]} transform="translate(4.2 4.6) scale(0.65)" fill={C.navy} opacity={0.35} />
        <path d={ICONS[kind]} transform="translate(4.2 3.9) scale(0.65)" fill={GLYPH[fill]} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="-2 -2 28 28" style={{overflow: 'visible', display: 'block'}}>
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stopColor={a} /><stop offset="0.5" stopColor={b} /><stop offset="1" stopColor={c} /></linearGradient>
        <pattern id={`h${id}`} width="1.3" height="1.3" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="0.65" cy="0.65" r="0.33" fill={dot} /></pattern>
        <radialGradient id={`m${id}`} cx="0.3" cy="0.25" r="0.9"><stop offset="0.25" stopColor="#000" /><stop offset="1" stopColor="#fff" /></radialGradient>
        <mask id={`k${id}`}><rect x="-2" y="-2" width="28" height="28" fill={`url(#m${id})`} /></mask>
        <clipPath id={`c${id}`}><path d={ICONS[kind]} /></clipPath>
      </defs>
      {outline && <path d={ICONS[kind]} fill={C.navy} stroke={C.navy} strokeWidth={2.2} strokeLinejoin="round" transform="translate(0.35 0.7)" />}
      <path d={ICONS[kind]} fill={`url(#g${id})`} stroke={outline ? C.navy : 'none'} strokeWidth={1.1} strokeLinejoin="round" />
      <g clipPath={`url(#c${id})`}><rect x="-2" y="-2" width="28" height="28" fill={`url(#h${id})`} mask={`url(#k${id})`} /></g>
    </svg>
  );
};

// pop-in helper (spring overshoot) + idle bob
const usePop = (at: number, dur: number) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = spring({frame: f - at, fps, config: {damping: 11, stiffness: 170, mass: 0.7}});
  const out = interpolate(f, [dur - 6, dur], [1, 0], {...CL, easing: Easing.in(Easing.cubic)});
  return {s: f < at ? 0 : s * out, f};
};

export type Prop = {kind: IconKind; x: number; y: number; size: number; rot?: number; at: number; fill?: keyof typeof FILLS; tile?: boolean};
export const PopIcon: React.FC<Prop & {dur: number}> = ({kind, x, y, size, rot = 0, at, fill, tile, dur}) => {
  const {s, f} = usePop(at, dur);
  const bob = Math.sin((f - at) / 11) * 8;
  const wob = Math.sin((f - at) / 17) * 4;
  const tilt = tile ? `perspective(700px) rotateY(${(x < 540 ? 14 : -14) + wob}deg) rotateX(8deg) ` : '';
  return (
    <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2 + bob, transform: `${tilt}scale(${s}) rotate(${rot + wob + (1 - Math.min(s, 1)) * -25}deg)`, filter: 'drop-shadow(0 16px 20px rgba(6,10,40,.38))'}}>
      <StickerIcon kind={kind} size={size} fill={fill} tile={tile} />
    </div>
  );
};

// sticker label: condensed gold text with thick navy outline + extrude, tilted
export const StickerLabel: React.FC<{t: string; x: number; y: number; size: number; rot: number; at: number; dur: number}> = ({t, x, y, size, rot, at, dur}) => {
  const {s} = usePop(at, dur);
  const lines = t.split('\n');
  const common: React.CSSProperties = {fontFamily: DISPLAY, fontSize: size, lineHeight: 0.9, textTransform: 'uppercase', whiteSpace: 'pre', textAlign: 'center'};
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s}) rotate(${rot + (1 - Math.min(s, 1)) * 14}deg)`}}>
      <div style={{...common, color: C.navy, WebkitTextStroke: `${size * 0.16}px ${C.navy}`, textShadow: `0 ${size * 0.07}px 0 ${C.navy}`}}>{lines.join('\n')}</div>
      <div style={{...common, position: 'absolute', inset: 0, background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>{lines.join('\n')}</div>
    </div>
  );
};

// halftone disc (sits BEHIND the talent: in CapCut put a background-removed copy of the talent above this MOV)
export const HalftoneDisc: React.FC<{cx: number; cy: number; r: number; at: number; dur: number}> = ({cx, cy, r, at, dur}) => {
  const {s} = usePop(at, dur);
  const id = useId().replace(/:/g, '');
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <defs>
        <radialGradient id={`d${id}`} cx="0.42" cy="0.35" r="0.75"><stop offset="0" stopColor="#4A60F2" /><stop offset="0.6" stopColor={C.blue} /><stop offset="1" stopColor={C.navy} /></radialGradient>
        <pattern id={`p${id}`} width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="11" cy="11" r="5.5" fill={C.navy} /></pattern>
        <radialGradient id={`r${id}`} cx="0.5" cy="0.5" r="0.5"><stop offset="0.45" stopColor="#000" /><stop offset="1" stopColor="#fff" /></radialGradient>
        <mask id={`k${id}`}><circle cx={cx} cy={cy} r={r} fill={`url(#r${id})`} /></mask>
      </defs>
      <g transform={`translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`}>
        <circle cx={cx} cy={cy} r={r + 10} fill="none" stroke={C.g2} strokeWidth={4} opacity={0.9} />
        <circle cx={cx} cy={cy} r={r} fill={`url(#d${id})`} />
        <circle cx={cx} cy={cy} r={r} fill={`url(#p${id})`} mask={`url(#k${id})`} opacity={0.7} />
      </g>
    </svg>
  );
};

export const Sparkle: React.FC<{x: number; y: number; size: number; at: number; dur: number; color?: string}> = ({x, y, size, at, dur, color = C.g1}) => {
  const {s, f} = usePop(at, dur);
  const tw = 0.7 + 0.3 * Math.abs(Math.sin((f - at) / 6));
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{position: 'absolute', left: x - size / 2, top: y - size / 2, transform: `scale(${s * tw}) rotate(${(f - at) * 2}deg)`, filter: 'drop-shadow(0 0 10px rgba(255,233,168,.8))'}}>
      <path d={ICONS.star4} fill={color} />
    </svg>
  );
};

// 4) STICKER BURST: audience call-out moment. Disc + tilted labels + icons + sparkles.
export const StickerBurst: React.FC<{dur: number; disc?: {cx: number; cy: number; r: number}; labels: {t: string; x: number; y: number; size: number; rot: number; at: number}[]; icons: Prop[]; sparkles?: {x: number; y: number; size: number; at: number}[]}> =
({dur, disc, labels, icons, sparkles = []}) => (
  <AbsoluteFill>
    {disc && <HalftoneDisc {...disc} at={0} dur={dur} />}
    {icons.map((p, i) => <PopIcon key={i} {...p} dur={dur} />)}
    {labels.map((l, i) => <StickerLabel key={i} {...l} dur={dur} />)}
    {sparkles.map((s, i) => <Sparkle key={i} {...s} dur={dur} />)}
  </AbsoluteFill>
);

// 5) SAVE / SHARE CTA: scrim + big halftone icon dropping in + caption. Add a CapCut Blur effect on the video under it.
export const SaveCTA: React.FC<{dur: number; l1?: string; l2?: string; icon?: IconKind; y?: number}> = ({dur, l1 = 'SAVE DULU', l2 = 'VIDEO NI', icon = 'bookmark', y = 930}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const scrim = interpolate(f, [0, 6, dur - 6, dur], [0, 1, 1, 0], CL);
  const drop = spring({frame: f - 2, fps, config: {damping: 10, stiffness: 140, mass: 0.8}});
  const out = interpolate(f, [dur - 6, dur], [1, 0], CL);
  const wig = Math.sin((f - 2) / 5) * 3 * Math.max(0, 1 - (f - 2) / 40);
  const cap = interpolate(f, [7, 12], [0, 1], {...CL, easing: EASE});
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{opacity: scrim, background: `radial-gradient(ellipse 70% 45% at 50% 48%, rgba(18,32,107,.18) 0%, rgba(18,32,107,.62) 100%)`}} />
      <div style={{position: 'absolute', left: 540 - 230, top: y - 330, transform: `translateY(${(1 - drop) * -420}px) rotate(${-14 + (1 - drop) * -30 + wig}deg) scale(${out})`, filter: 'drop-shadow(0 20px 30px rgba(6,10,40,.45))'}}>
        <StickerIcon kind={icon} size={460} fill="gold" />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: y + 70, textAlign: 'center', opacity: cap * out, transform: `scale(${0.85 + 0.15 * cap})`,
        fontFamily: SANS, fontWeight: 800, fontSize: 64, lineHeight: 1.0, color: C.white, textShadow: `0 4px 0 ${C.navy}, 0 8px 20px rgba(5,10,40,.6)`}}>
        <div>{l1}</div><div style={{color: C.g2}}>{l2}</div>
      </div>
    </AbsoluteFill>
  );
};

// 6) CIRCLE WIPE -> SECTION PLATE: oval grows from a point (usually the face) into an MKM navy/blue plate.
// Plate is opaque after the wipe: in CapCut put the screen recording / B-roll card ABOVE it in the card zone.
export const CARD = {x: 73, y: 430, w: 934, h: 932, r: 36}; // card zone for her screen rec / B-roll (safe zone ok)
export const SectionPlate: React.FC<{step?: string; label?: string; showCardShadow?: boolean}> = ({step, label, showCardShadow = true}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `radial-gradient(130% 75% at 50% 0%, #3A52EE 0%, ${C.blue} 38%, ${C.navy} 100%)`}}>
      <AbsoluteFill style={{opacity: 0.09, backgroundImage: 'linear-gradient(rgba(255,255,255,.9) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,.9) 1.5px, transparent 1.5px)',
        backgroundSize: '72px 72px', backgroundPosition: `0 ${f * 0.6}px`, maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 100%)'}} />
      <AbsoluteFill style={{background: `radial-gradient(60% 30% at 50% 108%, rgba(242,199,100,.38) 0%, transparent 100%)`}} />
      {showCardShadow && <div style={{position: 'absolute', left: CARD.x, top: CARD.y, width: CARD.w, height: CARD.h, borderRadius: CARD.r, boxShadow: '0 30px 60px rgba(4,8,35,.55), 0 0 0 2px rgba(255,255,255,.18)'}} />}
      {(step || label) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: CARD.y + CARD.h + 40, textAlign: 'center', fontFamily: SANS}}>
          {step && <div style={{display: 'inline-block', padding: '8px 22px', borderRadius: 999, background: GOLD, color: C.navy, fontWeight: 800, fontSize: 30, letterSpacing: '0.12em'}}>{step}</div>}
          {label && <div style={{marginTop: 16, color: C.white, fontWeight: 600, fontSize: 44}}>{label}</div>}
        </div>
      )}
    </AbsoluteFill>
  );
};
export const CircleWipe: React.FC<{cx?: number; cy?: number; len?: number; step?: string; label?: string}> = ({cx = 540, cy = 560, len = 11, step, label}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, len], [0, 1], {...CL, easing: Easing.bezier(0.7, 0, 0.3, 1)});
  const R = p * Math.hypot(1080, 1920) * 1.05;
  const ring = interpolate(f, [0, len, len + 4], [0.9, 0.6, 0], CL);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{clipPath: `ellipse(${R * 0.82}px ${R}px at ${cx}px ${cy}px)`}}><SectionPlate step={step} label={label} /></AbsoluteFill>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: ring}}>
        <ellipse cx={cx} cy={cy} rx={R * 0.82 + 6} ry={R + 6} fill="none" stroke={C.g2} strokeWidth={8} />
      </svg>
    </AbsoluteFill>
  );
};
