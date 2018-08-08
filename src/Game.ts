import {
  DOWN_KEYCODE,
  Inputs,
  S_KEYCODE,
  SPACE_KEYCODE,
  UP_KEYCODE,
  W_KEYCODE,
} from './getInputs';
import initialState, { BallShadow, State } from './initialState';

import { BLACK, setAlpha, WHITE } from './Color';
import { getNextPaddle } from './Paddle';
import { HEIGHT, WIDTH } from './Size';
import { REFRESH_RATE } from './Speed';

import { Ball, getNextBall } from './Ball';
import { circle, rectangle, startGame, text } from './Graphics';

const getBallShadow = (
  ballShadow: BallShadow,
  ball: Ball,
  currentTime: number,
) => {
  if (ballShadow.length < 5) {
    return [...ballShadow, { ball, time: currentTime }];
  } else if (ballShadow[4].time < currentTime - 30) {
    return [...ballShadow.slice(1), { ball, time: currentTime }];
  } else {
    return ballShadow;
  }
};

const tick = ({
  state,
  inputs,
  timeDifference,
  currentTime,
}: {
  state: State;
  inputs: Inputs;
  timeDifference: number;
  currentTime: number;
}) => {
  const { keysDown } = inputs;

  const paddle1 = getNextPaddle(
    state.paddle1,
    keysDown.has(W_KEYCODE),
    keysDown.has(S_KEYCODE),
    timeDifference,
  );

  const paddle2 = getNextPaddle(
    state.paddle2,
    keysDown.has(UP_KEYCODE),
    keysDown.has(DOWN_KEYCODE),
    timeDifference,
  );

  const [ball, scores] = getNextBall(
    state.ball,
    timeDifference,
    keysDown.has(SPACE_KEYCODE),
    paddle1,
    paddle2,
    state.scores,
  );

  const ballShadow = getBallShadow(state.ballShadow, state.ball, currentTime);

  return {
    ...state,
    ball,
    ballShadow,
    paddle1,
    paddle2,
    scores,
  };
};

const mapStateToGraphics = (state: State) => {
  return [
    rectangle(state.paddle1),
    rectangle(state.paddle2),
    circle(state.ball),
    text(state.scores.paddle1),
    text(state.scores.paddle2),
    ...state.ballShadow.map((obj, i) => {
      const ball = { ...obj.ball, color: setAlpha(obj.ball.color, i * 10) };
      return circle(ball);
    }),
  ];
};

export function start() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  startGame({
    canvas,
    initialState,
    mapStateToGraphics,
    refreshRate: REFRESH_RATE,
    tick,
  });
}

// TODO: add eslint
// TODO: adversarial neural network bewteen left and right side
// TODO: add spin
