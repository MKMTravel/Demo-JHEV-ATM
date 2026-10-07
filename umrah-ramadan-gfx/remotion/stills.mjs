import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
const browserExecutable = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const serveUrl = process.env.BUNDLE || await bundle({entryPoint: path.resolve('src/index.ts')});
console.log('BUNDLE', serveUrl);
for (const spec of process.argv.slice(2)) {
  const [id, frame] = spec.split('@');
  const composition = await selectComposition({serveUrl, id, browserExecutable});
  const fr = frame === 'last' ? composition.durationInFrames - 14 : Number(frame);
  await renderStill({serveUrl, composition, frame: fr, output: `out/${process.env.OUT||"st"}/${id}@${frame}.png`, browserExecutable, imageFormat: 'png'});
  console.log('ok', id, fr);
}
