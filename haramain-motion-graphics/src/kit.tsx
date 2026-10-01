import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, GOLD_GRAD, ZONE_BOTTOM, H} from './theme';

export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const prog = (f: number, start: number, dur: number) =>
  interpolate(f, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

export const FontFaces: React.FC = () => (
  <style>{[500, 600, 700, 800, 900]
    .map(
      (w) =>
        `@font-face{font-family:'Montserrat';font-weight:${w};src:url('${staticFileUrl(
          `fonts/montserrat-latin-${w}-normal.woff2`
        )}') format('woff2');}`
    )
    .join('')}</style>
);
import {staticFile} from 'remotion';
const staticFileUrl = (p: string) => staticFile(p);

/** Bottom-anchored stage with fade+blur exit over the last `exit` frames. */
export const Stage: React.FC<{
  dur: number;
  exit?: number;
  noExit?: boolean;
  bottom?: number;
  children: React.ReactNode;
}> = ({dur, exit = 10, noExit, bottom = ZONE_BOTTOM, children}) => {
  const f = useCurrentFrame();
  const e = noExit ? 0 : interpolate(f, [dur - exit, dur - 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', inset: 0, fontFamily: FONT}}>
      <FontFaces />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: H - bottom,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 1 - e,
          filter: e > 0 ? `blur(${e * 10}px)` : undefined,
          transform: `translateY(${-e * 14}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Clip-3 style kinetic word: masked rise + overshoot pop + tiny tilt. */
export const PopWord: React.FC<{
  text: string;
  delay: number;
  size: number;
  gold?: boolean;
  tilt?: number;
  tracking?: number;
}> = ({text, delay, size, gold, tilt = -3, tracking = -0.01}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - delay, fps, config: {damping: 11, stiffness: 190, mass: 0.7}});
  const a = interpolate(f - delay, [0, 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const shine = interpolate(f - delay, [6, 22], [-30, 130], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{overflow: 'hidden', padding: `${size * 0.12}px ${size * 0.2}px ${size * 0.2}px`, margin: `${-size * 0.12}px ${-size * 0.2}px ${-size * 0.2}px`}}>
      <div
        style={{
          fontWeight: 900,
          fontSize: size,
          lineHeight: 0.92,
          letterSpacing: `${tracking}em`,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          opacity: a,
          transform: `translateY(${(1 - s) * size * 0.9}px) scale(${0.78 + 0.22 * s}) rotate(${(1 - s) * tilt}deg)`,
          transformOrigin: '50% 100%',
          filter: `drop-shadow(0 4px 0 ${C.navy}) drop-shadow(0 10px 22px rgba(18,32,107,0.55))`,
        }}
      >
        <span
          style={
            gold
              ? {
                  backgroundImage: `linear-gradient(105deg, rgba(255,255,255,0) ${shine - 12}%, rgba(255,255,255,.95) ${shine}%, rgba(255,255,255,0) ${shine + 12}%), ${GOLD_GRAD}`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }
              : {color: '#fff'}
          }
        >
          {text}
        </span>
      </div>
    </div>
  );
};

/** Gold hairline that draws in with a red end-dot. */
export const GoldRule: React.FC<{delay: number; width: number}> = ({delay, width}) => {
  const f = useCurrentFrame();
  const p = prog(f, delay, 16);
  return (
    <div style={{position: 'relative', width, height: 6, marginTop: 14, filter: 'drop-shadow(0 2px 6px rgba(18,32,107,.5))'}}>
      <div style={{position: 'absolute', left: (width * (1 - p)) / 2, width: width * p, top: 1, height: 3, borderRadius: 3, background: `linear-gradient(90deg, ${C.gold3}, ${C.gold1}, ${C.gold3})`}} />
      <div style={{position: 'absolute', left: width / 2 - 5, top: -2, width: 10, height: 10, borderRadius: 10, background: C.red, transform: `scale(${p})`, boxShadow: '0 0 0 3px rgba(255,255,255,.9)'}} />
    </div>
  );
};

/** Clip-2 style blue letter-spaced label pill. */
export const LabelPill: React.FC<{text: string; delay: number; size?: number}> = ({text, delay, size = 25}) => {
  const f = useCurrentFrame();
  const p = prog(f, delay, 18);
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${C.blue}, #2A44E6)`,
        color: '#fff',
        fontWeight: 800,
        fontSize: size,
        letterSpacing: '0.16em',
        padding: `${size * 0.52}px ${size * 1.1}px`,
        borderRadius: 999,
        boxShadow: '0 10px 26px rgba(18,32,107,.38), inset 0 1px 0 rgba(255,255,255,.35)',
        opacity: p,
        transform: `translateY(${(1 - p) * 26}px) scale(${0.92 + 0.08 * p})`,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};

export const Check: React.FC<{size?: number; color?: string}> = ({size = 40, color = C.blue}) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="20" fill={color} />
    <path d="M11.5 20.5 L17.5 26.5 L29 14" fill="none" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ClockIcon: React.FC<{size?: number}> = ({size = 64}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="32" fill={C.blue} />
    <circle cx="32" cy="32" r="19" fill="none" stroke="#fff" strokeWidth="4" />
    <path d="M32 21 V32 L40 37" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** white premium card shell (clip-2 look) */
export const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg,#FFFFFF 0%,#F4F6FF 100%)',
  borderRadius: 30,
  boxShadow: '0 22px 50px rgba(18,32,107,.34), 0 2px 0 rgba(255,255,255,.9) inset, 0 0 0 1.5px rgba(200,146,58,.35)',
};
