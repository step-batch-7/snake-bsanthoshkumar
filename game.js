const isFoodEatenBySnake = ([headX, headY], [foodX, foodY]) => {
  return headX == foodX && headY == foodY;
};

class Game {
  constructor(snake, ghostSnake, food, scoreCard) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.scoreCard = scoreCard;
  }

  moveSnakes() {
    this.snake.move();
    this.ghostSnake.move();
    if (isFoodEatenBySnake(this.snake.head, this.food.location)) {
      this.snake.grow();
      this.food.generateNewFood();
      this.scoreCard.updateScore();
    }
  }

  get status() {
    return {
      snake: this.snake.status,
      ghostSnake: this.ghostSnake.status,
      food: this.food.status,
      currentScore: this.scoreCard.currentScore
    };
  }
}
