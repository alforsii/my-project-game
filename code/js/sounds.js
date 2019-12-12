class Sound {
  constructor() {
    this.dead = new Audio();
    this.eat = new Audio();
    this.moveSound = new Audio();
    this.endGame = new Audio();
    this.dead.src = './audio/dead.mp3';
    this.eat.src = './sounds/coin.mp3';
    this.moveSound.src = './sounds/jump.wav';
    this.endGame.src = './sounds/theme-music.wav';
  }
}
