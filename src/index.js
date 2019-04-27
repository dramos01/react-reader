import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//Another change in same line
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

