import { rawMove } from './Move';
import { bottom, left, right } from './Rectangle';
import { HEIGHT, WIDTH } from './Size';

import { Color } from './Color';
import { GameState } from './GameState';
import { Paddle } from './Paddle';
import { Scores } from './Score';

import {
  addVectors,
  getVectorFromDirectionVector,
  mulityVectorByScalar,
  reflectOnXAxis,
  reflectOnYAxis,
  Vector,
  zeroVector,
} from './Vector';

export interface Ball {
  vector: Vector;
  x: number;
  y: number;
  width: number;
  height: number;
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
  gameState: GameState,
  // Computes where the ball *wants* to be, if it isn't interrupted by a collision.
): [Ball, Scores, GameState] => {
  const rawBall: Ball = { ...ball, ...rawMove(ball, timeDifference) };
  const collidesWithPaddle1 = checkCollision(ball, paddle1);
  const collidesWithPaddle2 = checkCollision(ball, paddle2);
  const offScreenRight = right(rawBall) > WIDTH;
  const offScreenLeft = rawBall.x < 0;
  const offScreenDown = bottom(rawBall) > WIDTH;
  const offScreenUp = rawBall.y < 0;

  const getVector = () => {
    if (gameState === 'pre_game') {
      if (spacePressed) {
        const baseAngle = Math.random() * (Math.PI / 4) - Math.PI / 8;
        const baseVector = getVectorFromDirectionVector({
          angle: baseAngle,
          magnitude: 0.35,
        });
        return Math.random() >= 0.5 ? baseVector : reflectOnYAxis(baseVector);
      } else {
        return zeroVector();
      }
    } else if (offScreenUp || offScreenDown) {
      return reflectOnXAxis(rawBall.vector);
    } else if (collidesWithPaddle1) {
      return combineBallAndPaddleVector(rawBall, paddle1);
    } else if (collidesWithPaddle2) {
      return combineBallAndPaddleVector(rawBall, paddle2);
    } else if (offScreenRight || offScreenLeft) {
      return zeroVector();
    } else {
      return rawBall.vector;
    }
  };

  const getGameState = () => {
    if (gameState === 'pre_game' && spacePressed) {
      return 'playing';
    } else if (offScreenLeft || offScreenRight) {
      return 'pre_game';
    } else {
      return gameState;
    }
  };

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
      return left(paddle2) - rawBall.width - 1;
      // return paddle2.x - (right(rawBall) - paddle2.x) - (rawBall.width);
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
    getGameState(),
  ];
};
