import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navbar from './Navbar'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('container'));
ReactDOM.render(<Navbar />, document.getElementById('navbar'));
registerServiceWorker();
