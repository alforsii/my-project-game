class Game {
  constructor() {
    this.canvas = document.getElementById('my-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.box = 30;
    this.pos = {
      //this is random food position
      x: Math.floor(Math.random() * 27 + 1) * this.box,
      y: Math.floor(Math.random() * 15 + 3) * this.box,
    };
    this.playersPositions = {
      player1Pos: [
        {
          x: 19 * this.box,
          y: 10 * this.box,
          w: this.box,
          h: this.box,
        },
      ],
      player2Pos: [
        {
          x: 9 * this.box,
          y: 10 * this.box,
          w: this.box,
          h: this.box,
        },
      ],
    };
    this.player1Name = document.getElementById('player-1').value;
    this.player2Name = document.getElementById('player-2').value;
    this.player1 = new Player(this, this.playersPositions.player1Pos, 'red');
    this.player2 = new Player(this, this.playersPositions.player2Pos, 'blue');
    this.food = new Food(this, this.pos.x, this.pos.y, this.box, this.box);
    this.gameOverImg = new Image();
    this.gameOverImg.src = './img/game-over-2.png';
    this.interID = undefined;
    this.canvasButtons = undefined;
    this.restartBtn = undefined;
    this.exitBtn = undefined;
    this.scoreBtn;
    this.scoreColor = undefined;
  }
  // -------------------------startTheGame()-------------------------
  startTheGame() {
    //update every frame(120ms)
    this.interID = setInterval(() => {
      this.clear();
      this.drawGround();
      this.food.getImg();
      this.player1.drawSnake();
      this.player2.drawSnake();
      this.player1.remote1();
      this.player2.remote2();
      // this.scoreColors();
      this.playersCollision();
    }, 130);
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
    //-----------Display score------------
    this.ctx.font = '35px Arial';
    this.ctx.fillStyle = this.player1.color;
    this.ctx.fillText(`Player1: ${this.player1.score}`, 590, 50);
    this.ctx.fillStyle = this.player2.color;
    this.ctx.fillText(`Player2: ${this.player2.score}`, 140, 50);
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
    this.canvasButtons = document.getElementById('canvasButtons');
    //create score button instead of canvas fillText and two other buttons
    //to avoid positioning if text width changes
    //we add score button inside canvasButtons which already flexed with space-around
    this.scoreBtn = document.createElement('button');
    this.scoreBtn.setAttribute('id', 'score-button');
    //create restart button
    this.restartBtn = document.createElement('button');
    this.restartBtn.setAttribute('id', 'restart-button');
    this.restartBtn.innerHTML = 'Reset';
    //create exit button
    this.exitBtn = document.createElement('button');
    this.exitBtn.setAttribute('id', 'exit-button');
    this.exitBtn.innerHTML = 'Exit';
    //append buttons to canvasButtons if it's not created yet
    // to avoid create double buttons when both players have collision the same time.
    if (!canvasButtons.innerHTML.includes('button')) {
      canvasButtons.appendChild(this.restartBtn);
      canvasButtons.appendChild(this.scoreBtn); //create in the middle
      canvasButtons.appendChild(this.exitBtn);
    }
    //check status win
    if (this.player1.score > this.player2.score) {
      this.scoreBtn.innerHTML = `Player1 is the winner!`;
    } else if (this.player1.score < this.player2.score) {
      this.scoreBtn.innerHTML = `Player2 is the winner!`;
    } else {
      this.scoreBtn.innerHTML = `It's a draw!`;
    }
  }

  //set both players collision
  playersCollision() {
    let p1 = this.player1.snakeRoute;
    let p2 = this.player2.snakeRoute;
    for (let i = 0; i < p1.length; i++) {
      for (let j = 0; j < p2.length; j++) {
        if (p1[i].x === p2[j].x && p1[i].y === p2[j].y) {
          this.player1.sound.dead.play();
          clearInterval(this.interID);
          this.gameOver();
          return;
        }
      }
    }
  }

  //switch colors depending on player score.
  // scoreColors() {
  //   if (this.score === 0) this.scoreColor = '#f00'; //red
  //   if (this.score > 0) this.scoreColor = '#fff'; //white
  //   if (this.score > 10) this.scoreColor = '#ff0'; //yellow
  //   if (this.score > 20) this.scoreColor = 'orange'; //
  //   if (this.score > 30) this.scoreColor = '#f00'; //red
  //   if (this.score > 40) this.scoreColor = '#green'; //green

  //   if (this.score % 10 === 0 && this.score > 0) {
  //     this.scoreColor = '#fff';
  //     this.ctx.fillStyle = this.scoreColor;
  //     this.ctx.font = '35px Arial';
  //     this.ctx.fillText(
  //       `Congrats, you earned ${this.score} points`,
  //       this.width / 2 - 220,
  //       this.height / 2
  //     );
  //   }
  // }
}
