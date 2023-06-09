const Snake = {
  keyPressQueue: [],
  maxKeyPressQueue: 5,
  gridSize: 20,
  squareSize: 20,
  baseCycle: 110,
  maxScore: 6,
  collisionSound: null,
  eatSound: null,
  direction: 'right',
  snake: [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
  ],
  food: { x: 10, y: 10 },
  score: 0,
  level: 1,
  gameOver: ['', '', 'G', 'A', 'M', 'E', '', 'O', 'V', 'E', 'R', '!'],
  gameOverMinPosition: [
    { x: 3, y: 8 },
    { x: 4, y: 8 },
    { x: 5, y: 8 },
    { x: 6, y: 8 },
    { x: 7, y: 8 },
    { x: 8, y: 8 },
    { x: 9, y: 8 },
    { x: 10, y: 8 },
    { x: 11, y: 8 },
    { x: 12, y: 8 },
    { x: 13, y: 8 },
    { x: 14, y: 8 }
  ],

  resetGame: function () {
    this.direction = 'right';
    this.snake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 }
    ];
    this.food = { x: 10, y: 10 };
    this.score = 0;
    this.level = 1;
  },

  drawSquare: function (x, y) {
    context.fillRect(
      x * this.squareSize,
      y * this.squareSize,
      this.squareSize,
      this.squareSize
    );
  },

  drawSnake: function () {
    let rotate = 0;
    if (this.direction === 'right') {
      rotate = Math.PI / 2;
    } else if (this.direction === 'down') {
      rotate = Math.PI;
    } else if (this.direction === 'left') {
      rotate = -Math.PI / 2;
    }
    context.save();
    context.setTransform(1, 0, 0, 1, (this.snake[0].x * this.squareSize) + (this.squareSize / 2), (this.snake[0].y * this.squareSize + (this.squareSize / 2))); // sets scale and origin
    context.rotate(rotate);
    context.drawImage(snakeHeadImage, -this.squareSize / 2, -this.squareSize / 2, this.squareSize, this.squareSize);
    context.restore();

    context.fillStyle = 'green';
    for (let i = 1; i < this.snake.length; i++) {
      this.drawSquare(this.snake[i].x, this.snake[i].y);
    };
  },

  setDirection: function () {
    if (this.keyPressQueue.length > 0) {
      console.log(this.keyPressQueue.length);
      const validKeyPress = this.keyPressQueue.shift();
      switch (validKeyPress) {
        case 'ArrowUp':
          if (this.direction !== 'down') {
            this.direction = 'up';
          }
          break;
        case 'ArrowDown':
          if (this.direction !== 'up') {
            this.direction = 'down';
          }
          break;
        case 'ArrowLeft':
          if (this.direction !== 'right') {
            this.direction = 'left';
          }
          break;
        case 'ArrowRight':
          if (this.direction !== 'left') {
            this.direction = 'right';
          }
          break;
      }
    }
  },

  moveSnake: function () {
    const head = this.snake[0];
    let newHead;
    switch (this.direction) {
      case 'up':
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case 'down':
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case 'left':
        newHead = { x: head.x - 1, y: head.y };
        break;
      case 'right':
        newHead = { x: head.x + 1, y: head.y };
        break;
    }

    // Check for collision
    if (this.checkCollision(newHead)) {
      this.endLevel(false);
      return;
    }

    this.snake.unshift(newHead);

    // Dinnertime?
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score += 1;
      this.eatSound.play();
      this.generateNewFoodPosition();
    } else {
      this.snake.pop();
    }
  },

  checkCollision: function (newHead) {
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
    return this.snake.some(function (segment) {
      return segment.x === newHead.x && segment.y === newHead.y;
    });
  },

  drawFood: function () {
    context.fillStyle = 'red';
    this.drawSquare(this.food.x, this.food.y);
  },

  generateNewFoodPosition: function () {
    this.food.x = Math.floor(Math.random() * this.gridSize);
    this.food.y = Math.floor(Math.random() * this.gridSize);

    // check if the food has been generated on the snake's body
    for (let i = 0; i < this.snake.length; i++) {
      if (this.food.x === this.snake[i].x && this.food.y === this.snake[i].y) {
        console.log('avoiding food collision');
        this.generateNewFoodPosition();
        break;
      }
    }
  },

  keepScore: function () {
    this.scoreCounter.innerHTML = 'Score: ' + this.score;
    if (this.score === this.maxScore) {
      this.endLevel(true);
    }
  },

  startLevel: function () {
    const self = this;
    this.score = 0;
    this.levelCounter.innerHTML = 'Level: ' + this.level;
    this.gameLoop = setInterval(function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
      self.setDirection();
      self.moveSnake();
      self.drawSnake();
      self.drawFood();
      self.keepScore();
    }, this.baseCycle - ((this.level - 1) * 5));
  },

  endLevel: function (next) {
    clearInterval(this.gameLoop);
    if (next) {
      // this.levelCompleteSound.play();
      this.level++;
      this.startLevel();
    } else {
      this.collisionSound.play();
      const self = this;
      setTimeout(() => {
        self.gameoverSound.play();
      }, '750');
      this.gameOverSequence();
    }
  },

  drawLetter: function (x, y, letter, direction) {
    context.save(); // save current context state
    context.fillStyle = 'white';

    // Translate the context to the center of the square
    const centerX = (x * 20) + 10;
    const centerY = (y * 20) + 10;
    context.translate(centerX, centerY);

    // Rotate the context based on the direction
    if (direction === 'up') {
      context.rotate(0);
    } else if (direction === 'down') {
      context.rotate(Math.PI);
    } else if (direction === 'left') {
      context.rotate(Math.PI / 2);
    } else if (direction === 'right') {
      context.rotate((3 * Math.PI) / 2);
    }

    context.fillText(letter, -5, 5); // Draw the letter
    context.restore(); // restore context state
  },

  gameOverSequence: function () {
    let currentIndex = 0;
    const intervalTime = 400;
    let squares = this.snake;
    let splash = false;

    if (this.snake.length < this.gameOver.length) {
      for (let i = 2; i < this.gameOver.length; i++) {
        this.drawSquare(this.gameOverMinPosition[i].x, this.gameOverMinPosition[i].y);
      };
      squares = this.gameOverMinPosition;
      splash = true;
    }
    context.font = '20px PT Mono';
    context.fillStyle = 'white';
    context.textBaseline = 'center';

    const animateGameover = () => {
      if (currentIndex < this.gameOver.length) {
        const letter = this.gameOver[currentIndex];
        if (letter !== '') { // skipping spaces for animation rhythm
          const x = squares[currentIndex].x;
          const y = squares[currentIndex].y;
          if (splash) {
            this.drawLetter(x, y, letter, 'up');
          } else {
            this.drawLetter(x, y, letter, this.getLetterDirection(x, y, currentIndex, squares));
          }
        }
        currentIndex++;
        setTimeout(animateGameover, intervalTime); // call the function recursively after intervalTime
      }
    };

    animateGameover(); // start the animation
  },

  getLetterDirection: function (x, y, index, snake) {
    if (index === 0) {
      return this.direction;
    } else {
      // Determine the direction based on the difference between current and previous position
      const prevX = snake[index - 1].x;
      const prevY = snake[index - 1].y;
      if (x === prevX) {
        return y < prevY ? 'down' : 'up';
      } else {
        return x < prevX ? 'left' : 'right';
      }
    }
  },

  init: function () {
    const self = this;

    this.collisionSound = document.getElementById('collision-sound');
    this.collisionSound.addEventListener('canplaythrough', function () {
      console.log('collision canplaythrough');
    });

    this.eatSound = document.getElementById('eat-sound');
    this.eatSound.addEventListener('canplaythrough', function () {
      console.log('eat canplaythrough');
    });

    this.gameoverSound = document.getElementById('gameover-sound');
    this.gameoverSound.addEventListener('canplaythrough', function () {
      console.log('gameover canplaythrough');
    });

    this.scoreCounter = document.getElementById('score');
    this.levelCounter = document.getElementById('level');
    this.resetGame();
    this.startLevel();

    document.addEventListener('keydown', event => {
      const key = event.key;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key) && self.keyPressQueue.length < self.maxKeyPressQueue) {
        self.keyPressQueue.push(key);
      }
    });
  }
};

// Initialize the canvas and context
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const snakeHeadImage = new Image();
snakeHeadImage.src = 'img/snakehead.png';

const splashScreen = document.getElementById('splash-screen');
const startButton = document.getElementById('start-button');

// hide the canvas initially
canvas.style.display = 'none';

// add a click event listener to the start button
startButton.addEventListener('click', startGame);

function startGame () {
  // show the canvas and hide the splash screen
  canvas.style.display = 'block';
  splashScreen.style.display = 'none';

  // Initialize the game
  Snake.init();
}
