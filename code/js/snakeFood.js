class Food {
  constructor(game, x, y, w, h) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.img = new Image();
    this.imgSrc = [
      { name: 'apple', src: './code/img/apple-forSnake3.png' },
      { name: 'strawberry', src: './code/img/strawberry.png' },
      { name: 'kiwi', src: './code/img/kiwi.ico' },
      { name: 'cherries', src: './code/img/cherries.png' },
      { name: 'bonus', src: './code/img/bonus-allFruits.gif' },
    ];
    this.index = Math.floor(Math.random() * this.imgSrc.length);
  }
  randomizeImg() {
    this.index = Math.floor(Math.random() * this.imgSrc.length);
  }
  getImg() {
    this.img.src = this.imgSrc[this.index].src;
    // this.img.onload = () => {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // };
  }
}
