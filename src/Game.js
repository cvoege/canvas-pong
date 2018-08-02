import initialState from './initialState.js';
import getInputs, {
  S_KEYCODE,
  W_KEYCODE,
  DOWN_KEYCODE,
  UP_KEYCODE,
} from './getInputs.js';

import { WIDTH, HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT } from './Size.js';
import { BLACK, WHITE } from './Color.js';
import { getNextPaddle } from './Paddle.js';
import { REFRESH_RATE } from './Speed.js';

import { getNextBall } from './Ball.js';

const drawBackground = (context) => {
  context.fillStyle = BLACK;
  context.fillRect(0, 0, WIDTH, HEIGHT);
};

const drawPaddle = (context, paddle) => {
  context.fillStyle = WHITE;
  context.fillRect(paddle.x, paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
};

const drawBall = (context, ball) => {
  context.fillStyle = WHITE;
  context.fillRect(ball.x, ball.y, ball.size, ball.size);
};

const tick = (state, inputs, timeDifference) => {
  const { keys } = inputs;

  return {
    ...state,
    paddle1: getNextPaddle(
      state.paddle1,
      keys[W_KEYCODE],
      keys[S_KEYCODE],
      timeDifference,
    ),
    paddle2: getNextPaddle(
      state.paddle2,
      keys[UP_KEYCODE],
      keys[DOWN_KEYCODE],
      timeDifference,
    ),
    ball: getNextBall(state.ball, timeDifference),
  };
};

let previousTime = Date.now();
let currentTime = Date.now();

const redraw = (context, state) => {
  drawBackground(context);
  drawPaddle(context, state.paddle1);
  drawPaddle(context, state.paddle2);
  drawBall(context, state.ball);

  setTimeout(() => {
    previousTime = currentTime;
    currentTime = Date.now();
    const nextState = tick(state, getInputs(), currentTime - previousTime);
    redraw(context, nextState);
  }, REFRESH_RATE);
};

export function start() {
  const canvas = document.getElementById('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext('2d');
  redraw(context, initialState);
}

// TODO: Add paddle hitting logic
// TODO: add scoring
// TODO: add start menu
// TODO: add countdown
// TODO: add pause
// TODO: consider making a system where the state is mapped to some sort of internal
// representation of a drawing, then the internal logic will convert that into a
// canvas drawing (maybe some sort of mapStateToDraw and some functions like square()
// that take in parameters and return the internal representation which the internal
// drawing tool then converts into an actual drawing on the screen)
// TODO: adversarial neural network bewteen left and right side
