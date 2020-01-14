import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Mapbox, NavBar } from './containers';
import { FeatureSideBar } from './components';
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
      setShowRoutes,

      setActiveFeature
    } = this.props;

    const {
      status: solutionStatus,
      vehiclesPerDay,
      vehiclesPerWeek,
      vehicles,
      hosts,

      // Selectors
      getVehiclesByDays,
      getVehiclesByWeeks,
      getDaysByVehicles,
      getWeeksByVehicles
    } = solution;

    const {
      // Filters
      activeFeature,
      activeVehicles,
      activeFilter,
      activeDays,
      activeWeeks,
      showAllRoutes,
      vehicleColors
    } = settings;

    return (
      <div id='App' className="App">
        {
          activeFeature !== null ?
            <FeatureSideBar
            hosts={hosts}
            activeFeature={activeFeature}
            vehicles={vehicles}
            setActiveFeature={setActiveFeature} />
            : null
        }

        <div id='main-content'>
          <NavBar
            solutionStatus={solutionStatus}
            loadSolution={loadSolution}
            setDays={setDays}
            setVehicles={setVehicles}
            setWeeks={setWeeks}
            setShowRoutes={setShowRoutes}

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
            showAllRoutes={showAllRoutes}
            vehicleColors={vehicleColors} />

          <Mapbox
            activeFilter={activeFilter}
            activeVehicles={activeVehicles}
            showAllRoutes={showAllRoutes}
            vehicles={vehicles}
            hosts={hosts}
            vehicleColors={vehicleColors}
            vehiclesPerDay={vehiclesPerDay}
            vehiclesPerWeek={vehiclesPerWeek}
            setActiveFeature={setActiveFeature} />
        </div>

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
      getDaysByVehicles: vehicles => SolutionSelectors.getDaysByVehicles(solution, vehicles),
      getWeeksByVehicles: vehicles => SolutionSelectors.getWeeksByVehicles(solution, vehicles),
      ...solution
    }
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  // Settings
  setVehicles: vehicles => dispatch(SettingsActions.setVehicles(vehicles)),
  setWeeks: weeks => dispatch(SettingsActions.setWeeks(weeks)),
  setDays: days => dispatch(SettingsActions.setDays(days)),

  setActiveFeature: feature => dispatch(SettingsActions.setActiveFeature(feature)),
  setShowRoutes : showAllRoutes => dispatch(SettingsActions.setShowRoutes(showAllRoutes)),
  
  // Solution
  loadSolution: file => dispatch(SolutionActions.loadSolution(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);