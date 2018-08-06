import { getVectorX, getVectorY } from './Vector';

import { Paddle } from './Paddle';
import { Ball } from './Ball';

export const rawMove = (elem: any, timeDifference: number): any => {
  return {
    ...elem,
    x: elem.x + elem.vector.vx * timeDifference,
    y: elem.y + elem.vector.vy * timeDifference,
  };
};
