import { LoadStatus } from './solution/types';

export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {

  console.log('cleared localstorage', state)
  if (state.solution.status === LoadStatus.EMPTY) {
    return window.localStorage.clear();
  }

  try {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem('state', serializedState);
  } catch (error) {
    // Ignore write errors.
  }
};
