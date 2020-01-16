import {
  CLEAR_SOLUTION,
  LOAD_SOLUTION,
  SET_STATUS,
  LoadStatus
} from './types';

import { genVehicleColors, setWeeks } from '../settings/actions';

const readJSONFile = inputFile => new Promise((resolve, reject) => {
    const tempFileReader = new FileReader();

    tempFileReader.onerror = () => {
      tempFileReader.abort();
      reject('Problem parsing input file');
    };

    tempFileReader.onload = () => {
      resolve(JSON.parse(tempFileReader.result));
    };
    tempFileReader.readAsText(inputFile);
});


// Actions
const setStatus = payload => ({
  type: SET_STATUS,
  payload
});


// Action Creators
export const loadSolution = file => (dispatch) => {
  dispatch(setStatus({ status: LoadStatus.LOADING }));

  return readJSONFile(file)
  .then(data => {
    const { vroom, meta } = data;
    const { routes: vehicles } = vroom.output;
    const { hosts, vehiclesPerDay, vehiclesPerWeek } = meta;

    // Call vehicle color generation from settings actions
    dispatch(genVehicleColors(vehiclesPerDay, vehiclesPerWeek, vehicles.length));

    // dispatch(setVehicles(vehicles.map((_, i) => i)));
    dispatch(setWeeks(vehiclesPerWeek.map((_, i) => i)))

    return dispatch({
      type: LOAD_SOLUTION,
      payload: {
        hosts,
        vehicles,
        vehiclesPerDay,
        vehiclesPerWeek
      }
    });
    })
    .catch(err => {
      console.error(err);
      return dispatch(setStatus(LoadStatus.EMPTY));
    });
};

export const clearSolution = () => (dispatch) => {
  return dispatch({
    type: CLEAR_SOLUTION
  });
}