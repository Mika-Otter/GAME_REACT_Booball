const canvas = document.querySelector("#canvas1");
const ctxBall = canvas.getContext("2d");
const ctxBox = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//GLOBAL ===VARIABLES___________________________________________________________
let canShooted = true;
let angle = null;
let clicked = false;
let mousePos;
//Mouse pos
let mouse = {
  pos: {
    x: 0,
    y: 0,
  },
};

// GAME BOX >>>CLASS_______________________________________________________________
class GameBox {
  constructor() {
    this.height = canvas.height / 2;
    this.x = 0;
    this.y = this.height;
    this.color = "white"; //"transparent"
    this.width = canvas.width;
  }

  draw() {
    ctxBox.strokeStyle = this.color;
    ctxBox.lineWidth = 3;
    ctxBox.strokeRect(0, this.height, this.width, this.height);
  }
}

// BALL >>>CLASS_________________________________________________________________
class Ball {
  constructor(angle, x, y, dx, dy) {
    this.radius = 15;
    this.angle = angle;
    this.x = x;
    this.y = y - this.radius;
    this.dx = dx;
    this.dy = dy;
    this.color = "red";

    this.gravity = 0.04;
    this.friction = 0.0018;
    this.elasticity = 0.7;
  }

  rotatedAngle() {
    if (mousePos) {
      return (angle = Math.atan2(mousePos.y - this.y, mousePos.x - this.x));
    }
  }

  draw() {
    ctxBall.beginPath();
    ctxBall.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctxBall.fillStyle = this.color;
    ctxBall.fill();
    ctxBall.closePath();
    ctxBall.save();
    ball.rotatedAngle();
    ctxBall.restore();
  }

  move() {
    //apply gravity
    if (this.y + this.gravity < canvas.height * 2) {
      this.dy += this.gravity;
    }
    //Sort out friction
    this.dx = this.dx - this.dx * this.friction;

    this.x += this.dx;
    this.y += this.dy;
  }

  updateAngle() {}
  reset() {}
}

//GLOBAL ~~~ FUNCTION______________________________________________________________
//Hit the walls

function hitTheWalls(ball) {
  if (
    ball.x - ball.radius < 0 ||
    ball.x + ball.radius > canvas.width ||
    ball.y + ball.radius > canvas.height ||
    ball.y - ball.radius < canvas.height / 2
  ) {
    //Sort ou elasticity & then change direction
    ball.dy = ball.dy * ball.elasticity;
    if (ball.x - ball.radius < 0) {
      //Right
      ball.x = 0 + ball.radius;
      ball.dx *= -1;
    } else if (ball.x + ball.radius > canvas.width) {
      //Left
      ball.x = canvas.width - ball.radius;
      ball.dx *= -1;
    } else if (ball.y + ball.radius > canvas.height) {
      //Bottom
      ball.y = canvas.height - ball.radius;
      ball.dy *= -1;
    } else if (ball.y - ball.radius < canvas.height / 2) {
      //Top
      ball.y = canvas.height / 2 + ball.radius;
      ball.dy *= -1;
    }
  }
}

//Calculate the angle
function sortBallPos(x, y) {
  let originalAngle = angle;
  //Work out distance between rotation point & cannon nozzle
  let dx = x - ball.x;
  let dy = y - ball.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  let rotatedAngle = Math.atan2(dy, dx);
  //Work out new positions
  let newX = ball.x + distance * Math.cos(rotatedAngle + originalAngle);
  let newY = ball.y + distance * Math.sin(rotatedAngle + originalAngle);

  return {
    x: newX,
    y: newY,
  };
}

//Hit the wall

//Calculate the angle
function angleBall(ball) {}

//ANIMATE ~~~FUNCTION_________________________________________________
let isFirstClick = 0;
let ball;
let gameBox;
let ballCtn = [];

function init() {
  gameBox = new GameBox();
  ball = new Ball(
    angle,
    canvas.width / 2,
    canvas.height,
    Math.cos(angle) * 8,
    Math.sin(angle) * 8
  );
}
if (isFirstClick == 0) init();

function animate() {
  requestAnimationFrame(animate);
  ctxBall.clearRect(0, 0, canvas.width, canvas.height);
  //display the game box

  gameBox.draw();
  //display the ball
  if (isFirstClick == 0) {
    ball.draw();
  } else {
    ball.move();
    hitTheWalls(ball);
    ball.rotatedAngle();
    ball.draw();
    console.log(ball.angle);
  }
}

animate();
// GLOBAL °°°EVENT LISTENER___________________________________________
// Resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  animate();
});

//MouseMove
document.addEventListener("mousemove", (e) => {
  mousePos = {
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop,
  };
});

//On click
document.addEventListener("click", () => {
  isFirstClick++;
  // ballCtn = [];
  let ballPos = sortBallPos(ball.x, ball.y);
  console.log(ballPos.x);
  ball = new Ball(
    angle,
    ballPos.x,
    ballPos.y,
    Math.cos(angle) * 8,
    Math.sin(angle) * 8
  );
});
