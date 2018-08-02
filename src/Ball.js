import { WIDTH, HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT } from './Size.js';
import { reflectOnYAxis, reflectOnXAxis } from './Reflect.js';
import { getPixelChange } from './Speed.js';

export const getNextBall = (ball, timeDifference) => {
  const pixelChange = getPixelChange(ball.speed, timeDifference);
  const rawYPosition = pixelChange * Math.sin(ball.angle) + ball.yPos;
  const rawXPosition = pixelChange * Math.cos(ball.angle) + ball.xPos;

  const getAngle = () => {
    if (rawYPosition + ball.size > HEIGHT || rawYPosition < 0) {
      return reflectOnYAxis(ball.angle);
    } else if (rawXPosition + ball.size > WIDTH || rawXPosition < 0) {
      return reflectOnXAxis(ball.angle);
    } else {
      return ball.angle;
    }
  };

  const getYPos = () => {
    if (rawYPosition + ball.size > HEIGHT) {
      return HEIGHT - (rawYPosition + ball.size - HEIGHT);
    } else if (rawYPosition < 0) {
      return Math.abs(rawYPosition);
    } else {
      return rawYPosition;
    }
  };

  const getXPos = () => {
    if (rawXPosition + ball.size > WIDTH) {
      return WIDTH - (rawXPosition + ball.size - WIDTH);
    } else if (rawXPosition < 0) {
      return Math.abs(rawXPosition);
    } else {
      return rawXPosition;
    }
  };

  return {
    ...ball,
    xPos: getXPos(),
    yPos: getYPos(),
    speed: ball.speed,
    angle: getAngle(),
  };
};
