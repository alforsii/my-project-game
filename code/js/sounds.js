class Sound {
  constructor() {
    this.dead = new Audio();
    this.eat = new Audio();
    this.moveSound = new Audio();
    this.endGame = new Audio();
    this.dead.src = './code/audio/dead.mp3';
    this.eat.src = './code/sounds/coin.mp3';
    this.moveSound.src = './code/sounds/jump.wav';
    this.endGame.src = './code/sounds/theme-music.wav';
  }
}
