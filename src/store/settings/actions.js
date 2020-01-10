import { daysFromWeeks, weeksFromDays, genRandomColor } from '../../utils';
import {
  getVehiclesByWeeks,
  getVehiclesByDays,
  getWeeksByVehicles,
  getDaysByVehicles
} from '../solution/selectors';

import {
  SET_ACTIVE_FEATURE,
  SET_FILTER,
  SET_VEHICLE_COLORS,
  Filters,
  SET_SHOW_ROUTES
} from './types';

const setFilter = (activeDays, activeWeeks, activeFilter, activeVehicles) => ({
  type: SET_FILTER,
  payload: {
    activeDays,
    activeWeeks,
    activeFilter,
    activeVehicles
  }
});

export const setShowRoutes = showAllRoutes => (dispatch) => {
  return dispatch({
    type: SET_SHOW_ROUTES,
    payload: { showAllRoutes }
  });
}

export const setActiveFeature = feature => (dispatch) => {
  if (!feature) {
    return dispatch({
      type: SET_ACTIVE_FEATURE,
      payload: null
    });
  }
  const { type, id } = feature;

  return dispatch({
    type: SET_ACTIVE_FEATURE,
    payload: { type, id }
  });
}

export const genVehicleColors = (vehiclesPerDay, vehiclesPerWeek, vehicleCount) => (dispatch) => {
  
  const weekColors = vehiclesPerWeek.reduce((acc, _) => {
    acc.push(genRandomColor(acc));
    return acc;
  }, []);
  const dayColors = vehiclesPerDay.reduce((acc, _) => {
    acc.push(genRandomColor(acc));
    return acc;
  }, []);
  const vehicleColors = Array.from({ length: vehicleCount }, (_, i) => i).reduce((acc, v) => {
    const week = vehiclesPerWeek.findIndex(vw => vw.includes(v));
    const day = vehiclesPerDay.findIndex(vd => vd.includes(v));

    acc.push({
      [Filters.DAY]: dayColors[day],
      [Filters.WEEK]: weekColors[week],
      [Filters.VEHICLE]: genRandomColor(acc.map(({ VEHICLE: vc }) => vc ))
    });

    return acc;
  }, []);
  
  return dispatch({
    type: SET_VEHICLE_COLORS,
    payload: { vehicleColors }
  });
}

export const setWeeks = weeks => (dispatch, getState) => {
  const activeVehicles = getVehiclesByWeeks(getState().solution, weeks);
  const activeDays = daysFromWeeks(weeks);
  const activeFilter = Filters.WEEK;

  return dispatch(setFilter(activeDays, weeks, activeFilter, activeVehicles));
};

export const setDays = days => (dispatch, getState) => {
  const activeVehicles = getVehiclesByDays(getState().solution, days);
  const activeWeeks = weeksFromDays(days);
  const activeFilter = Filters.DAY;

  return dispatch(setFilter(days, activeWeeks, activeFilter, activeVehicles));
};

export const setVehicles = vehicles => (dispatch, getState) => {
  const activeFilter = Filters.VEHICLE;
  const activeDays = getDaysByVehicles(getState().solution, vehicles);
  const activeWeeks = getWeeksByVehicles(getState().solution, vehicles);

  return dispatch(setFilter(activeDays, activeWeeks, activeFilter, vehicles));
}