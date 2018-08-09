import {
  BALL_RADIUS,
  HEIGHT,
  PADDLE_DISTANCE_FROM_WALL,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  WIDTH,
} from './Size';

import { WHITE } from './Color';

import { zeroVector } from './Vector';

import { Ball } from './Ball';
import { GameState } from './GameState';
import { Paddle } from './Paddle';
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
  gameState: GameState;
}

const initialState: State = {
  ball: {
    color: WHITE,
    height: BALL_RADIUS * 2,
    vector: zeroVector(),
    width: BALL_RADIUS * 2,
    x: WIDTH / 2 - BALL_RADIUS,
    y: HEIGHT / 2 - BALL_RADIUS,
  },
  ballShadow: [],
  paddle1: {
    color: WHITE,
    height: PADDLE_HEIGHT,
    vector: zeroVector(),
    width: PADDLE_WIDTH,
    x: PADDLE_DISTANCE_FROM_WALL,
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
  },
  paddle2: {
    color: WHITE,
    height: PADDLE_HEIGHT,
    vector: zeroVector(),
    width: PADDLE_WIDTH,
    x: WIDTH - PADDLE_DISTANCE_FROM_WALL * 2,
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
  },
  scores: {
    paddle1: {
      color: WHITE,
      font: '30px Comic Sans MS',
      value: 0,
      x: 80,
      y: 50,
    },
    paddle2: {
      color: WHITE,
      font: '30px Comic Sans MS',
      value: 0,
      x: WIDTH - 110,
      y: 50,
    },
  },
  gameState: 'pre_game',
};

export default initialState;
