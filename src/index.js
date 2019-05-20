import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import AppWithTheme from './containers/AppWithTheme';
import * as serviceWorker from './serviceWorker';

Amplify.configure(awsmobile);

ReactDOM.render(<AppWithTheme />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
