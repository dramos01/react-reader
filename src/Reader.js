import React from 'react';
import PropTypes from 'prop-types';
import RateIterator from './RateIterator'

const PERIOD = "."
const PERIOD_PAUSE_IN_MS=1000
export default class Reader extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      word : "",
      wpm : "",
      text : "",
      words : "",
      paused: false,
    }
  }
  componentWillReceiveProps(props){
    this.setState({ text: props.text})
  }
  formatText = (text) =>{
    var words = []
    text.split(" ").forEach((t)=>{ 
      if(t.endsWith('.')){
        words.push(t.substring(0, t.length-1))
        words.push(t.charAt(t.length-1))
      }else{
        words.push(t);
      }
    })
    return words;
  }

  recurringTimer = (i=0) =>{
    const { words } = this.state;
    let interval = setInterval(() =>{
      if(i == words.length){
        clearInterval(interval)
        return;
      }
      if(words[i] === PERIOD){
        this.setState({word : PERIOD}, ()=>{
          clearInterval(interval)
          i++;
          setTimeout(()=>{
            this.recurringTimer(i)
          }, PERIOD_PAUSE_IN_MS)
        })
      }else{
        this.setState({word : words[i]}, ()=>{
          i++;
        })
      }
    }, this.wpmToIntervalMS(this.state.wpm))
  }

  renderWords = () => {
    if(this.state.wpm === "") return;
    this.setState({ words : this.formatText(this.props.text)}, () =>{
      //this.recurringTimer()
      this.iterator = new RateIterator(this.state.words, (word) =>{
        if(!this.state.paused){
          this.setState({word})
        }
        
      }, this.wpmToIntervalMS(this.state.wpm))
    })

  }

  wpmToIntervalMS = (wpm) =>{
    return Math.floor(1 / ( parseInt(wpm) / 60 ) * 1000)
  }

  run = () =>{
    this.renderWords();
  }
  pause = () =>{
   this.setState({paused : true}, () =>{
      this.iterator.pause()
   })
  }
  onWpmChange = (e) =>{
    this.setState({wpm : e.target.value})
  }
  

  render(){
    return (   
    <div>
      <h1>{this.state.word}</h1>
      <div>
        <input 
          type="number"
          min="0"
          step="50"
          placeholder="Type WPM value, e.g 350" 
          style={{ width: '200px', height: "30px"}} 
          value={this.state.wpm}
          onChange={this.onWpmChange}>
        </input>
      </div>
      <br/>
      <span>
        <button style={{ width: '100px', height: "30px"}}
        onClick={this.run}>Run</button>

        <button style={{ width: '100px', height: "30px"}}
        onClick={this.pause}>Pause</button>

      </span>
      
    </div>
    )
  }
}

Reader.propTypes = {
  text : PropTypes.string.isRequired
}