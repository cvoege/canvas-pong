import {
  HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  WIDTH,
  BALL_SIZE,
  PADDLE_DISTANCE_FROM_WALL,
} from './Size.js';

export default {
  paddle1: {
    id: 'paddle1',
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    x: PADDLE_DISTANCE_FROM_WALL,
    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    angle: 0,
    speed: 0,
  },
  paddle2: {
    id: 'paddle2',
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    x: WIDTH - PADDLE_DISTANCE_FROM_WALL * 2,
    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    angle: 0,
    speed: 0,
  },
  scores: {
    paddle1: 0,
    paddle2: 0,
  },
  ball: {
    x: WIDTH / 2 - BALL_SIZE / 2,
    y: HEIGHT / 2 - BALL_SIZE / 2,
    angle: 0,
    speed: 0,
    width: BALL_SIZE,
    height: BALL_SIZE,
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
