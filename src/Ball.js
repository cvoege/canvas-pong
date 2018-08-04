import { WIDTH, HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT } from './Size.js';
import { reflectOnXAxis, reflectOnYAxis } from './Reflect.js';
import { right, bottom, left } from './Rectangle.js';
import { rawMove } from './Move.js';

import {
  getVectorX,
  getVectorY,
  getVectorMagnitude,
  getVectorAngle,
} from './Vector.js';

// TODO: move this into a different file
function checkCollision(a, b) {
  return a.x < right(b) && right(a) > b.x && a.y < bottom(b) && bottom(a) > b.y;
}

function combineBallAndPaddleVector(ball, paddle) {
  const reversedBallAngle = reflectOnYAxis(ball.angle);
  // Lower the speed of the paddle when calculating combined speed
  // to account for friction, otherwise ball gets super fast super quick.
  const adjustedPaddleSpeed = paddle.speed / 3;

  const vectorX =
    getVectorX(reversedBallAngle, ball.speed) +
    getVectorX(paddle.angle, adjustedPaddleSpeed);
  const vectorY =
    getVectorY(reversedBallAngle, ball.speed) +
    getVectorY(paddle.angle, adjustedPaddleSpeed);

  return [vectorX, vectorY];
}

function getSpeedFromCollision(ball, paddle) {
  const [vectorX, vectorY] = combineBallAndPaddleVector(ball, paddle);
  return getVectorMagnitude(vectorX, vectorY);
}

function getAngleFromCollision(ball, paddle) {
  const [vectorX, vectorY] = combineBallAndPaddleVector(ball, paddle);
  return getVectorAngle(vectorX, vectorY);
}

export const getNextBall = (
  ball,
  timeDifference,
  spacePressed,
  paddle1,
  paddle2,
  scores,
) => {
  // Computes where the ball *wants* to be, if it isn't interrupted by a collision.
  const rawBall = rawMove(ball, timeDifference);
  const collidesWithPaddle1 = checkCollision(ball, paddle1);
  const collidesWithPaddle2 = checkCollision(ball, paddle2);
  const offScreenRight = right(rawBall) > WIDTH;
  const offScreenLeft = rawBall.x < 0;

  const getAngle = () => {
    if (bottom(rawBall) > HEIGHT || rawBall.y < 0) {
      return reflectOnXAxis(rawBall.angle);
    } else if (collidesWithPaddle1) {
      return getAngleFromCollision(rawBall, paddle1);
    } else if (collidesWithPaddle2) {
      return getAngleFromCollision(rawBall, paddle2);
    } else if (spacePressed && rawBall.speed === 0) {
      const baseAngle = Math.random() * (Math.PI / 4) - Math.PI / 8;
      if (Math.random() >= 0.5) {
        return baseAngle;
      } else {
        return reflectOnYAxis(baseAngle);
      }
    } else {
      return rawBall.angle;
    }
  };

  const getSpeed = () => {
    if (offScreenRight) {
      return 0;
    } else if (offScreenLeft) {
      return 0;
    } else if (spacePressed && rawBall.speed === 0) {
      return 0.35;
    } else if (collidesWithPaddle1) {
      return getSpeedFromCollision(rawBall, paddle1);
    } else if (collidesWithPaddle2) {
      return getSpeedFromCollision(rawBall, paddle2);
    } else {
      return rawBall.speed;
    }
  };

  const getYPos = () => {
    if (offScreenRight) {
      // return WIDTH - (right(rawBall) - WIDTH);
      return HEIGHT / 2;
    } else if (offScreenLeft) {
      // return Math.abs(rawBall.x);
      return HEIGHT / 2;
    } else if (bottom(rawBall) > HEIGHT) {
      return HEIGHT - (bottom(rawBall) - HEIGHT);
    } else if (rawBall.y < 0) {
      return Math.abs(rawBall.y);
    } else {
      return rawBall.y;
    }
  };

  const getXPos = () => {
    if (offScreenRight) {
      // return WIDTH - (right(rawBall) - WIDTH);
      return WIDTH / 2;
    } else if (offScreenLeft) {
      // return Math.abs(rawBall.x);
      return WIDTH / 2;
    } else if (collidesWithPaddle1) {
      // return 2 * right(paddle1) - rawBall.x;
      return right(paddle1) + 1;
    } else if (collidesWithPaddle2) {
      return left(paddle2) - rawBall.radius * 2 - 1;
      // return paddle2.x - (right(rawBall) - paddle2.x) - (rawBall.radius * 2);
    } else {
      return rawBall.x;
    }
  };

  const getNextScores = () => {
    if (offScreenRight) {
      return {
        ...scores,
        paddle1: { ...scores.paddle1, value: scores.paddle1.value + 1 },
      };
    } else if (offScreenLeft) {
      return {
        ...scores,
        paddle2: { ...scores.paddle2, value: scores.paddle2.value + 1 },
      };
    } else {
      return scores;
    }
  };

  return [
    {
      ...rawBall,
      angle: getAngle(),
      speed: getSpeed(),
      x: getXPos(),
      y: getYPos(),
    },
    getNextScores(),
  ];
};
