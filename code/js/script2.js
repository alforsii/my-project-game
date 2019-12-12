window.addEventListener('load', () => {
  //   const newGame = new Game();
  //   newGame.init();

  const canvas = document.getElementById('my-canvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  //create unit
  const box = 30;
  //load image
  const ground = new Image();
  ground.src = './img/ground.png';

  const foodImg = new Image();
  foodImg.src = './img/apple-forSnake3.png';

  function getImg() {}

  // load audio files

  let dead = new Audio();
  let eat = new Audio();
  let up = new Audio();
  let right = new Audio();
  let left = new Audio();
  let down = new Audio();

  dead.src = 'audio/dead.mp3';
  eat.src = 'sounds/coin.mp3';
  up.src = 'sounds/jump.wav';
  right.src = 'audio/right.mp3';
  left.src = 'audio/left.mp3';
  down.src = 'sounds/jump.wav';

  let snake = [];
  snake[0] = {
    x: 9 * box,
    y: 10 * box,
  };

  //create food
  let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
  };

  //create score
  let score = 0;

  //move the snake
  let dir;
  document.addEventListener('keydown', moveSnake);

  function moveSnake(event) {
    const key = event.keyCode;
    event.preventDefault();

    if (key === 37 && dir !== 'RIGHT') {
      right.play();
      dir = 'LEFT';
    } else if (key === 38 && dir !== 'DOWN') {
      down.play();
      dir = 'UP';
    } else if (key === 39 && dir !== 'LEFT') {
      left.play();
      dir = 'RIGHT';
    } else if (key === 40 && dir !== 'UP') {
      up.play();
      dir = 'DOWN';
    }
  }

  // cheack collision function
  function collision(head, snakeArr) {
    for (let i = 0; i < snakeArr.length; i++) {
      if (head.x == snakeArr[i].x && head.y == snakeArr[i].y) {
        return true;
      }
    }
    return false;
  }

  //   draw to the canvas
  function draw() {
    //draw background
    for (let x = 1; x < 19; x++) {
      for (let y = 2; y < 20; y++) {
        // // all blue boxes.
        //1) all Even lines on X and Y fill with blue
        if (x % 2 === 0 && y % 2 === 0) {
          ctx.fillStyle = 'rgb(4, 160, 218)';
          ctx.fillRect(x * box, y * box, box, box);
        }
        //2) all Odd lines on X and Y fill with blue
        if (x % 2 !== 0 && y % 2 !== 0) {
          ctx.fillStyle = 'rgb(4, 160, 218)';
          ctx.fillRect(x * box, y * box, box, box);
        }
        // this is empty boxes with stroke.
        ctx.strokeStyle = 'rgb(11, 186, 250)';
        ctx.strokeRect(x * box, y * box, box, box);
      }
    }

    // DRAW SNAKE
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i == 0 ? 'green' : 'white';
      ctx.fillRect(snake[i].x, snake[i].y, box, box);

      ctx.strokeStyle = 'red';
      ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    //draw food
    ctx.drawImage(foodImg, food.x, food.y, box, box);

    // starting position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //direction
    if (dir === 'LEFT') snakeX -= box;
    if (dir === 'UP') snakeY -= box;
    if (dir === 'RIGHT') snakeX += box;
    if (dir === 'DOWN') snakeY += box;

    //if snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
      score++;
      eat.play();
      console.log('Output for: draw -> food', food);
      console.log('Output for: draw -> food', snake);
      food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 2) * box,
      };
      //if eats food we don't remove the tail
    } else {
      //remove the tail
      snake.pop();
    }

    //add newHead
    let newHead = { x: snakeX, y: snakeY };
    //game over
    if (
      snakeX < box ||
      snakeX > 18 * box ||
      snakeY < 2 * box ||
      snakeY > 19 * box ||
      collision(newHead, snake)
    ) {
      clearInterval(game);
      dead.play();
    }

    console.log('Output for: draw -> snake', snake);
    console.log('Output for: draw -> newHead', newHead);
    snake.unshift(newHead);

    ctx.fillStyle = 'white';
    ctx.font = '40px monospace';
    ctx.fillText('Score: ', 2 * box, 1.5 * box);
    ctx.fillText(score, 8 * box, 1.6 * box);
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  //   draw();
  let game = setInterval(() => {
    clear();
    draw();
  }, 150);
});
