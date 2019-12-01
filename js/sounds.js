class Sound {
  constructor() {
    this.dead = new Audio();
    this.eat = new Audio();
    this.moveSound = new Audio();
    this.endGame = new Audio();
    this.dead.src = './audio/dead.mp3';
    this.eat.src = './sounds/coin.mp3';
    this.moveSound.src = 'sounds/jump.wav';
    this.endGame.src = './sounds/theme-music.wav';
  }
}

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
