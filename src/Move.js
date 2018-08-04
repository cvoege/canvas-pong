import { getVectorX, getVectorY } from './Vector.js';

export const rawMove = (elem, timeDifference) => {
  if (
    !(
      typeof elem.vector === 'object' &&
      typeof elem.vector.vx === 'number' &&
      typeof elem.vector.vy === 'number' &&
      typeof elem.x === 'number' &&
      typeof elem.y === 'number' &&
      typeof timeDifference === 'number'
    )
  ) {
    console.error(elem, timeDifference);
    throw new Error(
      'Can not call move on object without vector x, y, and timeDifference.',
    );
  }

  return {
    ...elem,
    x: elem.x + elem.vector.vx * timeDifference,
    y: elem.y + elem.vector.vy * timeDifference,
  };
};
