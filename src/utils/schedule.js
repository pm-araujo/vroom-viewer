const N_WORKDAYS = 5;
const N_WEEKS = 4;

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