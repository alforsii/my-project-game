class Player extends Snake {
  constructor(game, pos, color) {
    super(game, pos, color);
  }
  //-----------player 1-----------------
  movePlayer1() {
    document.addEventListener('keydown', event => {
      const key = event.keyCode;
      event.preventDefault();
      if (this.state) {
        if (key === 37 && this.dir !== 'RIGHT') {
          //we go left if we're not going right
          this.dir = 'LEFT';
          this.sound.moveSound.play();
        } else if (key === 38 && this.dir !== 'DOWN') {
          //we go up if we're not going down
          this.dir = 'UP';
          this.sound.moveSound.play();
        } else if (key === 39 && this.dir !== 'LEFT') {
          //we go right only if we're not going left
          this.dir = 'RIGHT';
          this.sound.moveSound.play();
        } else if (key === 40 && this.dir !== 'UP') {
          //and we go down if we're not going up.
          this.dir = 'DOWN';
          this.sound.moveSound.play();
        }
      }
    });
  }

  //-----------player 2-----------------
  movePlayer2() {
    document.addEventListener('keydown', event => {
      const key = event.keyCode;
      event.preventDefault();
      if (this.state) {
        if (key === 65 && this.dir !== 'RIGHT') {
          //we go left if we're not going right
          this.dir = 'LEFT';
          this.sound.moveSound.play();
        } else if (key === 87 && this.dir !== 'DOWN') {
          //we go up if we're not going down
          this.dir = 'UP';
          this.sound.moveSound.play();
        } else if (key === 68 && this.dir !== 'LEFT') {
          //we go right only if we're not going left
          this.dir = 'RIGHT';
          this.sound.moveSound.play();
        } else if (key === 88 && this.dir !== 'UP') {
          //and we go down if we're not going up.
          this.dir = 'DOWN';
          this.sound.moveSound.play();
        }
      }
    });
  }
}
