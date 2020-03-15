export default class RateIterator {
  constructor(array) {
    this.index = 0;
    this.delay = 200;
    this.array = array || [];
    this.iteratorId = null;
    this.completed = false;
    this.wordDelays = {};
  }

  setWordDelay(delay) {
    this.delay = delay;
  }
  pauseOnWord(word, delay) {
    this.wordDelays[word] = delay;
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
    //console.log("DELAYS", this.wordDelays)
    this.iteratorId = setTimeout(() => {
      if (this.index === this.array.length) {
        this.completed = true;
        this.reset();
      } else {
        const wordDelay = this.wordDelays[this.array[this.index]];
        if(wordDelay){
          //console.log("WORD DELAY", this.array[this.index], wordDelay)
          callback(this.array[this.index], this.index, this.array);
          this.pause();
          setTimeout(()=>{
            this.start(callback);
            this.index++;
          }, wordDelay)
        }else{
          //console.log("LOG", this.array[this.index])
          callback(this.array[this.index], this.index, this.array);
          this.start(callback);
          this.index++;
        }
      }
    }, this.delay);
  }
}