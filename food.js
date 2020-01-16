class Food {
  constructor(colId, rowId, previousLocation) {
    this.colId = colId;
    this.rowId = rowId;
    this.previousLocation = previousLocation;
  }

  get location() {
    return [this.colId, this.rowId];
  }

  generateNewFood() {
    this.previousLocation = this.location;
    this.colId = Math.floor(Math.random() * NUM_OF_COLS);
    this.rowId = Math.floor(Math.random() * NUM_OF_ROWS);
  }
}
