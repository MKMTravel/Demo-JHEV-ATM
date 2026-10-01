import React from 'react';
import {C} from './theme';

// Haramain high-speed train, side profile facing right. Vector so it stays crisp + alpha-clean.
// viewBox 1000 x 230
export const TrainSvg: React.FC<{width: number; id?: string}> = ({width, id = 't'}) => {
  const h = (width * 230) / 1000;
  return (
    <svg width={width} height={h} viewBox="0 0 1000 230" style={{overflow: 'visible'}}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.35" stopColor="#F1F3F9" />
          <stop offset="0.75" stopColor="#CBD1E2" />
          <stop offset="1" stopColor="#9AA3C0" />
        </linearGradient>
        <linearGradient id={`${id}-stripe`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.navy} />
          <stop offset="0.6" stopColor={C.blue} />
          <stop offset="1" stopColor="#3A55F0" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A3A78" />
          <stop offset="0.55" stopColor="#0B1238" />
          <stop offset="1" stopColor="#060A24" />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.gold3} stopOpacity="0" />
          <stop offset="0.3" stopColor={C.gold2} />
          <stop offset="0.7" stopColor={C.gold1} />
          <stop offset="1" stopColor={C.gold2} />
        </linearGradient>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.12" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id={`${id}-m`}>
          <rect x="0" y="-20" width="1000" height="260" fill={`url(#${id}-fade)`} />
        </mask>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="0.35" stopColor="#CFE0FF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#CFE0FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g mask={`url(#${id}-m)`}>
        {/* body */}
        <path
          d="M0 40 L540 40 C720 40 862 76 976 142 Q1000 156 980 168 L944 178 L0 178 Z"
          fill={`url(#${id}-body)`}
        />
        {/* roof highlight */}
        <path d="M0 44 L560 44 C720 44 850 78 940 128 L560 52 L0 52 Z" fill="#fff" opacity="0.7" />
        {/* window band */}
        {Array.from({length: 7}).map((_, i) => (
          <g key={i}>
            <rect x={14 + i * 92} y="62" width="76" height="44" rx="10" fill={`url(#${id}-glass)`} />
            <path d={`M${24 + i * 92} 66 L${52 + i * 92} 66 L${34 + i * 92} 102 L${22 + i * 92} 102 Z`} fill="#fff" opacity="0.14" />
          </g>
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={104 + i * 92} y1="48" x2={104 + i * 92} y2="170" stroke="#9AA3C0" strokeWidth="1.5" opacity="0.55" />
        ))}
        {/* windscreen */}
        <path
          d="M660 62 C752 62 836 88 912 130 L912 134 L660 134 Z"
          fill={`url(#${id}-glass)`}
        />
        <path d="M672 68 C750 70 815 90 862 112 L700 112 Z" fill="#fff" opacity="0.16" />
        {/* stripe */}
        <path d="M0 126 L690 126 C800 126 880 150 955 160 L955 176 L0 176 Z" fill={`url(#${id}-stripe)`} />
        <path d="M0 122 L690 122 C802 122 884 146 960 156" fill="none" stroke={`url(#${id}-gold)`} strokeWidth="3.2" />
        {/* red accent */}
        <path d="M430 160 L700 160 L690 168 L424 168 Z" fill={C.red} opacity="0.92" />
        {/* underframe */}
        <path d="M0 176 L955 176 L940 190 L0 190 Z" fill="#171C3A" />
        {[120, 300, 480, 660, 820].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="192" rx="42" ry="5" fill="#0B0F26" />
            <circle cx={x - 18} cy="194" r="12" fill="#2A3158" />
            <circle cx={x + 18} cy="194" r="12" fill="#2A3158" />
          </g>
        ))}
        {/* headlight */}
        <ellipse cx="952" cy="152" rx="9" ry="4.5" fill="#FFF7D6" />
      </g>
      <ellipse cx="962" cy="150" rx="46" ry="26" fill={`url(#${id}-glow)`} opacity="0.9" />
    </svg>
  );
};
