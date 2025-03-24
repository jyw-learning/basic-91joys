const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

let bird, pipes, frame, gameOver, gameStarted;

function init() {
  bird = {
    x: 80,
    y: 200,
    width: 30,
    height: 30,
    velocity: 0,
    gravity: 0.05,
    jump: -2,
  };
  pipes = [];
  frame = 0;
  gameOver = false;
  gameStarted = false;
}

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach((pipe) => {
    ctx.fillRect(pipe.x, 0, 60, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + 150, 60, canvas.height);
  });
}

function update() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (frame % 90 === 0) {
    let top = Math.random() * 300 + 50;
    pipes.push({ x: canvas.width, top: top });
  }

  pipes.forEach((pipe) => {
    pipe.x -= 2;
    if (
      bird.x < pipe.x + 60 &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.top + 150)
    ) {
      gameOver = true;
    }
  });

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    gameOver = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();
  drawPipes();
}

function loop() {
  if (!gameStarted) return;

  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "48px sans-serif";
    ctx.fillText("Game Over", 80, 300);
    restartButton.style.display = "block";
    return;
  }
  update();
  draw();
  frame++;
  requestAnimationFrame(loop);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && gameStarted && !gameOver) bird.velocity = bird.jump;
});

startButton.addEventListener("click", () => {
  init();
  gameStarted = true;
  startButton.style.display = "none";
  loop();
});

restartButton.addEventListener("click", () => {
  init();
  restartButton.style.display = "none";
  gameStarted = true;
  loop();
});

init();
