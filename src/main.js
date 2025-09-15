import Circle from "./class/Circle";

const circle = new Circle({
  position: {x: 0, y: 0},
  radius: 300,
  color: 'tomato',
  velocity: {x: 0.1, y: 1}
});

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

let lastTime = 0;

function tick(time) {
  const dt = (time - lastTime);
  lastTime = time;
  requestAnimationFrame(tick);
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  circle.update(dt);
  circle.draw(ctx);
}

requestAnimationFrame(tick)
