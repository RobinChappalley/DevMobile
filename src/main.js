import Circle from "./class/Circle";
import Keyboard from "./class/Keyboard";
import MainLoop from "mainloop.js";

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
const maxVelocity = 0.2;
const circleCount = 300;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

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

function tickPhysics(dt) {
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  move(dt);
}

function tickRender() {
  circles.forEach((c) => c.draw(ctx));
}

circles.sort((a, b) => a.compareTo(b));

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
      return -TAU / 2;
    case keyboard.isKeyDown("KeyD"): //droite
      return -TAU;
    default:
      return false;
  }
}

function move(dt) {
  const direction = detectDirection();
  if (direction !== false) {
    circles.forEach((c) => {
      //console.log(c.velocity.x, " ---", c.velocity.y);
      c.setAngle(direction);
      c.move(dt);
    });
  }
}

MainLoop.setUpdate(tickPhysics).setDraw(tickRender).start();

//Dans votre programme principal, créez un tableau pour le stockage des cercles. -> fait
//  Générez ~300 cercles de positions et de couleurs pseudo-aléatoires. -> fait
// Pour que vos couleurs ne soient pas trop ternes, vous pouvez utiliser HSL. -> fait
// Pour les rayons, essayez de trouver une astuce pour que votre code génère plus de petits cercles que de grands cercles. -> fait
//  Afin de tester tout cela, dessinez tous les cercles dans le canvas grâce à la méthode draw codée au point précédent. ->

//Deux choses simples vont nous permettre de créer l'illusion d'un effet de parallaxe.
// Premièrement, les cercles de grand rayon devraient être dans un plan plus proche de la "caméra" que ceux de petit rayon.
// Deuxièmement, plus un cercle est loin du premier plan, plus il devrait se déplacer lentement.
// Pour le premier point, il suffit de trier le tableau des cercles par ordre croissant de leur rayon.
// Pour le faire proprement, codez une nouvelle méthode dans la classe Circle permettant de comparer
// le rayon du cercle avec celui d'un autre.
// (Comme d'habitude, cette méthode doit retourner un nombre négatif si le cercle this est plus
// petit que celui avec lequel on le compare, 0 s'il est de taille identique et un nombre positif s'il est plus grand.)
// Utilisez ensuite cette méthode pour faire un tri (méthode sort) du tableau des cercles après leur génération aléatoire.
// Pour le deuxième point, il vous faut modifier votre code de génération aléatoire des cercles
//  pour que leur vitesse soit proportionnelle à leur rayon. Testez à nouveau votre animation et
//  observez l'effet parallaxe en action.
