class Snake {
  constructor(game) {
    this.game = game;
    this.life = 3;
    this.snakesRoute = []; //this is an array to store new created snake obj when every time we eat the food.
    this.snakesRoute[0] = {
      //this is game-start position.
      x: 9 * this.game.box, //this is middle of canvas width
      y: 10 * this.game.box, //this is middle of canvas height
    };
    this.dir = undefined; //this is snakes direction, to keep track of snakes direction to avoid going reverse. Example, if we are going up we cannot go down or when going right we can't go left until we go up or down and then left, and so on.
    this.dead = new Audio();
    this.eat = new Audio();
    this.moveSound = new Audio();
    this.endGame = new Audio();
    this.dead.src = './audio/dead.mp3';
    this.eat.src = './sounds/coin.mp3';
    this.moveSound.src = 'sounds/jump.wav';
    this.endGame.src = './sounds/theme-music.wav';
    this.newHead = undefined; //this is the  head object, which we will add to the beginning of our snake array to increase the length when snake eats food.
  }

  move() {
    document.addEventListener('keydown', event => {
      const key = event.keyCode;
      event.preventDefault();

      if (key === 37 && this.dir !== 'RIGHT') {
        //we go left if we're not going right
        this.dir = 'LEFT';
        this.moveSound.play();
      } else if (key === 38 && this.dir !== 'DOWN') {
        //we go up if we're not going down
        this.dir = 'UP';
        this.moveSound.play();
      } else if (key === 39 && this.dir !== 'LEFT') {
        //we go right only if we're not going left
        this.dir = 'RIGHT';
        this.moveSound.play();
      } else if (key === 40 && this.dir !== 'UP') {
        //and we go down if we're not going up.
        this.dir = 'DOWN';
        this.moveSound.play();
      }
    });
  }

  drawSnake() {
    // this.game.clear();
    //1. Create snake object, which is in our case rectangle with size of box=32 in game.js
    if (this.dir === 'LEFT') this.snakesRoute[0].x -= this.game.box;
    if (this.dir === 'UP') this.snakesRoute[0].y -= this.game.box;
    if (this.dir === 'RIGHT') this.snakesRoute[0].x += this.game.box;
    if (this.dir === 'DOWN') this.snakesRoute[0].y += this.game.box;

    let route = this.snakesRoute;
    for (let i = 0; i < route.length; i++) {
      this.game.ctx.fillStyle = i === 0 ? 'red' : 'lightGreen';
      this.game.ctx.fillRect(
        route[i].x,
        route[i].y,
        this.game.box,
        this.game.box
      );

      this.game.ctx.strokeStyle = 'black';
      this.game.ctx.strokeRect(
        route[i].x,
        route[i].y,
        this.game.box,
        this.game.box
      );
    }

    // this.game.food.getImg();
    //if snake it's the food
    //this is the head of snake which is 0 index first elem.

    let snakeX = this.snakesRoute[0].x;
    let snakeY = this.snakesRoute[0].y;
    //if the head of the snake x and y equals to the food x and y location, then it re
    this.newHead = { x: snakeX, y: snakeY };

    if (snakeX === this.game.food.x && snakeY === this.game.food.y) {
      this.game.score++;
      this.eat.play();
      this.game.food.x = Math.floor(Math.random() * 17 + 1) * this.game.box;
      this.game.food.y = Math.floor(Math.random() * 15 + 2) * this.game.box;
      // this.game.food = {
      //   x: Math.floor(Math.random() * 17 + 1) * this.game.box,
      //   y: Math.floor(Math.random() * 15 + 2) * this.game.box,
      // };
      //if eats food we don't remove the tail
      //because we want to add that x and y to our snake array, so food x and y will become the head of a snake.
    } else {
      //remove the tail
      this.snakesRoute.pop();
    }
    this.snakesRoute.unshift(this.newHead);
    if (
      snakeX < this.game.box ||
      snakeX > 18 * this.game.box ||
      snakeY < 2 * this.game.box ||
      snakeY > 19 * this.game.box
    ) {
      clearInterval(this.game.intervalID);
      this.dead.play();
      this.game.gameOver();
      // this.endGame.play();
    }
    // //newHead
    //game over

    // console.log(
    //   'Output for: Snake -> drawSnake -> this.game.food.x',
    //   this.game.food
    // );
    // console.log(
    //   'Output for: Snake -> drawSnake -> this.snakesRoute',
    //   this.snakesRoute
    // );
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
