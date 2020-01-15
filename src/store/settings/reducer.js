import {
  SET_ACTIVE_FEATURES,
  SET_VEHICLE_COLORS,
  SET_SHOW_ROUTES,
  SET_FILTER,
  Filters
} from './types';


const initialState = {
  activeFeatures: null,
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
    case SET_ACTIVE_FEATURES:
      return {
        ...state,
        activeFeatures: payload
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
