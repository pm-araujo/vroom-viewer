import { SET_STATUS, LOAD_SOLUTION, LoadStatus } from './types';

const initialState = {
  status: LoadStatus.EMPTY,
  hosts: [],
  vehicles: [],
  vehiclesPerDay: [],
  vehiclesPerWeek: []
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case SET_STATUS:
      return { ...state, status: payload.status };
    case LOAD_SOLUTION:
      const { hosts, vehicles, vehiclesPerDay, vehiclesPerWeek } = payload;

      return {
        status: LoadStatus.DONE,
        hosts,
        vehicles,
        vehiclesPerDay,
        vehiclesPerWeek
      };
    default:
      return state;
  }
};
