export interface Point {
  x: number;
  y: number;
}

export function newPoint(x: number, y: number) {
  return { x, y };
}
