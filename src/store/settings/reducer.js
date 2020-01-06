import {
  SET_FILTER,
  Filters
} from './types';


const initialState = {
  activeFilter: Filters.WEEK,
  activeWeeks: null,
  activeDays: null,
  activeVehicles: [],
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case SET_FILTER:
      const { activeFilter, activeWeeks, activeDays, activeVehicles } = payload;

      return {
        activeFilter,
        activeWeeks,
        activeDays,
        activeVehicles
      };
    default:
      return state;
  }
}
