import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './index.css';
import { App, ScheduleTable } from './pages';

import { initStore } from './store';

const store = initStore();

ReactDOM.render(
  <Provider store={store} >
    <Router>
      <Switch>
        <Route path='/table' component={ScheduleTable} />
        <Route path='/' exact component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
