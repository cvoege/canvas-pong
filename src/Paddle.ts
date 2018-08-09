import { Color } from './Color';
import { HEIGHT } from './Size';
import { getPixelChange, PADDLE_MOVE_SPEED } from './Speed';
import { Vector, zeroVector } from './Vector';

export interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  vector: Vector;
  color: Color;
}

export const getNextPaddle = (
  paddle: Paddle,
  upPressed: boolean,
  downPressed: boolean,
  timeDifference: number,
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

  const getVector = () => {
    if (upPressed && !downPressed) {
      return {
        vx: 0,
        vy: -PADDLE_MOVE_SPEED,
      };
    } else if (!upPressed && downPressed) {
      return {
        vx: 0,
        vy: PADDLE_MOVE_SPEED,
      };
    } else {
      return zeroVector();
    }
  };

  return { ...paddle, y: getYPosition(), vector: getVector() };
};
