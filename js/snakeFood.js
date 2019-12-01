class Component {
  constructor(game, x, y, w, h) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.img = new Image();
  }
  getImg() {
    let foodCTX = this.game.ctx;
    this.img.src = './img/apple-forSnake3.png';
    // this.img.onload = () => {
    foodCTX.drawImage(this.img, this.x, this.y, this.width, this.height);
    // };
  }
}
