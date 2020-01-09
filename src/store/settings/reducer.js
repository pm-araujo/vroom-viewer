import {
  SET_FILTER,
  SET_VEHICLE_COLORS,
  Filters
} from './types';


const initialState = {
  activeFilter: Filters.WEEK,
  activeWeeks: null,
  activeDays: null,
  activeVehicles: [],
  vehicleColors: []
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case SET_VEHICLE_COLORS:
      const { vehicleColors } = payload;

      return {
        ...state,
        vehicleColors
      };
    case SET_FILTER:
      const { activeFilter, activeWeeks, activeDays, activeVehicles } = payload;

      return {
        ...state,
        activeFilter,
        activeWeeks,
        activeDays,
        activeVehicles
      };
    default:
      return state;
  }
}
