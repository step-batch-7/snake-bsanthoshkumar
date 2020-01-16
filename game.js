const isFoodEatenBySnake = ([headX, headY], [foodX, foodY]) => {
  return headX == foodX && headY == foodY;
};

class Game {
  constructor(snake, ghostSnake, food, scoreCard) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.scoreCard = scoreCard;
    this.isGameOver = false;
  }

  moveSnakes() {
    this.snake.move();
    this.ghostSnake.move();
    this.isGameOver = this.isSnakeOutOfGrid() || this.snake.isTouchedItself;
    if (isFoodEatenBySnake(this.snake.head, this.food.location)) {
      this.snake.grow();
      this.food.generateNewFood();
      this.scoreCard.updateScore();
    }
  }

  isSnakeOutOfGrid() {
    const [headX, headY] = this.snake.head;
    const isHeadXOutOfRange = headX < 0 || headX >= NUM_OF_COLS;
    const isHeadYOutOfRange = headY < 0 || headY >= NUM_OF_ROWS;
    return isHeadXOutOfRange || isHeadYOutOfRange;
  }

  get status() {
    return {
      snake: this.snake.status,
      ghostSnake: this.ghostSnake.status,
      food: this.food.status,
      currentScore: this.scoreCard.currentScore,
      isGameOver: this.isGameOver
    };
  }
}
