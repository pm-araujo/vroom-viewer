import moment from 'moment';

const N_WORKDAYS = 5;
const N_WEEKS = 4;

const NamedWeeks = Array.from({ length: N_WEEKS}, (_, i) => `Week ${i + 1}`);
const NamedDays = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri'
];

/**
 * Resolves array of day indices for given week indices array
 * 
 * @param {Number[]} weeks
 *    [0, 2] = first week, third week days => [0..4, 10..14]
 *    [1, 3] = second week, fourth week days => [5..9, 15..19]
 */
export function daysFromWeeks(weeks) {
  return weeks.flatMap(w => Array.from({ length: N_WORKDAYS }, (_, i) => i + w * 5));
}

/**
 * Resolves array of unique week indices for given days indices array
 * 
 * @param {Number[]} days 
 *    [0, 1, 2, 10, 11] => first week, third week => [0, 2]
 *    [5, 8, 15] = second week, fourth week => [1, 3]
 */
export function weeksFromDays(days) {
  return Array.from(new Set(days.map(d => Math.floor(d / N_WORKDAYS))));
}

/**
 * Resolve 
 * @param {*} time 
 */
export function resolveTime(time) {
  let hours = time / 60 / 60;
  let days = hours / 24;
  let weeks = days / N_WORKDAYS;

  if (days > N_WORKDAYS) {

  }

  if (days > 1) {
    hours = hours % 24;
  }

  if (weeks > 1) {
    days = days % N_WORKDAYS;
  }

  const resolvedWeek = NamedWeeks[Math.floor(weeks)];
  const resolvedDay = NamedDays[Math.floor(days)];
  const resolvedHour = `${moment.duration(hours, 'hours').hours()}h${moment.duration(hours, 'hours').minutes()}m`;
  
  return `${resolvedWeek}, ${resolvedDay} - ${resolvedHour}`;
}