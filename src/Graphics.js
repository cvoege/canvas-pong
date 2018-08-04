const drawBackground = (context, backgroundColor) => {
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
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

// const drawPaddle = (context, paddle) => {
//   context.fillStyle = WHITE;
//   context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
// };

// const drawBall = (context, ball) => {
//   context.fillStyle = WHITE;
//   context.fillRect(ball.x, ball.y, ball.width, ball.height);
// };

// const drawScores = (context, scores) => {
//   context.font = '30px Comic Sans MS';
//   context.fillText(`${scores['paddle1'].value}`, 80, 50);
//   context.fillText(`${scores['paddle2'].value}`, WIDTH - 110, 50);
// };

export const getRender = ({ backgroundColor, context }) => (renderables) => {
  drawBackground(context, backgroundColor);
  renderables.forEach((renderable) => {
    renderable(context);
  });
};
