import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Root = () => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Router>
      <CssBaseline />
      <App />
    </Router>
  </MuiPickersUtilsProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.register();
