import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Reader from "./Reader.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wpm: "",
      textArea:
        "If the version number doesn't show up when typing node -v, you might have to reboot."
    };
  }
  componentWillUpdate(props, state) {
    console.log("UPDATED", state);
  }

  onTextAreaChange = e => {
    this.setState({ textArea: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <textarea
          name="text"
          cols="100"
          rows="50"
          value={this.state.textArea}
          onChange={this.onTextAreaChange}
        />
        <Reader text={this.state.textArea} wordsPerMin={this.state.wpm} />
      </div>
    );
  }
}

export default App;
