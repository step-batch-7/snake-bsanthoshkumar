const isFoodEatenBySnake = ([headX, headY], [foodX, foodY]) => {
  return headX == foodX && headY == foodY;
};

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }

  moveSnakes() {
    this.snake.move();
    this.ghostSnake.move();
    if (isFoodEatenBySnake(this.snake.head, this.food.location)) {
      this.snake.grow();
      this.food.generateNewFood();
    }
  }
}
