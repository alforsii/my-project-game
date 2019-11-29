class Game {
  constructor() {
    this.canvas = document.getElementById('my-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.box = 30;
    this.pos = {
      x: Math.floor(Math.random() * 17 + 1) * this.box,
      y: Math.floor(Math.random() * 15 + 3) * this.box,
    };
    this.food = new Component(this, this.pos.x, this.pos.y, this.box, this.box);
    this.groundImg = new Image();
    this.gameOverImg = new Image();
    this.gameOverImg.src = './img/game-over-2.png';
    this.snake = new Snake(this);
    this.score = 0;
    this.intervalID = undefined;
  }
  startTheGame() {
    // this.drawGround();
    // this.food.getImg();
    // this.snake.drawSnake();
    // this.snake.move();
    this.intervalID = setInterval(() => {
      this.clear();
      this.drawGround();
      this.food.getImg();
      this.snake.drawSnake();
      this.snake.move();
    }, 150);
  }

  drawGround() {
    //1. One way to use image.
    // this.groundImg.src = './img/ground.png';
    // this.ctx.drawImage(this.groundImg, 0, 0, this.width, this.height);

    //2.Another way to draw background boxes instead.
    for (let x = 1; x < 19; x++) {
      for (let y = 2; y < 20; y++) {
        // // all blue boxes.
        //1) all Even lines on X and Y fill with blue
        if (x % 2 === 0 && y % 2 === 0) {
          this.ctx.fillStyle = 'rgb(4, 160, 218)';
          this.ctx.fillRect(x * this.box, y * this.box, this.box, this.box);
        }
        //2) all Odd lines on X and Y fill with blue
        if (x % 2 !== 0 && y % 2 !== 0) {
          this.ctx.fillStyle = 'rgb(4, 160, 218)';
          this.ctx.fillRect(x * this.box, y * this.box, this.box, this.box);
        }
        // this is empty boxes with stroke.
        this.ctx.strokeStyle = 'rgb(11, 186, 250)';
        this.ctx.strokeRect(x * this.box, y * this.box, this.box, this.box);
      }
    }
    //Display score
    this.ctx.fillStyle = 'white';
    this.ctx.font = '35px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 100, 50);
    this.ctx.fillText(`Life: ${this.snake.life}`, 400, 50);
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  gameOver() {
    this.clear();
    this.ctx.drawImage(this.gameOverImg, 0, 0, this.width, this.height);
    // this.ctx.fillStyle = 'red';
    // this.ctx.textAlign = 'center';
    // this.ctx.font = '75px Arial';
    // this.ctx.fillText('Game Over', this.width / 2, this.height / 2);
  }
}

//1.Create main Game class
//2.Create properties for begin
//3.Create the methods: like start the Game, background and so on...

//load image

// function getImg() {}

// load audio files

// let dead = new Audio();
// let eat = new Audio();
// let up = new Audio();
// let right = new Audio();
// let left = new Audio();
// let down = new Audio();

// dead.src = 'audio/dead.mp3';
// eat.src = 'sounds/coin.mp3';
// up.src = 'sounds/jump.wav';
// right.src = 'audio/right.mp3';
// left.src = 'audio/left.mp3';
// down.src = 'sounds/jump.wav';

// let snake = [];
// snake[0] = {
//   x: 9 * box,
//   y: 10 * box,
// };

// //create food
// let food = {
//   x: Math.floor(Math.random() * 17 + 1) * box,
//   y: Math.floor(Math.random() * 15 + 3) * box,
// };

// //create score
// let score = 0;

// //move the snake
// let dir;
// document.addEventListener('keydown', moveSnake);

// function moveSnake(event) {
//   const key = event.keyCode;
//   event.preventDefault();

//   if (key === 37 && dir !== 'RIGHT') {
//     right.play();
//     dir = 'LEFT';
//   } else if (key === 38 && dir !== 'DOWN') {
//     down.play();
//     dir = 'UP';
//   } else if (key === 39 && dir !== 'LEFT') {
//     left.play();
//     dir = 'RIGHT';
//   } else if (key === 40 && dir !== 'UP') {
//     up.play();
//     dir = 'DOWN';
//   }
// }

// // check collision function
// function collision(head, snakeArr) {
//   for (let i = 0; i < snakeArr.length; i++) {
//     if (head.x == snakeArr[i].x && head.y == snakeArr[i].y) {
//       return true;
//     }
//   }
//   return false;
// }

// //   draw to the canvas
// function draw() {
//   //draw background
//   ctx.drawImage(ground, 0, 0, width - 38, height - 38);

//   for (let i = 0; i < snake.length; i++) {
//     ctx.fillStyle = i == 0 ? 'green' : 'white';
//     ctx.fillRect(snake[i].x, snake[i].y, box, box);

//     ctx.strokeStyle = 'black';
//     ctx.strokeRect(snake[i].x, snake[i].y, box, box);
//   }
//   //draw food
//   ctx.drawImage(foodImg, food.x, food.y, 35, 35);

//   // starting position
//   let snakeX = snake[0].x;
//   let snakeY = snake[0].y;

//   //direction
//   if (dir === 'LEFT') snakeX -= box;
//   if (dir === 'UP') snakeY -= box;
//   if (dir === 'RIGHT') snakeX += box;
//   if (dir === 'DOWN') snakeY += box;

//   //if snake eats the food
//   if (snakeX == food.x && snakeY == food.y) {
//     score++;
//     eat.play();
//     food = {
//       x: Math.floor(Math.random() * 17 + 1) * box,
//       y: Math.floor(Math.random() * 15 + 3) * box,
//     };
//     //if eats food we don't remove the tail
//   } else {
//     //remove the tail
//     snake.pop();
//   }

//   //add newHead
//   let newHead = { x: snakeX, y: snakeY };
//   //game over
//   if (
//     snakeX < box ||
//     snakeX > 17 * box ||
//     snakeY < 3 * box ||
//     snakeY > 17 * box ||
//     collision(newHead, snake)
//   ) {
//     clearInterval(game);
//     dead.play();
//   }

//   snake.unshift(newHead);

//   ctx.fillStyle = 'white';
//   ctx.font = '40px monospace';
//   ctx.fillText('Score: ', 2 * box, 1.5 * box);
//   ctx.fillText(score, 8 * box, 1.6 * box);
// }

// function clear() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// }
// //   draw();
// let game = setInterval(() => {
//   clear(), draw();
// }, 100);
