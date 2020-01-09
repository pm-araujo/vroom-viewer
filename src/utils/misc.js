const MAX_HUE = 360;
const MIN_HUE = 0;
const MAX_SAT = 100;
const MIN_SAT = 80;
const MAX_LIT = 70;
const MIN_LIT = 40;
const MAX_DISTANCE = 25;

/**
 * Generates a random color
 *  if colors is given, then attempts to generate a distinct color from those
 * 
 * @param {} colors existant color dataset
 */
export function genRandomColor(colors) {
  const isDistinct = ({ hue, sat, lit }, { cHue, cSat, cLit}) => {
    const distHue = Math.abs( hue - cHue);
    const distSat = Math.abs( sat - cSat);
    const distLit = Math.abs( lit - cLit);

    return (distHue + distSat + distLit) > MAX_DISTANCE;
  };

  const parsedColors = colors.map(c => {

    if (typeof c.split !== 'function') {
      debugger;
    }
    const [start, middle, end] = c.split(',');
    
    return {
      hue: Number.parseInt(start.split('hsl(')[1]),
      sat: Number.parseInt(middle),
      lit: Number.parseInt(end)
    };
  });


  let cHue, cSat, cLit;
  do {
    cHue = Math.floor(Math.random() * (MAX_HUE - MIN_HUE) + MIN_HUE);
    cSat = Math.floor(Math.random() * (MAX_SAT - MIN_SAT) + MIN_SAT);
    cLit = Math.floor(Math.random() * (MAX_LIT - MIN_LIT) + MIN_LIT);
debugger;
  } while(!parsedColors.every(c => isDistinct(c, { cHue, cSat, cLit })));
debugger;
  return `hsl(${cHue}, ${cSat}%, ${cLit}%)`;
}