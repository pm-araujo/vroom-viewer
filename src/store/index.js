import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers';

const isDev = process.env.NODE_ENV === 'development';

export const initStore = (initialState = {}) => {
  return createStore(
    reducer,
    initialState,
    isDev ?
      composeWithDevTools(applyMiddleware(thunk)) :
      applyMiddleware(thunk)
  );
};