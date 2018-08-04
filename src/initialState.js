import {
  HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  WIDTH,
  PADDLE_DISTANCE_FROM_WALL,
  BALL_RADIUS,
} from './Size.js';

import { WHITE } from './Color.js';

import { zeroVector } from './Vector.js';

export default {
  paddle1: {
    id: 'paddle1',
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    x: PADDLE_DISTANCE_FROM_WALL,
    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    vector: zeroVector(),
    color: WHITE,
  },
  paddle2: {
    id: 'paddle2',
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
};
