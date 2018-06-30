export default class RateIterator {
  constructor(array, callback, delay) {
    this.index = 0;
    this.delay = delay || 200;
    this.array = array || [];
    this.iteratorId = null;
    this.callback = callback;
    this.completed = false;
  }

  pause() {
    clearTimeout(this.iteratorId);
  }

  reset() {
    clearTimeout(this.iteratorId);
    this.index = 0;
  }

  start() {
    this.completed = false;
    this.iteratorId = setTimeout(() => {
      if (this.index === this.array.length) {
        this.completed = true;
        this.reset();
      } else {
        this.callback(this.array[this.index], this.index, this.array);
        this.start();
        this.index++;
      }
    }, this.delay);
  }
}