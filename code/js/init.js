window.addEventListener('load', () => {
  const newGame = new Game();
  //Create new game, references to font image and buttons.
  const start = document.getElementById('start-button');
  const playersDiv = document.getElementById('players');

  // ---------- All click event buttons--------------------
  document.onclick = event => {
    let btnID = event.target.id;
    switch (btnID) {
      // Start game
      case 'start-button':
        //Activate canvas, hide main and start the game
        if (newGame.player1Name.value || newGame.player2Name.value) {
          newGame.timeSpeed = newGame.select();
          sideBar.classList.remove('display-none');
          arrowButtonsDiv.classList.remove('display-none');
          //this just reverse names when game starts to match keyboard.
          playersDiv.classList.add('flip-players');
          score1.classList.remove('display-none');
          score2.classList.remove('display-none');
          newGame.canvas.classList.remove('display-none');
          start.classList.add('display-none');
          newGame.startTheGame();
          levels.classList.add('display-none'); //this direct #levels from html
        }
        if (!newGame.player1Name.value && !newGame.player2Name.value)
          alert(`Please enter name`);
        //Activate player1 only
        if (newGame.player1Name.value && !newGame.player2Name.value) {
          newGame.player1.state = true;
          player2div.remove();
          leftSide.remove();
        }
        //Activate player2 only
        if (!newGame.player1Name.value && newGame.player2Name.value) {
          newGame.player2.state = true;
          player1div.remove();
          rightSide.remove();
        }
        //Activate player1 and player2
        if (newGame.player1Name.value && newGame.player2Name.value) {
          newGame.player1.state = true;
          newGame.player2.state = true;
        }
        break;
      //Reset game
      case 'restart-button':
        newGame.clear();
        newGame.canvasButtons.innerHTML = '';
        newGame.drawGround();
        newGame.food.randomizeImg();
        newGame.food.getImg();
        //reset player1 only
        if (newGame.player1Name.value && !newGame.player2Name.value) {
          newGame.player1.dir = undefined;
          newGame.player1.score = 0;
          newGame.player1.state = true;
          newGame.player2.state = false;
          newGame.player1.snakeRoute = [
            {
              x: 19 * newGame.box,
              y: 10 * newGame.box,
              w: newGame.box,
              h: newGame.box,
            },
          ];
        }
        //reset player2 only
        if (!newGame.player1Name.value && newGame.player2Name.value) {
          newGame.player2.dir = undefined;
          newGame.player2.score = 0;
          newGame.player1.state = false;
          newGame.player2.state = true;
          newGame.player2.snakeRoute = [
            {
              x: 9 * newGame.box,
              y: 10 * newGame.box,
              w: newGame.box,
              h: newGame.box,
            },
          ];
        }
        //reset player1 and player2
        if (newGame.player1Name.value && newGame.player2Name.value) {
          newGame.player1.dir = undefined;
          newGame.player1.score = 0;
          newGame.player1.state = true;
          newGame.player1.snakeRoute = [
            {
              x: 19 * newGame.box,
              y: 10 * newGame.box,
              w: newGame.box,
              h: newGame.box,
            },
          ];
          newGame.player2.dir = undefined;
          newGame.player2.score = 0;
          newGame.player2.state = true;
          newGame.player2.snakeRoute = [
            {
              x: 9 * newGame.box,
              y: 10 * newGame.box,
              w: newGame.box,
              h: newGame.box,
            },
          ];
        }
        //This startTheGame() needs to be at the bottom,
        // after resetting all components in order to restart the game.
        // Otherwise it will not work.
        newGame.startTheGame();
        break;
      //Exit game and reload the page
      case 'exit-button':
        location.reload();
        break;
    }
  };
});
