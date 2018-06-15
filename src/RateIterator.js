export default class RateIterator{
   constructor(array, callback, delay){
       this.index = 0;
       this.delay = delay;
       this.array = array;
       this.iteratorId = null;
       this.callback = callback;
       this.paused = false;
       this.resume();
   }

   pause(){
    clearTimeout(this.iteratorId)
   }

   resume(){
        this.iteratorId = setTimeout(() =>{
        if(this.index == this.array.length){
          clearTimeout(this.iteratorId)
        }else{
            this.resume()
            this.callback(this.array[this.index])
            this.index++;
        }
      }, this.delay)
   }

}

var b = ["A", "B", "C", "D", "E", "F", "G", "H"];

var counter = 0;
var a = new RateIterator(b,(item)=>{ 
    console.log("ITEM IS ", item);
    if(counter === 2){
        a.pause()
    }
    counter++;

}, 1000 )
console.log("TEST")

setTimeout(() =>{
    a.resume()
}, 5000)

//a.resume()

