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
import {
  createRandomNetwork,
  getOutputs,
  mutateNetwork,
  NeuralNetwork,
} from './Network';

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

  const [ball, scores, gameState] = getNextBall(
    state.ball,
    timeDifference,
    keysDown.has(SPACE_KEYCODE),
    paddle1,
    paddle2,
    state.scores,
    state.gameState,
  );

  const ballShadow = getBallShadow(state.ballShadow, state.ball, currentTime);

  return {
    ...state,
    ball,
    ballShadow,
    paddle1,
    paddle2,
    scores,
    gameState,
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

// TODO move learning stuff to differnet file
// TODO: add spin

const mapStateToNetworkInput = ({ ball, paddle1, paddle2 }: State) => {
  const values = [
    ball.x,
    ball.y,
    ball.vector.vx,
    ball.vector.vy,
    paddle1.x,
    paddle1.y,
    paddle1.vector.vx,
    paddle1.vector.vy,
    paddle2.x,
    paddle2.y,
    paddle2.vector.vx,
    paddle2.vector.vy,
  ];

  return {
    neurons: values.map((value) => {
      return {
        activation: value,
      };
    }),
  };
};

const numInputs = mapStateToNetworkInput(initialState).neurons.length;

const mapNetworkOutputToInputs = ([downPressed, upPressed]: number[]) => {
  return {
    keysDown: <Set<number>>(
      new Set(
        [
          downPressed > 0.5 ? DOWN_KEYCODE : null,
          upPressed > 0.5 ? UP_KEYCODE : null,
        ].filter((x) => x === null),
      )
    ),
  };
};

const networksPerGeneration = 1000;
// Run a maximum of 10000 frames (166s)
const maxFramesPerNetwork = 10000;

const runNetwork = (network: NeuralNetwork) => {
  const startTime = Date.now();
  let currentState = tick({
    state: initialState,
    inputs: { keysDown: new Set([SPACE_KEYCODE]) },
    timeDifference: 0,
    currentTime: startTime,
  });

  for (let frameNumber = 0; frameNumber < maxFramesPerNetwork; frameNumber++) {
    const networkOutputs = getOutputs(
      mapStateToNetworkInput(currentState),
      network,
    );
    currentState = tick({
      state: currentState,
      inputs: mapNetworkOutputToInputs(networkOutputs),
      timeDifference: REFRESH_RATE,
      currentTime: startTime + frameNumber * REFRESH_RATE,
    });
    if (currentState.gameState !== 'playing') break;
  }

  if (currentState.gameState === 'playing') {
    // If the game goes on until the time limit and no one wins,
    // give a succcess score that's hirgher than losing but
    // much lower than winning
    return 0.1;
  } else {
    if (currentState.scores.paddle2.value === 1) {
      // TODO: change this so that paddles get more points for winning better (sum of all hits? faster = better?)
      return 1;
    } else if (currentState.scores.paddle1.value === 1) {
      // TODO change this so paddles get more points for losing better (sum of all hits? slower = holding off  longer = better?)
      return 0;
    } else {
      throw new Error(
        'For some reason the game is still going but no one scored.',
      );
    }
  }
};

function runGeneration(networks: NeuralNetwork[]) {
  return networks.map((network) => [network, runNetwork(network)]);
}

function evolve(numGenerations: number) {
  const initialNetworks = new Array(networksPerGeneration)
    .fill(0)
    .map(() => createRandomNetwork(numInputs, [10, 10], 2));

  console.log(runGeneration(initialNetworks));
  // TODO: write function to weed out the current generation, keep the best of the last
  // generation, and breed to create the next generation
}

evolve(1);
