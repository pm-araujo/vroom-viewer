import React, { Fragment } from 'react';

import moment from 'moment';

import { ButtonSelect, FileInput } from '../../components';

import { resolveTime } from '../../utils';

import './style.css';

const loadingContent = (
  <p>Loading...</p>
);

const emptyContent = loadSolution => (
  <Fragment>
    <FileInput text='Load Solution' clickHandler={loadSolution} />
  </Fragment>
);

const distanceCalc = (vehicles, active) => {
  const activeVehicles = vehicles.filter(v => active.includes(v.vehicle));

  return activeVehicles.reduce((acc, v) => acc + v.distance, 0);
}

const capacityCalc = (vehicles, active) => {
  const activeVehicles = vehicles.filter(v => active.includes(v.vehicle));

  return activeVehicles.reduce((acc, v) => acc + v.pickup[0], 0);
}

const timeCalc = (vehicles, active, isEnd = false) => {
  const activeVehicles = vehicles.filter(v => active.includes(v.vehicle));
  const earliest = activeVehicles.sort(({steps: stepsA}, {steps: stepsB}) => stepsA[0].arrival - stepsB[0].arrival)[0];
  const latest = activeVehicles.sort(({steps: stepsA}, {steps: stepsB}) => stepsB[stepsB.length - 1].arrival - stepsA[stepsA.length - 1].arrival)[0];

  if (!earliest || !latest) {
    return 0;
  }

  const { arrival } = isEnd ? latest.steps[latest.steps.length - 1] : earliest.steps[0];

  return arrival;
}

const hostsCalc = (vehicles, active) => {
  const activeVehicles = vehicles.filter(v => active.includes(v.vehicle));

  return activeVehicles.reduce((acc, v) => acc + v.steps.length - 2, 0);
}

const durationCalc = (vehicles, active) => {
  const activeVehicles = vehicles.filter(v => active.includes(v.vehicle));
  const duration = activeVehicles.reduce((acc, v) => acc + v.duration, 0);
  const momentDur = moment.duration(duration, 's');
  const days = momentDur.days();
  const hours = momentDur.hours();
  const minutes = momentDur.minutes();

  //return `${momentDur.days()}d:${momentDur.hours()}h:${momentDur.minutes()}m`
  return `${days ? days + 'd' : ''} ${hours ? hours + 'h' : ''} ${minutes ? minutes + 'm' : ''}`
}

const NavBar = (props) => {
  const {
    loadSolution,
    solutionStatus,
    vehiclesPerDay,
    vehiclesPerWeek,
    vehicles,

    // Selectors
    vehiclesByDays,
    vehiclesByWeeks,
    getDaysByVehicles,
    getWeeksByVehicles,

    // Setters
    setDays,
    setVehicles,
    setWeeks,
    setShowRoutes,

    // Filters
    activeFilter,
    activeVehicles,
    activeDays,
    activeWeeks,
    showAllRoutes,
    vehicleColors
  } = props;

  return (
    <header className='NavBar'>
      {
        (solutionStatus === 'EMPTY' && emptyContent(loadSolution)) ||
        (solutionStatus === 'LOADING' && loadingContent) ||
        <Fragment>
          <div className='NavBar-Controls'>
            <ButtonSelect title='Weeks' isActive={activeFilter === 'WEEK'}
              data={vehiclesPerWeek} colors={vehicleColors.map(({ WEEK }) => WEEK)} onChange={setWeeks} />

            <ButtonSelect title='Days' isActive={activeFilter === 'DAY'}
              data={vehiclesPerDay} colors={vehicleColors.map(({ DAY }) => DAY)} onChange={setDays} />

            <ButtonSelect title='Vehicles' isActive={activeFilter === 'VEHICLE'}
              data={vehicles} colors={vehicleColors.map(({ VEHICLE }) => VEHICLE)} onChange={setVehicles}
              getWeeksByVehicles={getWeeksByVehicles} getDaysByVehicles={getDaysByVehicles} />

            <div>
              <label>
              <input
                name='showAllRoutes'
                type='checkbox'
                checked={showAllRoutes}
                onChange={({ target }) => setShowRoutes(target.checked)}
                />
                Show inactive routes
              </label>
            </div>
          </div>
            
          <div className='NavBar-Stats'>
            <span className='NavBar-StatsField'>
              <label>Vehicles:</label>
              <span>{activeVehicles.length}</span>
            </span>
            <span className='NavBar-StatsField'>
              <label>Distance:</label>
              <span>{`${distanceCalc(vehicles, activeVehicles) / 1000 } Km`}</span>
            </span>
            <span className='NavBar-StatsField'>
              <label>Capacity:</label>
              <span>{capacityCalc(vehicles, activeVehicles)}</span>
            </span>
            <span className='NavBar-StatsField'>
              <label>Hosts:</label>
              <span>{hostsCalc(vehicles, activeVehicles)}</span>
            </span>
            <span className='NavBar-StatsField'>
              <label>Start:</label>
              <span>{resolveTime(timeCalc(vehicles, activeVehicles))}</span>
            </span>
            <span className='NavBar-StatsField'>
              <label>End:</label>
              <span>{resolveTime(timeCalc(vehicles, activeVehicles, true))}</span>
            </span>
            <span className='NavBar-StatsField'>
              <label>Duration:</label>
              <span>{durationCalc(vehicles, activeVehicles)}</span>
            </span>
          </div>
        </Fragment>
      }
    </header>
  );
}

export default NavBar;