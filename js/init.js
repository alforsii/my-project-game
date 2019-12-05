window.addEventListener('load', () => {
  //initiate the new game,and references to font image and buttons.
  const newGame = new Game();
  const fontImg = document.querySelector('body img');
  const start = document.getElementById('start-button');
  newGame.canvas.classList.add('display-none');

  // // all click event buttons.
  document.onclick = event => {
    let btnID = event.target.id;
    switch (btnID) {
      // Start game
      case 'start-button':
        newGame.snake.state = true;
        fontImg.classList.add('display-none');
        start.classList.add('display-none');
        newGame.canvas.classList.remove('display-none');
        newGame.startTheGame();
        break;
      //Reset game
      case 'restart-button':
        newGame.clear();
        newGame.restartBtn.setAttribute('class', 'display-none');
        newGame.exitBtn.setAttribute('class', 'display-none');
        newGame.drawGround();
        newGame.food.randomizeImg();
        newGame.food.getImg();
        newGame.snake.dir = undefined;
        newGame.score = 0;
        newGame.snake.length = 1;
        newGame.snake.state = true;
        newGame.snake.snakeRoute = [
          {
            x: 9 * newGame.box,
            y: 10 * newGame.box,
            w: newGame.box,
            h: newGame.box,
          },
        ];
        //This startTheGame() needs to be at the bottom,
        // after resetting all components in order to restart the game.
        // Otherwise it will not work.
        newGame.startTheGame();
        break;
      //Exit game
      case 'exit-button':
        location.reload();
        break;
    }
  };
});
