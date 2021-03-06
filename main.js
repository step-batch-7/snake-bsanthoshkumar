const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function(snake) {
  snake.positions.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const eraseFood = function(food) {
  const [colId, rowId] = food.previousLocation;
  const cell = getCell(colId, rowId);
  cell.classList.remove('food');
};

const drawFood = function(food) {
  const [colId, rowId] = food.location;
  const cell = getCell(colId, rowId);
  cell.classList.add('food');
};

const handleKeyPress = snake => {
  snake.turnLeft();
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
};

const initSnake = () => {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), 'snake');
};

const initGhostSnake = () => {
  const ghostSnakePosition = [
    [40, 30],
    [41, 30],
    [42, 30]
  ];
  return new Snake(ghostSnakePosition, new Direction(SOUTH), 'ghost');
};

const setup = game => {
  attachEventListeners(game.snake);
  createGrids();
  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
  drawFood(game.food);
};

const updateSnake = snake => {
  eraseTail(snake);
  drawSnake(snake);
};

const updateFood = food => {
  eraseFood(food);
  drawFood(food);
};

const drawScore = score => {
  const scoreBoard = document.getElementById('scoreBoard');
  scoreBoard.innerText = `Score : ${score}`;
};

const gameOver = () => {
  clearInterval(snakeAnimation);
  clearInterval(randomTurn);
  const text = document.createElement('h1');
  text.innerText = 'Game Over!';
  document.body.appendChild(text);
};

const update = game => {
  game.moveSnakes();
  const { snake, ghostSnake, food, currentScore, isGameOver } = game.status;
  if (isGameOver) {
    gameOver();
    return;
  }
  updateSnake(snake);
  updateSnake(ghostSnake);
  updateFood(food);
  drawScore(currentScore);
};

const randomlyTurnSnake = ghostSnake => {
  let x = Math.random() * 100;
  if (x > 50) {
    ghostSnake.turnLeft();
  }
};

let snakeAnimation, randomTurn;
const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(44, 30, [0, 0]);
  const scoreCard = new ScoreCard();
  const game = new Game(snake, ghostSnake, food, scoreCard);
  setup(game);
  snakeAnimation = setInterval(update, 100, game);
  randomTurn = setInterval(randomlyTurnSnake, 500, ghostSnake);
};
