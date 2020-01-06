import { LOAD_SOLUTION, SET_STATUS, LoadStatus } from './types';


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
      const { hosts, vehiclesPerDay, vehiclesPerWeek } = data;

      return dispatch({
        type: LOAD_SOLUTION,
        payload: {
          hosts,
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