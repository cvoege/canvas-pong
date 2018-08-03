import { getPixelChange } from './Speed.js';
import { getVectorX, getVectorY } from './Vector.js';

export const rawMove = (elem, timeDifference) => {
  if (
    !(
      typeof elem.speed === 'number' &&
      typeof elem.angle === 'number' &&
      typeof elem.x === 'number' &&
      typeof elem.y === 'number' &&
      typeof timeDifference === 'number'
    )
  ) {
    throw new Error(
      'Can not call move on object without speed, angle, x, y, and timeDifference.',
    );
  }
  const pixelChange = getPixelChange(elem.speed, timeDifference);
  const x = getVectorX(elem.angle, pixelChange) + elem.x;
  const y = getVectorY(elem.angle, pixelChange) + elem.y;
  return {
    ...elem,
    x,
    y,
  };
};
