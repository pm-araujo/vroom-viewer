import { daysFromWeeks, weeksFromDays } from '../../utils/schedule';
import {
  getVehiclesByWeeks,
  getVehiclesByDays,
  getWeeksByVehicles,
  getDaysByVehicles
} from '../solution/selectors';

import {
  SET_FILTER,
  Filters
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