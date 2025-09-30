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

  compareTo(other) {
    return this.radius - other.radius;
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
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    this.teleport(ctx);
  }
  setAngle(angle) {
    const speed = Math.hypot(this.velocity.x, this.velocity.y);
    this.velocity.x = speed * Math.cos(angle);
    this.velocity.y = speed * Math.sin(angle);
  }

  move(dt) {
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
  }

  teleport(ctx) {
    if (this.position.x - this.radius > ctx.canvas.width) {
      this.position.x = -this.radius;
    } else if (this.position.x + this.radius < 0) {
      this.position.x = ctx.canvas.width + this.radius;
    }
    if (this.position.y - this.radius > ctx.canvas.height) {
      this.position.y = -this.radius;
    } else if (this.position.y + this.radius < 0) {
      this.position.y = ctx.canvas.height + this.radius;
    }
  }
}
