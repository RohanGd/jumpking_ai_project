"use strict";

var lines = [];
var idleImage = null;
var squatImage = null;
var jumpImage = null;
var oofImage = null;
var run1Image = null;
var run2Image = null;
var run3Image = null;
var fallenImage = null;
var fallImage = null;
var showingLines = false;
var showingCoins = false;
var levelImages = [];
var noOfMoves = 5;
var creatingLines = false;

function preload() {
  backgroundImage = loadImage('images/levelImages/1.png');
  idleImage = loadImage('images/poses/idle.png');
  squatImage = loadImage('images/poses/squat.png');
  jumpImage = loadImage('images/poses/jump.png');
  oofImage = loadImage('images/poses/oof.png');
  run1Image = loadImage('images/poses/run1.png');
  run2Image = loadImage('images/poses/run2.png');
  run3Image = loadImage('images/poses/run3.png');
  fallenImage = loadImage('images/poses/fallen.png');
  fallImage = loadImage('images/poses/fall.png');
  snowImage = loadImage('images/snow3.png');

  for (var i = 1; i <= 43; i++) {
    levelImages.push(loadImage('images/levelImages/' + i + '.png'));
  }

  jumpSound = loadSound('sounds/jump.mp3');
  fallSound = loadSound('sounds/fall.mp3');
  bumpSound = loadSound('sounds/bump.mp3');
  landSound = loadSound('sounds/land.mp3');
}

function setUpCanvas() {
  canvas = createCanvas(1200, 950);
  canvas.parent('canvas');
  width = canvas.width;
  height = canvas.height - 50;
}

function setup() {
  setUpCanvas();
  player = new Player();
  currentPopulation = new Population(50);
  setupLevels();
}

function draw() {
  background(10);
  image(levels[player.currentLevel].levelImage, 0, 0);
  levels[player.currentLevel].show(); // if (!creatingLines) player.update()

  if (creatingLines) {
    drawMousePosition();
    levels[player.currentLevel].showLevLines(); // if we need to check lines
  } else {
    player.update();
  }

  currentPopulation.Update();
  currentPopulation.Show(); // showLines()
}

var mousePos1 = null;
var mousePos2 = null;
var linesString = '\ntempLevel = new Level()';

function mouseClicked() {
  if (creatingLines) {
    var snappedX = mouseX - mouseX % 20;
    var snappedY = mouseY - mouseY % 20;

    if (mousePos1 == null) {
      mousePos1 = createVector(snappedX, snappedY);
    } else {
      mousePos2 = createVector(snappedX, snappedY);
      lines.push(new Line(mousePos1.x, mousePos1.y, mousePos2.x, mousePos2.y));
      linesString += '\ntempLevel.lines.push(new Line(' + mousePos1.x + ',' + mousePos1.y + ',' + mousePos2.x + ',' + mousePos2.y + '));';
      mousePos1 = null;
      mousePos2 = null;
    }
  }
}

function drawMousePosition() {
  var snappedX = mouseX - mouseX % 20;
  var snappedY = mouseY - mouseY % 20;
  push();
  fill(255, 0, 0);
  noStroke();
  ellipse(snappedX, snappedY, 5);

  if (mousePos1 != null) {
    stroke(255, 0, 0);
    strokeWeight(5);
    line(mousePos1.x, mousePos1.y, snappedX, snappedY);
  }

  pop();
}

function showLines() {
  if (creatingLines) {
    for (var _i = 0, _lines = lines; _i < _lines.length; _i++) {
      var l = _lines[_i];
      l.show();
    }
  }
}

function keyPressed() {
  switch (key) {
    case ' ':
      player.jumpHeld = true;
      break;

    default:
      break;
  }

  switch (keyCode) {
    case LEFT_ARROW:
      player.leftHeld = true;
      break;

    case RIGHT_ARROW:
      player.rightHeld = true;
      break;

    default:
      break;
  }
}

function keyReleased() {
  switch (key) {
    case ' ':
      player.jumpHeld = false;
      player.jump();
      player.isOnGround = false;
      break;

    case 'N':
      if (creatingLines) {
        player.currentLevel += 1;
        linesString += '\nlevels.push(tempLevel)';
        print(linesString);
        lines = [];
        linesString = '\ntempLevel = new Level()';
        mousePos1 = null;
        mousePos2 = null;
      } else {
        player.currentLevel += 5;
      }

    default:
      break;
  }

  switch (keyCode) {
    case LEFT_ARROW:
      player.leftHeld = false;
      break;

    case RIGHT_ARROW:
      player.rightHeld = false;
      break;

    default:
      break;
  }
}

window.addEventListener("keydown", function (e) {
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
  }
}, false);