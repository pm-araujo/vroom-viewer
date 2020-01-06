import { LOAD_SOLUTION, LoadStatus } from './types';

const initialState = {
  status: LoadStatus.EMPTY,
  hosts: [],
  vehiclesPerDay: [],
  vehiclesPerWeek: []
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case SET_STATUS:
      return { ...state, status: payload.status };
    case LOAD_SOLUTION:
      const { hosts, routes, vehiclesPerDay, vehiclesPerWeek } = payload;

      return {
        status: LoadStatus.DONE,
        routes,
        hosts,
        vehiclesPerDay,
        vehiclesPerWeek
      };
    default:
      return state;
  }
};
