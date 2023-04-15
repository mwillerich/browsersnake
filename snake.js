// Define the Snake object
var Snake = {
  gridSize: 20,
  squareSize: 20,
  direction: "right",
  snake: [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ],
  food: { x: 10, y: 10 },

  drawSquare: function(x, y) {
    context.fillRect(
      x * this.squareSize,
      y * this.squareSize,
      this.squareSize,
      this.squareSize
    );
  },

  drawSnake: function() {
    context.fillStyle = "green";
    this.snake.forEach(function(segment) {
      Snake.drawSquare(segment.x, segment.y);
    });
  },

  moveSnake: function() {
    var head = this.snake[0];
    var newHead;
    switch (this.direction) {
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

    // Check for collision
    if (this.checkCollision(newHead)) {
      clearInterval(this.gameLoop);
      alert("Game Over!");
      return;
    }

    this.snake.unshift(newHead);

    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.generateNewFoodPosition();
    } else {
      this.snake.pop();
    }
  },

  checkCollision: function(newHead) {
    // Check if the new head is outside the game grid
    if (
      newHead.x < 0 ||
      newHead.x >= this.gridSize ||
      newHead.y < 0 ||
      newHead.y >= this.gridSize
    ) {
      return true;
    }
  
    // Check if the new head collided with the snake's body
    return this.snake.some(function(segment) {
      return segment.x === newHead.x && segment.y === newHead.y;
    });
  },

  drawFood: function() {
    context.fillStyle = "red";
    this.drawSquare(this.food.x, this.food.y);
  },

  generateNewFoodPosition: function() {
    this.food.x = Math.floor(Math.random() * this.gridSize);
    this.food.y = Math.floor(Math.random() * this.gridSize);
  },

  init: function() {
    var self = this;
    this.gameLoop = setInterval(function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      self.moveSnake();
      self.drawSnake();
      self.drawFood();
    }, 100);

    document.addEventListener("keydown", function(event) {
      switch (event.key) {
        case "ArrowUp":
          if (self.direction !== "down") {
            self.direction = "up";
          }
          break;
        case "ArrowDown":
          if (self.direction !== "up") {
            self.direction = "down";
          }
          break;
        case "ArrowLeft":
          if (self.direction !== "right") {
            self.direction = "left";
          }
          break;
        case "ArrowRight":
          if (self.direction !== "left") {
            self.direction = "right";
          }
          break;
      }
    });
  },
};

// Initialize the canvas and context
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Initialize the game
Snake.init();
