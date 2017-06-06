import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = history => {
  const routing = routerMiddleware(history);
  return createStore(
    rootReducer,
    {},
    applyMiddleware(
      thunkMiddleware,
      routing
    )
  );
};

export default configureStore;
