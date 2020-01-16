import { combineReducers } from 'redux';
import SettingsReducer from './settings/reducer';
import SolutionReducer from './solution/reducer';

import { CLEAR_SOLUTION } from './solution/types';

const appReducer = combineReducers({
  settings: SettingsReducer,
  solution: SolutionReducer
});

const rootReducer = (state, action) => {   
  // Clear all data in redux store to initial.
  if(action.type === CLEAR_SOLUTION) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;