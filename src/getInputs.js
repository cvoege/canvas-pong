export const S_KEYCODE = 83;
export const W_KEYCODE = 87;
export const UP_KEYCODE = 38;
export const DOWN_KEYCODE = 40;
export const SPACE_KEYCODE = 32;

const keys = {};

window.onkeyup = (keyEvent) => {
  keys[keyEvent.keyCode] = false;
};
window.onkeydown = (keyEvent) => {
  keys[keyEvent.keyCode] = true;
};

export default () => {
  return {
    keys,
  };
}; 
