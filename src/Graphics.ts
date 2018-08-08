import getInputs, { Inputs } from './getInputs';

import { Color, toColorString } from './Color';
import { State } from './initialState';

const clearFrame = (context: CanvasRenderingContext2D) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
};

type Renderable = (context: CanvasRenderingContext2D) => void;

interface Rectangleable {
  x: number;
  y: number;
  width: number;
  height: number;
  color: Color;
}

export const rectangle = (object: Rectangleable) => (
  context: CanvasRenderingContext2D,
) => {
  context.fillStyle = toColorString(object.color);
  context.fillRect(object.x, object.y, object.width, object.height);
};

interface Textable {
  font: string;
  value: string | number;
  color: Color;
  x: number;
  y: number;
}

export const text = (object: Textable) => (
  context: CanvasRenderingContext2D,
) => {
  context.fillStyle = toColorString(object.color);
  context.font = object.font;
  context.fillText(`${object.value}`, object.x, object.y);
};

interface Circleable {
  x: number;
  y: number;
  width: number;
  height: number;
  color: Color;
}

export const circle = (object: Circleable) => (
  context: CanvasRenderingContext2D,
) => {
  context.fillStyle = toColorString(object.color);
  // const circle = new Path2D();
  // circle.moveTo(object.)
  context.beginPath();
  context.arc(
    object.x + object.width / 2,
    object.y + object.height / 2,
    object.width / 2,
    0,
    Math.PI * 2,
    false,
  );
  context.fill();
};

interface TickArgs {
  state: State;
  inputs: Inputs;
  timeDifference: number;
  currentTime: number;
}

export const startGame = ({
  canvas,
  refreshRate,
  initialState,
  tick,
  mapStateToGraphics,
  alpha = true,
}: {
  canvas: HTMLCanvasElement;
  refreshRate: number;
  initialState: State;
  tick: (args: TickArgs) => State;
  mapStateToGraphics: (state: State) => Renderable[];
  alpha?: boolean;
}) => {
  const context = canvas.getContext('2d', { alpha });
  if (!context) {
    throw new Error('Could not get context from canvas element');
  }

  const redraw = (previousState: State, previousTime: number) => {
    // Get current time
    const currentTime = Date.now();

    // Process new state
    const state = tick({
      currentTime,
      inputs: getInputs(),
      state: previousState,
      timeDifference: currentTime - previousTime,
    });
    const renderables = mapStateToGraphics(state);

    // Draw to canvas
    clearFrame(context);
    renderables.forEach((renderable) => {
      renderable(context);
    });

    const renderTimeDifference = Date.now() - currentTime;

    setTimeout(
      () => redraw(state, currentTime),
      // Approximate how long we should wait to acheive 60fps based on how long it took to
      // render the last frame.
      // The app needs time between renders to process user input and such, so we guarantee
      // a minimum of 5ms between repaints to give the browser some time to breath.
      Math.max(refreshRate - renderTimeDifference, 5),
    );
  };

  redraw(initialState, Date.now());
};
