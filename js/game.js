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
    this.snake = new Snake(this);
    this.food = new Food(this, this.pos.x, this.pos.y, this.box, this.box);
    this.groundImg = new Image();
    this.gameOverImg = new Image();
    this.gameOverImg.src = './img/game-over-2.png';
    this.score = 0;
    this.intervalID = undefined;
  }
  startTheGame() {
    // this.drawGround();
    // this.food.getImg();
    // this.snake.drawSnake();
    // this.snake.move();
    if (this.snake.state) {
      this.intervalID = setInterval(() => {
        console.log(
          'Output for: Game -> constructor -> this.state',
          this.snake.state
        );
        this.clear();
        this.drawGround();
        this.food.getImg();
        this.snake.drawSnake();
        this.snake.move();
      }, 150);
    }
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
    this.ctx.fillText(`Length: ${this.snake.length}`, 400, 50);
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  gameOver() {
    this.clear();
    // //1.Display image.
    this.ctx.drawImage(this.gameOverImg, 0, 0, this.width, this.height);
    document.getElementById('restart-button').classList.remove('display-none');
    // //2.Draw 'Game Over' text.
    // this.ctx.fillStyle = 'red';
    // this.ctx.textAlign = 'center';
    // this.ctx.font = '75px Arial';
    // this.ctx.fillText('Game Over', this.width / 2, this.height / 2);
  }
}

//1.Create main Game class
//2.Create properties for begin
//3.Create the methods: like start the Game, background and so on...
