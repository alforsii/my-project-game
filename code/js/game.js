class Game {
  constructor() {
    this.canvas = document.getElementById('my-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = 900;
    this.height = this.canvas.height = 630;
    this.box = 30;
    this.pos = {
      //this is random food position
      x: Math.floor(Math.random() * 27 + 1) * this.box,
      y: Math.floor(Math.random() * 15 + 3) * this.box,
    };
    this.playersPositions = {
      p1Pos: [
        //player-1 position
        {
          x: 19 * this.box,
          y: 10 * this.box,
          w: this.box,
          h: this.box,
        },
      ],
      p2Pos: [
        //player-2 position
        {
          x: 9 * this.box,
          y: 10 * this.box,
          w: this.box,
          h: this.box,
        },
      ],
    };
    this.player1Name = document.getElementById('player1'); //player-1 input
    this.player2Name = document.getElementById('player2'); //player-2 input
    this.player1 = new Player(this, this.playersPositions.p1Pos, '#FF851B');
    this.player2 = new Player(this, this.playersPositions.p2Pos, '#FF4136');
    this.food = new Food(this, this.pos.x, this.pos.y, this.box, this.box);
    this.gameOverImg = new Image();
    this.gameOverImg.src = './img/game-over-2.png';
    this.interID = undefined;
    this.canvasButtons = undefined;
    this.restartBtn = undefined;
    this.exitBtn = undefined;
    this.timeSpeed = undefined;
  }
  //select speed
  select() {
    const selected = document.getElementById('levels').selectedIndex;
    const option = document.getElementById('levels').options;
    let valueIs = option[selected].value;
    // let indexIs = option[selected].index; //for reference
    // let textIs = option[selected].text; //for reference
    return valueIs;
  }
  // -------------------------startTheGame()-------------------------
  startTheGame() {
    //update every frame(120ms)
    this.interID = setInterval(() => {
      this.clear();
      this.drawGround();
      this.food.getImg();

      if (this.player1Name.value && !this.player2Name.value) {
        this.player1.drawSnake();
        this.player1.remote1();
        this.player1.mobileRemote();
      } else if (!this.player1Name.value && this.player2Name.value) {
        this.player2.drawSnake();
        this.player2.remote2();
        this.player2.mobileRemote();
      } else {
        this.player1.drawSnake();
        this.player1.remote1();
        this.player2.drawSnake();
        this.player2.remote2();
      }
    }, this.timeSpeed);
  }
  // //------------------------- drawGround()-------------------------
  drawGround() {
    // //----Draw background-----
    for (let x = 1; x < 29; x++) {
      for (let y = 2; y < 20; y++) {
        // // all blue boxes.
        //1) all Even lines on X and Y fill with blue
        if (x % 2 === 0 && y % 2 === 0) {
          this.ctx.fillStyle = '#203447';
          this.ctx.fillRect(x * this.box, y * this.box, this.box, this.box);
        }
        //2) all Odd lines on X and Y fill with blue
        if (x % 2 !== 0 && y % 2 !== 0) {
          this.ctx.fillStyle = '#203447';
          this.ctx.fillRect(x * this.box, y * this.box, this.box, this.box);
        }
        this.ctx.strokeStyle = '#0351f8';
        this.ctx.strokeRect(this.box * x, this.box * y, this.box, this.box);
      }
    }
    //game border
    // this.ctx.strokeStyle = '#203447s';
    // this.ctx.strokeRect(this.box, 2 * this.box, 28 * this.box, 18 * this.box);
    //--Display score update--
    //setTimeout just for score to catch the coin sound as I delay that for 500ms too, to separate eat sound from score sound.
    setTimeout(() => {
      if (this.player1Name.value) {
        //score1 is direct id name of a span for score without creating reference
        score1.innerHTML = `${this.player1.score}`;
      }
      if (this.player2Name.value) {
        //score2 also is direct id name of a span for score without creating reference
        score2.innerHTML = `${this.player2.score}`;
      }
    }, 300);
  }
  // //-------------------------clear()-------------------------------------
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  // //-------------------------gameOver()----------------------------------
  gameOver() {
    this.clear();
    // //--------Display game over image-------------------------
    this.ctx.drawImage(this.gameOverImg, 0, 0, this.width, this.height);
    this.canvasButtons = document.getElementById('canvasButtons');
    //create score button instead of canvas fillText and two other buttons
    //to avoid positioning if text width changes
    //we add score button inside canvasButtons which already flexed with space-around
    const winnerMsg = document.createElement('span');
    winnerMsg.setAttribute('id', 'msg-button');
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
      canvasButtons.appendChild(winnerMsg); //create in the middle
      canvasButtons.appendChild(this.exitBtn);
    }
    //check win/lose status
    if (this.player1Name.value && this.player2Name.value) {
      setTimeout(() => {
        if (this.player1.score > this.player2.score) {
          winnerMsg.innerHTML = `${this.player1Name.value} you are winner!`;
        } else if (this.player1.score < this.player2.score) {
          winnerMsg.innerHTML = `${this.player2Name.value} you are winner!`;
        } else {
          winnerMsg.innerHTML = `It's a draw!`;
        }
      }, 300);
    } else {
    }
  }

  //------------set both players collision------------------------------------
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
}
