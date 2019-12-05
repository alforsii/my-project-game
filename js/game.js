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
    this.timeSpeed = 150;
    this.interID = undefined;
    this.restartBtn = undefined;
    this.exitBtn = undefined;
    this.scoreColor = undefined;
  }
  // -------------------------startTheGame()-------------------------
  startTheGame() {
    this.interID = setInterval(() => {
      this.clear();
      this.drawGround();
      this.food.getImg();
      this.snake.drawSnake();
      this.snake.move();
      this.scoreColors();
    }, this.timeSpeed);
  }
  // //------------------------- drawGround()-------------------------
  drawGround() {
    // //----1. One way to use image.---- // //
    // this.groundImg.src = './img/ground.png';
    // this.ctx.drawImage(this.groundImg, 0, 0, this.width, this.height);

    // //----2.Another way to draw ----- // //
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
    //-----------Display score and length------------
    this.ctx.fillStyle = this.scoreColor;
    this.ctx.font = '35px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 100, 50);
    this.ctx.fillText(`Length: ${this.snake.length}`, 400, 50);
  }
  // //-------------------------clear()----------------------------------- // //
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  // //-------------------------gameOver()---------------------------------// //
  gameOver() {
    this.clear();
    // //--------1.Display image-------------------------
    this.ctx.drawImage(this.gameOverImg, 0, 0, this.width, this.height);
    //draw score
    this.ctx.fillStyle = this.scoreColor;
    this.ctx.font = '35px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 230, 50);
    //create restart and exit buttons
    let canvasButtons = document.getElementById('canvas-buttons');
    this.restartBtn = document.createElement('button');
    this.exitBtn = document.createElement('button');
    canvasButtons.appendChild(this.restartBtn);
    canvasButtons.appendChild(this.exitBtn);
    this.restartBtn.setAttribute('id', 'restart-button');
    this.exitBtn.setAttribute('id', 'exit-button');
    this.restartBtn.innerHTML = 'Restart';
    this.exitBtn.innerHTML = 'Exit';
    // //--------2.Draw 'Game Over' text------------------
    // this.ctx.fillStyle = 'red';
    // this.ctx.textAlign = 'center';
    // this.ctx.font = '75px Arial';
    // this.ctx.fillText('Game Over', this.width / 2, this.height / 2);
  }
  //switch colors depending on player score.
  scoreColors() {
    switch (this.score) {
      case 0:
        this.scoreColor = '#f00'; //red
        break;
      case 1:
      case 2:
      case 3:
        this.scoreColor = '#ff0'; //yellow
        break;
      default:
        this.scoreColor = '#0ff'; //blue
        break;
    }
    if (this.score % 10 === 0 && this.score > 0) {
      this.scoreColor = '#00f';
      this.ctx.fillStyle = '#f00';
      this.ctx.font = '35px Arial';
      this.ctx.fillText(
        `Very good, you got ${this.score} scores`,
        this.width / 2 - 200,
        this.height / 2
      );
    }
  }
}
