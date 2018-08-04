import initialState from './initialState.js';
import {
  S_KEYCODE,
  W_KEYCODE,
  DOWN_KEYCODE,
  UP_KEYCODE,
  SPACE_KEYCODE,
} from './getInputs.js';

import { WIDTH, HEIGHT } from './Size.js';
import { BLACK, WHITE } from './Color.js';
import { getNextPaddle } from './Paddle.js';
import { REFRESH_RATE } from './Speed.js';

import { getNextBall } from './Ball.js';
import { rectangle, text, circle, startGame } from './Graphics.js';

const tick = (state, inputs, timeDifference) => {
  const { keys } = inputs;

  const paddle1 = getNextPaddle(
    state.paddle1,
    keys[W_KEYCODE],
    keys[S_KEYCODE],
    timeDifference,
  );

  const paddle2 = getNextPaddle(
    state.paddle2,
    keys[UP_KEYCODE],
    keys[DOWN_KEYCODE],
    timeDifference,
  );

  const [ball, scores] = getNextBall(
    state.ball,
    timeDifference,
    keys[SPACE_KEYCODE],
    paddle1,
    paddle2,
    state.scores,
  );

  return {
    ...state,
    paddle1,
    paddle2,
    ball,
    scores,
  };
};

const mapStateToGraphics = (state) => {
  return [
    rectangle(state.paddle1),
    rectangle(state.paddle2),
    circle(state.ball),
    text(state.scores.paddle1),
    text(state.scores.paddle2),
  ];
};

export function start() {
  const canvas = document.getElementById('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvas.style.backgroundColor = BLACK;

  startGame({
    canvas,
    refreshRate: REFRESH_RATE,
    initialState,
    tick,
    mapStateToGraphics,
  });
}

// TODO: Consider switching from speed/angle to vx/vy. Also, switch to storing speed/angle (or vx/vy, whichever we choose), in a "vector" object inside the object
// TODO: add spooky ghost trail on ball that represents how fast it's going
// TODO: add flow/typescript
// TODO: add eslint
// TODO: adversarial neural network bewteen left and right side
// TODO: add spin
