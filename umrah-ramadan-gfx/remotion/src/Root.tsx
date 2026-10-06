import React from 'react';
import {Composition, AbsoluteFill} from 'remotion';
import {KineticTitle, InfoCard, CTA, EndCard, NavyPanel} from './calm';
const T = () => (<AbsoluteFill style={{background: '#777'}}>
  <KineticTitle eyebrow="BULAN PALING MULIA" lines={['UMRAH DI BULAN', 'RAMADAN']} gold={['RAMADAN']} y={600} dur={120} />
  <InfoCard dur={120} tag="KELEBIHAN" icon="moon" eyebrow="umrah ramadan" title="Pahala seperti haji" titleBlue={['haji']} rows={[{t: 'Lebih tenang', at: 20}, {t: 'Iftar di Masjidil Haram', at: 30}]} counter={{at: 40, to: 2, unit: 'kali ganda', label: '2 KALI', pre: 'PAHALA'}} bottom={1500} />
</AbsoluteFill>);
export const Root: React.FC = () => (<>
  <Composition id="Test" component={T} durationInFrames={120} fps={30} width={1080} height={1920} />
</>);
