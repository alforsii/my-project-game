class Snake {
  constructor(game) {
    this.game = game;
    this.sound = new Sound();
    this.length = 1;
    this.snakeRoute = [
      {
        x: 9 * this.game.box,
        y: 10 * this.game.box,
        w: this.game.box,
        h: this.game.box,
      },
    ];
    this.state = true;
    this.fillColor = 'orange';
    this.strokeColor = 'black';
    this.dir = undefined; //this is snakes direction, to keep track of snakes direction to avoid going reverse. Example, if we are going up we cannot go down or when going right we can't go left until we go up or down and then left, and so on.
    this.newHead = undefined; //this is the  head object, which we will add to the beginning of our snake array to increase the length when snake eats food.
  }

  move() {
    document.addEventListener('keydown', event => {
      const key = event.keyCode;
      event.preventDefault();

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
    });
  }

  drawSnake() {
    //1. Create snake object, which is in our case rectangle with size of box=32 in game.js
    let aSnake = this.snakeRoute;
    if (this.dir === 'LEFT') aSnake[0].x -= this.game.box;
    if (this.dir === 'UP') aSnake[0].y -= this.game.box;
    if (this.dir === 'RIGHT') aSnake[0].x += this.game.box;
    if (this.dir === 'DOWN') aSnake[0].y += this.game.box;

    for (let i = 0; i < aSnake.length; i++) {
      this.game.ctx.fillStyle = i === 0 ? this.fillColor : 'lightGreen';
      this.game.ctx.fillRect(
        aSnake[i].x,
        aSnake[i].y,
        aSnake[i].w,
        aSnake[i].h
      );

      this.game.ctx.strokeStyle = this.strokeColor;
      this.game.ctx.strokeRect(
        aSnake[i].x,
        aSnake[i].y,
        aSnake[i].w,
        aSnake[i].h
      );
    }
    //if snake it's the food
    //this is the head of snake which is 0 index first elem.

    let snakeX = aSnake[0].x;
    let snakeY = aSnake[0].y;
    let snakeW = aSnake[0].w;
    let snakeH = aSnake[0].h;
    //if the head of the snake x and y equals to the food x and y location, then it re
    this.newHead = { x: snakeX, y: snakeY, w: snakeW, h: snakeH };

    if (snakeX === this.game.food.x && snakeY === this.game.food.y) {
      this.game.score++;
      this.length++;
      this.sound.eat.play();
      this.game.food.randomizeImg();
      this.game.food.x = Math.floor(Math.random() * 17 + 1) * this.game.box;
      this.game.food.y = Math.floor(Math.random() * 15 + 2) * this.game.box;

      //if eats food we don't remove the tail
      //because we want to add that x and y to our snake array, so food x and y will become the head of a snake.
    } else {
      //remove the tail
      this.snakeRoute.pop();
    }
    if (
      snakeX < this.game.box ||
      snakeX > 18 * this.game.box ||
      snakeY < 2 * this.game.box ||
      snakeY > 19 * this.game.box ||
      this.collision(this.newHead, aSnake)
    ) {
      if (this.state) {
        this.sound.dead.play();
        this.state = false;
      }
      this.game.gameOver();
    }
    this.snakeRoute.unshift(this.newHead);
  }

  // check for collision. This collision is not with border, this is with snake it self.
  //if it hits itself ===>
  collision(head, arr) {
    for (let i = 1; i < arr.length; i++) {
      if (head.x === arr[i].x && head.y === arr[i].y) {
        return true;
      }
      return false;
    }
  }
}
