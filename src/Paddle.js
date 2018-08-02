import { HEIGHT } from './Size.js';
import { PADDLE_MOVE_SPEED, getPixelChange } from './Speed.js';

export const getNextPaddle = (
  paddle,
  upPressed,
  downPressed,
  timeDifference,
) => {
  const pixelChange = getPixelChange(PADDLE_MOVE_SPEED, timeDifference);
  const getRawYPos = () => {
    if (upPressed) {
      return downPressed ? paddle.y : paddle.y - pixelChange;
    } else if (downPressed) {
      return paddle.y + pixelChange;
    } else {
      return paddle.y;
    }
  };
  const rawYPosition = getRawYPos();

  const getYPosition = () => {
    if (rawYPosition < 0) {
      return 0;
    } else if (rawYPosition + paddle.height > HEIGHT) {
      return HEIGHT - paddle.height;
    } else {
      return rawYPosition;
    }
  };

  return { ...paddle, y: getYPosition() };
};
