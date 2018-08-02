import {
  HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  WIDTH,
  BALL_SIZE,
} from './Size.js';

export default {
  paddle1: {
    yPos: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    xPos: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
  },
  paddle2: {
    yPos: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    xPos: WIDTH - PADDLE_WIDTH * 2,
    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
  },
  ball: {
    xPos: WIDTH / 2 - BALL_SIZE / 2,
    yPos: HEIGHT / 2 - BALL_SIZE / 2,
    angle: Math.random() * 2 * Math.PI,
    speed: 0.25,
    size: BALL_SIZE,
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
