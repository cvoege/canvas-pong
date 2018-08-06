import initialState, { State, BallShadow } from './initialState';
import {
  S_KEYCODE,
  W_KEYCODE,
  DOWN_KEYCODE,
  UP_KEYCODE,
  SPACE_KEYCODE,
  Inputs,
} from './getInputs';

import { WIDTH, HEIGHT } from './Size';
import { BLACK, WHITE, setAlpha } from './Color';
import { getNextPaddle } from './Paddle';
import { REFRESH_RATE } from './Speed';

import { getNextBall, Ball } from './Ball';
import { rectangle, text, circle, startGame } from './Graphics';

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
    paddle1,
    paddle2,
    ball,
    scores,
    ballShadow,
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
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  startGame({
    canvas,
    refreshRate: REFRESH_RATE,
    initialState,
    tick,
    mapStateToGraphics,
  });
}

// TODO: change Rectangle.ts to have an actual Rectangle type and not just import Paddle and Ball
// TODO: clean up Move.ts types
// TODO: normalize coordinates into a coordinates object like we did with vectors
// TODO: normalize sizes into a sizes object like we did with vectors/coordiantes
// TODO: add eslint
// TODO: adversarial neural network bewteen left and right side
// TODO: add spin
