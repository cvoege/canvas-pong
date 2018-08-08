export interface Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export const getColor = (
  red: number,
  green: number,
  blue: number,
  alpha: number = 100,
) => {
  return {
    alpha,
    blue,
    green,
    red,
  };
};

export const toColorString = (color: Color): string => {
  return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha}%)`;
};

export const setAlpha = (color: Color, alpha: number): Color => {
  return {
    ...color,
    alpha,
  };
};

export const WHITE = getColor(255, 255, 255);
export const BLACK = getColor(0, 0, 0);
