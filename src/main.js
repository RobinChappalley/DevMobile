import Circle from "./class/Circle";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const circles = [];

ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const minPosX = 0;
const maxPosX = ctx.canvas.width;
const minPosY = 0;
const maxPosY = ctx.canvas.height;
const minRadius = 1;
const maxRadius = 7;
const mediumRadius = 20;
const minVelocity = 0.05;
const maxVelocity = 0.2;
const circleCount = 300;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const circle = new Circle({
  position: {
    x: randomBetween(minPosX, maxPosX),
    y: randomBetween(minPosY, maxPosY),
  },
  radius: randomBetween(minRadius, maxRadius),
});

let lastTime = 0;

for (let i = 0; i < circleCount; i++) {
  circles.push(
    new Circle({
      position: {
        x: randomBetween(minPosX, maxPosX),
        y: randomBetween(minPosY, maxPosY),
      },
      radius: Math.pow(randomBetween(minRadius, maxRadius), 2),
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      velocity: {
        x: randomBetween(minVelocity, maxVelocity),
        y: randomBetween(minVelocity, maxVelocity),
      },
    })
  );
}

function tick(time) {
  const dt = time - lastTime;
  lastTime = time;
  requestAnimationFrame(tick);
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  circles.forEach((c) => c.draw(ctx));
}

requestAnimationFrame(tick);

//Dans votre programme principal, créez un tableau pour le stockage des cercles. -> fait
//  Générez ~300 cercles de positions et de couleurs pseudo-aléatoires. -> fait
// Pour que vos couleurs ne soient pas trop ternes, vous pouvez utiliser HSL. -> fait
// Pour les rayons, essayez de trouver une astuce pour que votre code génère plus de petits cercles que de grands cercles.
//  Afin de tester tout cela, dessinez tous les cercles dans le canvas grâce à la méthode draw codée au point précédent.
