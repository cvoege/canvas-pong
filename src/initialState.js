import {
  HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  WIDTH,
  BALL_SIZE,
  PADDLE_DISTANCE_FROM_WALL,
} from './Size.js';

import { WHITE } from './Color.js';

export default {
  paddle1: {
    id: 'paddle1',
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    x: PADDLE_DISTANCE_FROM_WALL,
    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    angle: 0,
    speed: 0,
    color: WHITE,
  },
  paddle2: {
    id: 'paddle2',
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    x: WIDTH - PADDLE_DISTANCE_FROM_WALL * 2,
    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    angle: 0,
    speed: 0,
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
    x: WIDTH / 2 - BALL_SIZE / 2,
    y: HEIGHT / 2 - BALL_SIZE / 2,
    angle: 0,
    speed: 0,
    width: BALL_SIZE,
    height: BALL_SIZE,
    color: WHITE,
  },
};

// export default {
//   getState() {
//     return state;
//   },
//   updateState(overrides) {
//     state = overrides;
//     return state;
//   },
// };
