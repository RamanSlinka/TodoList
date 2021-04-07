import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppWithReducers from "./AppWithReducers";

ReactDOM.render(<AppWithReducers />,  document.getElementById('root'));


serviceWorker.unregister();
