import React from 'react';
import {Composition} from 'remotion';
import {FPS, W, H} from './theme';
import {T1, T2, C1, C2, T3, CTA} from './Gfx';

// Times are seconds on the offline edit's timeline (sketch_2.mp4, 37.67s, 30fps)
export const GFX = [
  {id: '01-T1-PengangkutanSangatPenting', from: 20.3, to: 23.4, el: T1},
  {id: '02-T2-KitaNaikTrain', from: 24.6, to: 27.95, el: T2},
  {id: '03-C1-FreshKemasSihat', from: 28.0, to: 30.5, el: C1},
  {id: '04-C2-HaramainSpeedTrain', from: 31.2, to: 34.8, el: C2},
  {id: '05-T3-BertenagaDalamIbadah', from: 34.9, to: 36.45, el: T3},
  {id: '06-CTA-KlikLinkDiBawah', from: 36.55, to: 37.667, el: CTA},
];

export const Root: React.FC = () => (
  <>
    {GFX.map((g) => {
      const dur = Math.round((g.to - g.from) * FPS);
      const El = g.el;
      return <Composition key={g.id} id={g.id} component={() => <El dur={dur} />} durationInFrames={dur} fps={FPS} width={W} height={H} />;
    })}
  </>
);
