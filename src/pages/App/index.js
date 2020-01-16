import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Mapbox, NavBar } from '../../containers';
import { FeatureSideBar } from '../../components';

import * as SettingsActions from '../../store/settings/actions';
import * as SolutionActions from '../../store/solution/actions';

import * as SolutionSelectors from '../../store/solution/selectors';

import './style.css';

class App extends Component {
  state = {
  }
  
  render() {
    const {
      settings,
      solution,
      loadSolution,
      clearSolution,

      // Filter setters
      setDays,
      setVehicles,
      setWeeks,
      setShowRoutes,

      setActiveFeatures
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
      activeFeatures,
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
          activeFeatures !== null ?
            <FeatureSideBar
              hosts={hosts}
              activeFeatures={activeFeatures}
              vehicles={vehicles}
              setActiveFeatures={setActiveFeatures} />
            : null
        }

        <div id='main-content'>
          <NavBar
            solutionStatus={solutionStatus}
            loadSolution={loadSolution}
            clearSolution={clearSolution}

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
            setActiveFeatures={setActiveFeatures} />
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

  setActiveFeatures: features => dispatch(SettingsActions.setActiveFeatures(features)),
  setShowRoutes : showAllRoutes => dispatch(SettingsActions.setShowRoutes(showAllRoutes)),
  
  // Solution
  loadSolution: file => dispatch(SolutionActions.loadSolution(file)),
  clearSolution: () => dispatch(SolutionActions.clearSolution())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);