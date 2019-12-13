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
        // player1.remove();//input placeholder
        // player2.remove();//input placeholder
        if (!newGame.player1Name.value && !newGame.player2Name.value)
          alert(`Please enter name`);
        if (newGame.player1Name.value && !newGame.player2Name.value) {
          newGame.player1.state = true;
          newGame.player2Name.classList.add('display-none');
          fontImg.classList.add('display-none');
          start.classList.add('display-none');
          newGame.canvas.classList.remove('display-none');
          document.body.style.background = '#203447';
          newGame.startTheGame();
        }
        if (!newGame.player1Name.value && newGame.player2Name.value) {
          newGame.player2.state = true;
          newGame.player1Name.classList.add('display-none');
          fontImg.classList.add('display-none');
          start.classList.add('display-none');
          newGame.canvas.classList.remove('display-none');
          document.body.style.background = '#203447';
          newGame.startTheGame();
        }
        if (newGame.player1Name.value && newGame.player2Name.value) {
          newGame.player1.state = true;
          newGame.player2.state = true;
          fontImg.classList.add('display-none');
          start.classList.add('display-none');
          newGame.canvas.classList.remove('display-none');
          document.body.style.background = '#203447';
          newGame.startTheGame();
        }
        break;
      //Reset game
      case 'restart-button':
        newGame.clear();
        newGame.canvasButtons.innerHTML = '';
        newGame.drawGround();
        newGame.food.randomizeImg();
        newGame.food.getImg();
        newGame.player1.dir = undefined;
        newGame.player2.dir = undefined;
        newGame.player1.score = 0;
        newGame.player2.score = 0;
        newGame.player1.length = 1;
        newGame.player2.length = 1;
        newGame.player1.state = true;
        newGame.player2.state = true;
        newGame.player1.snakeRoute = [
          {
            x: 19 * newGame.box,
            y: 10 * newGame.box,
            w: newGame.box,
            h: newGame.box,
          },
        ];
        newGame.player2.snakeRoute = [
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
