import { combineReducers } from 'redux';
import SettingsReducer from './settings/reducer';
import SolutionReducer from './solution/reducer';

const rootReducer = combineReducers({
  settings: SettingsReducer,
  solution: SolutionReducer
});

export default rootReducer;