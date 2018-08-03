import initialState from './initialState.js';
import getInputs, {
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

const drawBackground = (context) => {
  context.fillStyle = BLACK;
  context.fillRect(0, 0, WIDTH, HEIGHT);
};

const drawPaddle = (context, paddle) => {
  context.fillStyle = WHITE;
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
};

const drawBall = (context, ball) => {
  context.fillStyle = WHITE;
  context.fillRect(ball.x, ball.y, ball.width, ball.height);
  context.font = '30px Comic Sans MS';
};

const drawScores = (context, scores) => {
  context.font = '30px Comic Sans MS';
  context.fillText(`${scores['paddle1']}`, 80, 50);
  context.fillText(`${scores['paddle2']}`, WIDTH - 110, 50);
};

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

const redraw = (context, previousState, previousTime) => {
  const currentTime = Date.now();
  const state = tick(previousState, getInputs(), currentTime - previousTime);
  drawBackground(context);
  drawPaddle(context, state.paddle1);
  drawPaddle(context, state.paddle2);
  drawBall(context, state.ball);
  drawScores(context, state.scores);
  const renderTimeDifference = Date.now() - currentTime;

  setTimeout(
    () => {
      redraw(context, state, currentTime);
    },
    // Approximate how long we should wait to acheive 60fps based on how long it took to render that.
    // If render time becomes too long, and the timeout would be reduced to below 5,
    // the app will be very unresponsive, so demand at least 5 ms wait so inputs and
    // other event looped things can happen
    Math.max(REFRESH_RATE - renderTimeDifference, 5),
  );
};

export function start() {
  const canvas = document.getElementById('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext('2d');
  redraw(context, initialState, Date.now());
}

// TODO: add spin
// TODO: consider making a system where the state is mapped to some sort of internal
// representation of a drawing, then the internal logic will convert that into a
// canvas drawing (maybe some sort of mapStateToDraw and some functions like square()
// that take in parameters and return the internal representation which the internal
// drawing tool then converts into an actual drawing on the screen)
// TODO: adversarial neural network bewteen left and right side
