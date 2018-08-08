export interface Rectangle {
  x: number;
  y: number;
  height: number;
  width: number;
}

export const top = (elem: Rectangle) => elem.y;
export const bottom = (elem: Rectangle) => {
  return elem.y + elem.height;
};
export const left = (elem: Rectangle) => elem.x;
export const right = (elem: Rectangle) => {
  return elem.x + elem.width;
};
