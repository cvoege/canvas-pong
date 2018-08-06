export const S_KEYCODE = 83;
export const W_KEYCODE = 87;
export const UP_KEYCODE = 38;
export const DOWN_KEYCODE = 40;
export const SPACE_KEYCODE = 32;

type KeysDown = Set<number>;
export interface Inputs {
  keysDown: KeysDown;
}

const keysDown: KeysDown = new Set();

window.onkeyup = (keyEvent) => {
  keysDown.delete(keyEvent.keyCode);
};
window.onkeydown = (keyEvent) => {
  keysDown.add(keyEvent.keyCode);
};

const getInputs = (): Inputs => {
  return {
    keysDown,
  };
};

export default getInputs;
