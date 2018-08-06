import {
  HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  WIDTH,
  PADDLE_DISTANCE_FROM_WALL,
  BALL_RADIUS,
} from './Size';

import { WHITE } from './Color';

import { zeroVector } from './Vector';

import { Paddle } from './Paddle';
import { Ball } from './Ball';
import { Scores } from './Score';

interface BallShadowSingle {
  ball: Ball;
  time: number;
}

export type BallShadow = BallShadowSingle[];

export interface State {
  paddle1: Paddle;
  paddle2: Paddle;
  ball: Ball;
  scores: Scores;
  ballShadow: BallShadow;
}

const initialState: State = {
  paddle1: {
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    x: PADDLE_DISTANCE_FROM_WALL,
    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    vector: zeroVector(),
    color: WHITE,
  },
  paddle2: {
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    x: WIDTH - PADDLE_DISTANCE_FROM_WALL * 2,
    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    vector: zeroVector(),
    color: WHITE,
  },
  scores: {
    paddle1: {
      value: 0,
      color: WHITE,
      font: '30px Comic Sans MS',
      x: 80,
      y: 50,
    },
    paddle2: {
      value: 0,
      color: WHITE,
      font: '30px Comic Sans MS',
      x: WIDTH - 110,
      y: 50,
    },
  },
  ball: {
    x: WIDTH / 2 - BALL_RADIUS,
    y: HEIGHT / 2 - BALL_RADIUS,
    vector: zeroVector(),
    radius: BALL_RADIUS,
    color: WHITE,
  },
  ballShadow: [],
};

export default initialState;
