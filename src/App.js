import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Mapbox, NavBar } from './containers';
import './App.css';

import * as SettingsActions from './store/settings/actions';
import * as SolutionActions from './store/solution/actions';

import * as SolutionSelectors from './store/solution/selectors';

class App extends Component {
  state = {
  }
  
  render() {
    const {
      settings,
      solution,
      loadSolution,

      // Filter setters
      setDays,
      setVehicles,
      setWeeks,
    } = this.props;

    const {
      status: solutionStatus,
      vehiclesPerDay,
      vehiclesPerWeek,
      vehicles,

      // Selectors
      getVehiclesByDays,
      getVehiclesByWeeks,
      getDaysByVehicles,
      getWeeksByVehicles
    } = solution;

    const {
      // Filters
      activeVehicles,
      activeFilter,
      activeDays,
      activeWeeks,
      vehicleColors
    } = settings;

    return (
      <div className="App">
        <NavBar
          solutionStatus={solutionStatus}
          loadSolution={loadSolution}
          setDays={setDays}
          setVehicles={setVehicles}
          setWeeks={setWeeks}

          getVehiclesByDays={getVehiclesByDays}
          getVehiclesByWeeks={getVehiclesByWeeks}
          getDaysByVehicles={getDaysByVehicles}
          getWeeksByVehicles={getWeeksByVehicles}

          vehiclesPerDay={vehiclesPerDay}
          vehiclesPerWeek={vehiclesPerWeek}
          vehicles={vehicles}

          activeFilter={activeFilter}
          activeDays={activeDays}
          activeWeeks={activeWeeks}
          activeVehicles={activeVehicles}
          vehicleColors={vehicleColors}
          />
        <Mapbox
          activeFilter={activeFilter}
          activeVehicles={activeVehicles}
          vehicles={vehicles}
          vehicleColors={vehicleColors} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { settings, solution } = state;

  return {
    settings,
    solution: {
      getVehiclesByDays: days => SolutionSelectors.getVehiclesByDays(state, days),
      getVehiclesByWeeks: weeks => SolutionSelectors.getVehiclesByWeeks(state, weeks),
      getDaysByVehicles: vehicles => SolutionSelectors.getDaysByVehicles(state, vehicles),
      getWeeksByVehicles: vehicles => SolutionSelectors.getWeeksByVehicles(state, vehicles),
      ...solution
    }
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  // Settings
  setVehicles: vehicles => dispatch(SettingsActions.setVehicles(vehicles)),
  setWeeks: weeks => dispatch(SettingsActions.setWeeks(weeks)),
  setDays: days => dispatch(SettingsActions.setDays(days)),
  // Solution
  loadSolution: file => dispatch(SolutionActions.loadSolution(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);