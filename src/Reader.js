import React from "react";
import PropTypes from "prop-types";
import RateIterator from "./RateIterator";
import TextParser from './TextParser';

export default class Reader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      text: "",
      words: "",
      wordsPerMin: 100
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ text: props.text, wordsPerMin: props.wordsPerMin });
  }

  formatText = text => {
    //var words = [];
    const parser = new TextParser(text);
    const words = parser.flatten().pad(';').pad('.').pad(',').pad('?').parse();
    // text.replace(/\n/g, " ").replace(/\;/g, " ; ").replace(/\./g, " . ").replace(/\,/g, " , ").replace(/\?/g, " ? ")..split(" ").forEach(t => {
    //   words.push(t);
    // });
    console.log("WORDS", words)
    return words;
  };

  wpmToIntervalMS = wpm => {
    return Math.floor(1 / (parseInt(wpm) / 60) * 1000);
  };

  run = () => { 
    if (!this.iterator || (this.iterator && this.iterator.completed)) {
      this.iterator = new RateIterator(this.formatText(this.props.text));
      this.iterator.pauseOnWord(".", 1000);
      this.iterator.pauseOnWord("?", 500);
      this.iterator.pauseOnWord(",", 500);
    }
    this.iterator.setWordDelay(this.wpmToIntervalMS(this.state.wordsPerMin))

    this.iterator.start( word => {      
      this.setState({ word });
    });
  };
  pause = () => {
    this.iterator.pause();
  };

  reset = () => {
    this.iterator.reset();
    this.setState({ word:"" })
  }
  onWpmChange = e => {
    this.setState({ wordsPerMin: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>{this.state.word}</h1>
        <div>
          <input
            type="number"
            min="0"
            step="50"
            placeholder="Type WPM value, e.g 350"
            style={{ width: "200px", height: "30px" }}
            value={this.state.wordsPerMin}
            onChange={this.onWpmChange}
          />
        </div>
        <br />
        <span>
          <button style={{ width: "100px", height: "30px" }} onClick={this.run}>
            Run
          </button>

          <button
            style={{ width: "100px", height: "30px" }}
            onClick={this.pause}
          >
            Pause
          </button>
          <button
            style={{ width: "100px", height: "30px" }}
            onClick={this.reset}
          >
            Reset
          </button>
        </span>
      </div>
    );
  }
}

Reader.propTypes = {
  text: PropTypes.string.isRequired,
  wordsPerMin: PropTypes.string.isRequired
};
