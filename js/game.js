class Game {
  constructor() {
    this.canvas = document.getElementById('my-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.box = 30;
    this.pos = {
      //this is random food position
      x: Math.floor(Math.random() * 17 + 1) * this.box,
      y: Math.floor(Math.random() * 15 + 3) * this.box,
    };
    this.playersPosition = {
      player1Pos: [
        {
          x: 9 * this.box,
          y: 10 * this.box,
          w: this.box,
          h: this.box,
        },
      ],
      player2Pos: [
        {
          x: 18 * this.box,
          y: 10 * this.box,
          w: this.box,
          h: this.box,
        },
      ],
    };
    this.player1 = new Snake(this, this.playersPosition.player1Pos);
    this.player2 = new Snake(this, this.playersPosition.player2Pos);
    this.food = new Food(this, this.pos.x, this.pos.y, this.box, this.box);
    this.gameOverImg = new Image();
    this.gameOverImg.src = './img/game-over-2.png';
    this.score = 0;
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
      this.player1.drawSnake();
      this.player2.drawSnake();
      this.player1.move();
      this.player2.move2();
      this.scoreColors();
    }, 120);
  }
  // //------------------------- drawGround()-------------------------
  drawGround() {
    // //----Draw background----- // //
    for (let x = 1; x < 29; x++) {
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
        //3) all boxes borders with stroke.
        this.ctx.strokeStyle = 'rgb(4, 160, 218)';
        this.ctx.strokeRect(x * this.box, y * this.box, this.box, this.box);
      }
    }
    //-----------Display score and length------------
    this.ctx.fillStyle = this.scoreColor;
    this.ctx.font = '35px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 100, 50);
    this.ctx.fillText(`Length: ${this.player1.length}`, 400, 50);
  }
  // //-------------------------clear()----------------------------------- // //
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  // //-------------------------gameOver()---------------------------------// //
  gameOver() {
    this.clear();
    // //--------Display game over image-------------------------
    this.ctx.drawImage(this.gameOverImg, 0, 0, this.width, this.height);
    //draw score and score color
    this.ctx.fillStyle = this.scoreColor;
    this.ctx.font = '35px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 230, 50);
    //create restart and exit buttons
    let canvasButtons = document.getElementById('canvasButtons');
    this.restartBtn = document.createElement('button');
    this.exitBtn = document.createElement('button');
    canvasButtons.appendChild(this.restartBtn);
    canvasButtons.appendChild(this.exitBtn);
    this.restartBtn.setAttribute('id', 'restart-button');
    this.exitBtn.setAttribute('id', 'exit-button');
    this.restartBtn.innerHTML = 'Restart';
    this.exitBtn.innerHTML = 'Exit';
  }
  //switch colors depending on player score.
  scoreColors() {
    if (this.score === 0) this.scoreColor = '#f00'; //red
    if (this.score > 0) this.scoreColor = '#fff'; //white
    if (this.score > 10) this.scoreColor = '#ff0'; //yellow
    if (this.score > 20) this.scoreColor = 'orange'; //
    if (this.score > 30) this.scoreColor = '#f00'; //red
    if (this.score > 40) this.scoreColor = '#green'; //green

    if (this.score % 10 === 0 && this.score > 0) {
      this.scoreColor = '#fff';
      this.ctx.fillStyle = this.scoreColor;
      this.ctx.font = '35px Arial';
      this.ctx.fillText(
        `Congrats, you earned ${this.score} points`,
        this.width / 2 - 220,
        this.height / 2
      );
    }
  }
}
