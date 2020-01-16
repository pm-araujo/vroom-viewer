import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { loadState, saveState } from './localStorage';
import reducer from './reducers';

const isDev = process.env.NODE_ENV === 'development';

export const initStore = (initialState = {}) => {
  const store = createStore(
    reducer,
    loadState() || initialState,
    isDev ?
      composeWithDevTools(applyMiddleware(thunk)) :
      applyMiddleware(thunk)
  );

  store.subscribe(() => saveState(store.getState()));

  return store;
};