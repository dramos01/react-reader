export default class RateIterator {
    constructor(array, callback, delay) {
      this.index = 0;
      this.delay = delay || 200;
      this.array = array || [];
      this.iteratorId = null;
      this.callback = callback;
    }
  
    pause() {
      clearTimeout(this.iteratorId);
    }
  
    clear() {
      clearTimeout(this.iteratorId);
      this.index = 0;
    }
  
    start() {
      this.iteratorId = setTimeout(() => {
        if (this.index === this.array.length) {
          clearTimeout(this.iteratorId);
        } else {
          this.callback(this.array[this.index], this.index, this.array);
          this.start();
          this.index++;
        }
      }, this.delay);
    }
  }