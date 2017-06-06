import * as ActionTypes from '../actions';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import application from './application';

const rootReducer = combineReducers({
  application,
  routing
});

export default rootReducer;
