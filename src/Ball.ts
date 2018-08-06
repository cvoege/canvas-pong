import { WIDTH, HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT } from './Size';
import { right, bottom, left } from './Rectangle';
import { rawMove } from './Move';

import { Paddle } from './Paddle';
import { Color } from './Color';
import { Scores } from './Score';

import {
  Vector,
  reflectOnXAxis,
  reflectOnYAxis,
  addVectors,
  mulityVectorByScalar,
  zeroVector,
  getVectorFromDirectionVector,
} from './Vector';

export interface Ball {
  vector: Vector;
  x: number;
  y: number;
  radius: number;
  color: Color;
}

// TODO: move this into a different file
function checkCollision(a: Ball | Paddle, b: Ball | Paddle) {
  return a.x < right(b) && right(a) > b.x && a.y < bottom(b) && bottom(a) > b.y;
}

function combineBallAndPaddleVector(ball: Ball, paddle: Paddle) {
  const reversedBallVector = reflectOnYAxis(ball.vector);
  // Lower the speed of the paddle when calculating combined speed
  // to account for friction, otherwise ball gets super fast super quick.
  const adjustedPaddleVector = mulityVectorByScalar(paddle.vector, 1 / 3);

  return addVectors(reversedBallVector, adjustedPaddleVector);
}

export const getNextBall = (
  ball: Ball,
  timeDifference: number,
  spacePressed: boolean,
  paddle1: Paddle,
  paddle2: Paddle,
  scores: Scores,
) => {
  // Computes where the ball *wants* to be, if it isn't interrupted by a collision.
  const rawBall = rawMove(ball, timeDifference);
  const collidesWithPaddle1 = checkCollision(ball, paddle1);
  const collidesWithPaddle2 = checkCollision(ball, paddle2);
  const offScreenRight = right(rawBall) > WIDTH;
  const offScreenLeft = rawBall.x < 0;
  const offScreenDown = bottom(rawBall) > WIDTH;
  const offScreenUp = rawBall.y < 0;

  const getVector = () => {
    if (offScreenUp || offScreenDown) {
      return reflectOnXAxis(rawBall.vector);
    } else if (collidesWithPaddle1) {
      return combineBallAndPaddleVector(rawBall, paddle1);
    } else if (collidesWithPaddle2) {
      return combineBallAndPaddleVector(rawBall, paddle2);
    } else if (offScreenRight || offScreenLeft) {
      return zeroVector();
    } else if (
      spacePressed &&
      rawBall.vector.vx === 0 &&
      rawBall.vector.vy === 0
    ) {
      const baseAngle = Math.random() * (Math.PI / 4) - Math.PI / 8;
      const baseVector = getVectorFromDirectionVector({
        angle: baseAngle,
        magnitude: 0.35,
      });
      return Math.random() >= 0.5 ? baseVector : reflectOnYAxis(baseVector);
    } else {
      return rawBall.vector;
    }
  };
  if (offScreenLeft || offScreenRight) {
    console.log(ball.vector, rawBall.vector, getVector());
  }

  const getYPos = () => {
    if (offScreenRight) {
      return HEIGHT / 2;
    } else if (offScreenLeft) {
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
      vector: getVector(),
      x: getXPos(),
      y: getYPos(),
    },
    getNextScores(),
  ];
};
