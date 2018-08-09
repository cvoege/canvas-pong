import { Vector } from './Vector';

export const rawMove = (
  { x, y, vector }: { x: number; y: number; vector: Vector },
  timeDifference: number,
): { x: number; y: number } => {
  return {
    x: x + vector.vx * timeDifference,
    y: y + vector.vy * timeDifference,
  };
};
