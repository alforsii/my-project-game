window.addEventListener('load', () => {
  //initiate the new game.
  const newGame = new Game();
  const img = document.querySelector('body img');
  const start = document.getElementById('start-button');
  const restart = document.getElementById('restart-button');
  restart.classList.add('display-none');
  newGame.canvas.classList.add('display-none');
  //Start the game on click
  start.onclick = event => {
    img.classList.add('display-none');
    document.getElementById('start-button').classList.add('display-none');
    newGame.canvas.classList.remove('display-none');
    newGame.startTheGame();
  };
  //reStart
  restart.addEventListener('click', event => {
    newGame.clear();
    restart.classList.add('display-none');
    newGame.drawGround();
    newGame.food.getImg();
    newGame.snake.dir = undefined;
    newGame.score = 0;
    newGame.snake.life--;
    newGame.snake.state = true;
    newGame.snake.snakeRoute = [
      {
        x: 9 * newGame.box,
        y: 10 * newGame.box,
        w: newGame.box,
        h: newGame.box,
      },
    ];
  });
});
