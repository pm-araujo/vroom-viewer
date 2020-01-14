export const getVehiclesByWeeks = (state, weeks) => {
  const vehicles = state.vehiclesPerWeek.filter((_, i) => weeks.includes(i));

  return vehicles.flat();
}

export const getVehiclesByDays = (state, days) => {
  const vehicles = state.vehiclesPerDay.filter((_, i) => days.includes(i));

  return vehicles.flat();
}

export const getDaysByVehicles = (state, vehicles) => {
  const days = new Set(vehicles.map(v => Number.parseInt(state.vehiclesPerDay.findIndex(vp => vp.includes(v)))));

  return Array.from(days);
};

export const getWeeksByVehicles = (state, vehicles) => {
  const weeks = new Set(vehicles.map(v => state.vehiclesPerWeek.findIndex(vw => vw.includes(v))));

  return Array.from(weeks);
};