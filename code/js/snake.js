class Snake {
  constructor(game, pos, color) {
    this.game = game;
    this.sound = new Sound();
    this.snakeRoute = pos;
    this.color = color;
    this.state = false;
    this.dir = undefined; //this is snakes direction, to keep track of snakes direction to avoid going reverse while in motion.
  }
  // //-------------------------drawSnake()-------------------------
  drawSnake() {
    //---move up-down and left-right - remote controller.-----
    let aSnake = this.snakeRoute;
    if (this.dir === 'LEFT') aSnake[0].x -= this.game.box;
    if (this.dir === 'UP') aSnake[0].y -= this.game.box;
    if (this.dir === 'RIGHT') aSnake[0].x += this.game.box;
    if (this.dir === 'DOWN') aSnake[0].y += this.game.box;

    //---Create snake object, which is in our case rectangle with size of box in game.js
    for (let i = 0; i < aSnake.length; i++) {
      this.game.ctx.fillStyle = i === 0 ? this.color : 'lightGreen';
      this.game.ctx.fillRect(
        aSnake[i].x + 2,
        aSnake[i].y + 2,
        aSnake[i].w - 4,
        aSnake[i].h - 4
      );
      // this.game.ctx.strokeStyle = 'black';
      // this.game.ctx.strokeRect(
      //   aSnake[i].x + 2,
      //   aSnake[i].y + 2,
      //   aSnake[i].w - 4,
      //   aSnake[i].h - 4
      // );
    }

    let snakeX = aSnake[0].x;
    let snakeY = aSnake[0].y;
    let snakeW = aSnake[0].w;
    let snakeH = aSnake[0].h;

    //this is copy of snakes head which is 0 index first elem.
    //In every frame we pop last elem and push back to first elem,to make the move(or motion).
    let newHead = { x: snakeX, y: snakeY, w: snakeW, h: snakeH };
    //-------This is collision statement-------------------------
    //There's 5-cases. Collision with the boarders and with snake itself.
    if (
      snakeX < this.game.box ||
      snakeX > 28 * this.game.box ||
      snakeY < 2 * this.game.box ||
      snakeY > 19 * this.game.box ||
      this.collision(newHead, aSnake)
    ) {
      //I don't want the press-keyboard playing sound after game over.
      //That's why I wrap it inside if only game state is true - play
      //and set back the state to false after collision,to stop the keyboard sound.
      if (this.state) {
        this.sound.dead.play();
        this.state = false;
      }
      clearInterval(this.game.interID);
      this.game.gameOver();
      return; //also we want to stop(return) this function when collision, else will pop tail and unshift extra same head to our snake, which may cause some problem.
    }
    //-------detect  snake collision with food-----------------
    if (snakeX === this.game.food.x && snakeY === this.game.food.y) {
      this.sound.eat.play();
      setTimeout(() => {
        this.sound.coin.play();
        this.score++;
      }, 1000);
      // console.log('Output: this.game.food', this.game.food);
      // console.log('Output: this.snakeRoute', this.snakeRoute);
      this.game.food.randomizeImg();
      this.game.food.x = Math.floor(Math.random() * 27 + 1) * this.game.box;
      this.game.food.y = Math.floor(Math.random() * 15 + 2) * this.game.box;
      //if eats food we don't remove the tail, instead we want to extend
    } else {
      //remove the tail every other case
      this.snakeRoute.pop();
    }
    // after removing the tail push(unshift) back to the head.
    this.snakeRoute.unshift(newHead);
  }
  // //-------------collision() - snake collision with itself--------------------
  // check for collision. This collision is not with border
  // this is if snake hits itself ===>
  collision(head, arr) {
    for (let i = 1; i < arr.length; i++) {
      if (head.x === arr[i].x && head.y === arr[i].y) {
        return true;
      }
    }
    return false;
  }
}
