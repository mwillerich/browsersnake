// Initialize the canvas and context
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Define the size of the game grid and the size of each square
var gridSize = 20;
var squareSize = 20;

// Define the initial position and length of the snake
var snake = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
];
var direction = "right";

// Define the position of the food
var food = { x: 10, y: 10 };

// Define the function to draw a square
function drawSquare(x, y) {
  context.fillRect(
    x * squareSize,
    y * squareSize,
    squareSize,
    squareSize
  );
}

// Define the function to draw the snake
function drawSnake() {
  context.fillStyle = "green";
  snake.forEach(function (segment) {
    drawSquare(segment.x, segment.y);
  });
}

// Define the function to move the snake
function moveSnake() {
  // Determine the new head position based on the current direction
  var head = snake[0];
  var newHead;
  switch (direction) {
    case "up":
      newHead = { x: head.x, y: head.y - 1 };
      break;
    case "down":
      newHead = { x: head.x, y: head.y + 1 };
      break;
    case "left":
      newHead = { x: head.x - 1, y: head.y };
      break;
    case "right":
      newHead = { x: head.x + 1, y: head.y };
      break;
  }

  // Check if the snake collided with the wall or with its own body
  if (
    newHead.x < 0 ||
    newHead.x >= gridSize ||
    newHead.y < 0 ||
    newHead.y >= gridSize ||
    snake.some(function (segment) {
      return segment.x === newHead.x && segment.y === newHead.y;
    })
  ) {
    clearInterval(gameLoop);
    alert("Game Over!");
    return;
  }

  // Add the new head to the snake
  snake.unshift(newHead);

  // Check if the snake ate the food
  if (newHead.x === food.x && newHead.y === food.y) {
    // Generate a new food position
    food.x = Math.floor(Math.random() * gridSize);
    food.y = Math.floor(Math.random() * gridSize);
  } else {
    // Remove the tail of the snake
    snake.pop();
  }
}

// Define the function to draw the food
function drawFood() {
  context.fillStyle = "red";
  drawSquare(food.x, food.y);
}

// Define the game loop
var gameLoop = setInterval(function () {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Move the snake
  moveSnake();

  // Draw the snake and food
  drawSnake();
  drawFood();
}, 100);

// Handle arrow key presses to change the direction of the snake
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
      }
      break;
  }
});