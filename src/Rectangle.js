export const top = (elem) => elem.y;
export const bottom = (elem) => {
  if (typeof elem.height === 'number') {
    return elem.y + elem.height;
  } else if (typeof elem.radius === 'number') {
    return elem.y + elem.radius * 2;
  } else {
    throw new Error('bottom called on invalid object');
  }
};
export const left = (elem) => elem.x;
export const right = (elem) => {
  if (typeof elem.width === 'number') {
    return elem.x + elem.width;
  } else if (typeof elem.radius === 'number') {
    return elem.x + elem.radius * 2;
  } else {
    throw new Error('right called on invalid object');
  }
};
