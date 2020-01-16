class ScoreCard {
  constructor() {
    this.score = 0;
  }
  get currentScore() {
    return this.score;
  }
  updateScore() {
    this.score++;
  }
}
