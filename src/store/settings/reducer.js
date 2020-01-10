import {
  SET_ACTIVE_FEATURE,
  SET_VEHICLE_COLORS,
  SET_SHOW_ROUTES,
  SET_FILTER,
  Filters
} from './types';


const initialState = {
  activeFeature: null,
  activeFilter: Filters.WEEK,
  activeWeeks: null,
  activeDays: null,
  activeVehicles: [],

  showAllRoutes: false,
  vehicleColors: []
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case SET_SHOW_ROUTES:
      const { showAllRoutes } = payload;

      return {
        ...state,
        showAllRoutes
      };
    case SET_ACTIVE_FEATURE:
      return {
        ...state,
        activeFeature: payload
      };
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
