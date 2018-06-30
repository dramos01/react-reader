export default class RateIterator {
  constructor(array, delay) {
    this.index = 0;
    this.delay = delay || 200;
    this.array = array || [];
    this.iteratorId = null;
    this.completed = false;
  }

  pauseOnWord(word, delay) {
    this.wordToPauseOn = word;
    this.delayOnWord = delay;
  }

  pause() {
    clearTimeout(this.iteratorId);
  }

  reset() {
    clearTimeout(this.iteratorId);
    this.index = 0;
  }

  start(callback) {
    this.completed = false;
    this.iteratorId = setTimeout(() => {
      if (this.index === this.array.length) {
        this.completed = true;
        this.reset();
      } else {

        if(this.wordToPauseOn && this.wordToPauseOn === this.array[this.index] && this.delayOnWord){
          callback(this.array[this.index], this.index, this.array);
          this.pause();
          setTimeout(()=>{
            this.start(callback);
            this.index++;
          },this.delayOnWord)
        }else{
          callback(this.array[this.index], this.index, this.array);
          this.start(callback);
          this.index++;
        }
      }
    }, this.delay);
  }
}