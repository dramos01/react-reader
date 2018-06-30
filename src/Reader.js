import React from "react";
import PropTypes from "prop-types";
import RateIterator from "./RateIterator";

export default class Reader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      text: "",
      words: "",
      wordsPerMin: 0
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ text: props.text, wordsPerMin: props.wordsPerMin });
  }


  formatText = text => {
    var words = [];
    text.split(" ").forEach(t => {
      if (t.endsWith(".")) {
        words.push(t.substring(0, t.length - 1));
        words.push(t.charAt(t.length - 1));
      } else {
        words.push(t);
      }
    });
    return words;
  };

  wpmToIntervalMS = wpm => {
    return Math.floor(1 / (parseInt(wpm) / 60) * 1000);
  };

  run = () => {
    if (!this.iterator || (this.iterator && this.iterator.completed)) {
      this.iterator = new RateIterator(
        this.formatText(this.props.text),
        word => {
          this.setState({ word });
        },
        this.wpmToIntervalMS(this.state.wordsPerMin)
      );
    }
    this.iterator.start();
  };
  pause = () => {
    this.iterator.pause();
  };

  reset = () => {
    this.iterator.reset();
    this.setState({word:""})
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
  wordsPerMin: PropTypes.number.isRequired
};
