import getInputs from './getInputs.js';

const clearFrame = (context) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
};

export const rectangle = (object) => (context) => {
  context.fillStyle = object.color;
  context.fillRect(object.x, object.y, object.width, object.height);
};

export const text = (object) => (context) => {
  context.fillStyle = object.color;
  context.font = object.font;
  context.fillText(`${object.value}`, object.x, object.y);
};

export const circle = (object) => (context) => {
  context.fillStyle = object.color;
  context.arc(object.x, object.y, object.radius, 0, Math.PI * 2, false);
  context.fill();
};

export const startGame = ({
  canvas,
  refreshRate,
  initialState,
  tick,
  mapStateToGraphics,
  alpha = false,
}) => {
  const context = canvas.getContext('2d', { alpha });

  const redraw = (previousState, previousTime) => {
    // Get current time
    const currentTime = Date.now();

    // Process new state
    const state = tick(previousState, getInputs(), currentTime - previousTime);
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
