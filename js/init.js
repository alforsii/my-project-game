window.addEventListener('load', () => {
  const newGame = new Game();
  const img = document.querySelector('body img');
  newGame.canvas.classList.add('display-none');
  document.getElementById('start-button').onclick = event => {
    img.classList.add('display-none');
    newGame.canvas.classList.remove('display-none');
    newGame.startTheGame();
  };
});
