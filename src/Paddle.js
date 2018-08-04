import { HEIGHT } from './Size.js';
import { PADDLE_MOVE_SPEED, getPixelChange } from './Speed.js';
import { zeroVector } from './Vector.js';

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

  const getSpeed = () => {
    if ((upPressed && !downPressed) || (!upPressed && downPressed)) {
      return PADDLE_MOVE_SPEED;
    } else {
      return 0;
    }
  };

  const getVector = () => {
    if (upPressed && !downPressed) {
      return {
        vy: -PADDLE_MOVE_SPEED,
        vx: 0,
      };
    } else if (!upPressed && downPressed) {
      return {
        vy: PADDLE_MOVE_SPEED,
        vx: 0,
      };
    } else {
      return zeroVector();
    }
  };

  return { ...paddle, y: getYPosition(), vector: getVector() };
};
