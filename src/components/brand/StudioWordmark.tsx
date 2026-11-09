import type { CSSProperties } from 'react';
import { jaiaxLogo } from '@/data/jaiax-logo';

const letters = jaiaxLogo.paths.filter(glyph => glyph.group === 'jaiax').flatMap(glyph => glyph.d);
const star = ['M40 6V74', 'M6 40H74', 'M16 16L64 64', 'M16 64L64 16'];

/** The actual centerline paths of the brand, not a font outline or a raster imitation. */
export function StudioWordmark() {
  return <svg className="lab-wordmark" viewBox="390 608 850 120" fill="none" role="img" aria-label="JAIAX" focusable="false">
    <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {letters.map((d,index)=><path key={index} className="masthead-stroke" d={d} pathLength={1} vectorEffect="non-scaling-stroke" style={{'--stroke-order':index} as CSSProperties}/>)}
    </g>
    <g className="masthead-star" transform="translate(1144 614) scale(.85)" stroke="var(--p-accent)" strokeWidth="2" strokeLinecap="round">
      {star.map((d,index)=><path key={d} className="masthead-stroke" d={d} pathLength={1} vectorEffect="non-scaling-stroke" style={{'--stroke-order':index+6} as CSSProperties}/>)}
    </g>
  </svg>;
}
