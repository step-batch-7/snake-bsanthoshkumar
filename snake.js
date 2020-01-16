class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  get head() {
    return this.positions[this.positions.length - 1];
  }
  turnLeft() {
    this.direction.turnLeft();
  }

  grow() {
    this.positions.unshift(this.previousTail);
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  get isTouchedItself() {
    const [headX, headY] = this.head;
    const snakeBody = this.positions.slice(0, -1);
    return snakeBody.some(([partX, partY]) => partX == headX && partY == headY);
  }
  get status() {
    return {
      positions: this.positions,
      previousTail: this.previousTail,
      species: this.species
    };
  }
}
