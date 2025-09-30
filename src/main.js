import Circle from "./class/Circle";
import Keyboard from "./class/Keyboard";
import MainLoop from "mainloop.js";
console.log("Coucou l'inspecteur !");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const circles = [];
const keyboard = new Keyboard();
const TAU = Math.PI * 2;

ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const minPosX = 0;
const maxPosX = ctx.canvas.width;
const minPosY = 0;
const maxPosY = ctx.canvas.height;
const minRadius = 1;
const maxRadius = 7;
const mediumRadius = 20;
const maxVelocity = 0.1;
const circleCount = 800;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createCircles() {
  for (let i = 0; i < circleCount; i++) {
    const r = Math.pow(randomBetween(minRadius, maxRadius), 2);
    const speedFactor = r / mediumRadius;
    circles.push(
      new Circle({
        position: {
          x: randomBetween(minPosX, maxPosX),
          y: randomBetween(minPosY, maxPosY),
        },
        radius: r,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        velocity: {
          x: maxVelocity * speedFactor,
          y: maxVelocity * speedFactor,
        },
      })
    );
  }
  circles.sort((a, b) => a.compareTo(b));
}
function tickPhysics(dt) {
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  move(dt);
}

function tickRender() {
  circles.forEach((c) => c.draw(ctx));
}

function detectDirection() {
  switch (true) {
    case keyboard.isKeyDown("KeyW") && keyboard.isKeyDown("KeyD"): //monter droite
      return -TAU * (5 / 8);
    case keyboard.isKeyDown("KeyW") && keyboard.isKeyDown("KeyA"): //monter gauche
      return -TAU * (7 / 8);
    case keyboard.isKeyDown("KeyS") && keyboard.isKeyDown("KeyD"): //descendre droite
      return -TAU * (3 / 8);
    case keyboard.isKeyDown("KeyS") && keyboard.isKeyDown("KeyA"): //descendre gauche
      return -TAU * (1 / 8);
    case keyboard.isKeyDown("KeyW"): //monter
      return -TAU * (3 / 4);
    case keyboard.isKeyDown("KeyS"): //descendre
      return -TAU / 4;
    case keyboard.isKeyDown("KeyA"): //gauche
      return -TAU;
    case keyboard.isKeyDown("KeyD"): //droite
      return -TAU / 2;
    default:
      return false;
  }
}

function move(dt) {
  const direction = detectDirection();
  if (direction !== false) {
    circles.forEach((c) => {
      c.setAngle(direction);
      c.move(dt);
    });
  }
}

MainLoop.setUpdate(tickPhysics).setDraw(tickRender).start();

createCircles();
