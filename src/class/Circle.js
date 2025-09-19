export default class Circle {
  constructor({ position, radius, color, velocity }) {
    this.radius = radius;
    this.position = position;
    this.color = color;
    this.velocity = velocity;
  }

  update(dt) {
    this.position.x += dt * this.velocity.x;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    console.log(this.color);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
