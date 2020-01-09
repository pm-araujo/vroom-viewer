import React, { Fragment } from 'react';

import moment from 'moment';

import { ButtonSelect, FileInput } from '../../components';

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
  const earliest = activeVehicles[0];
  const latest = activeVehicles[activeVehicles.length - 1]

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
    daysByVehicles,
    weeksByVehicles,

    // Setters
    setDays,
    setVehicles,
    setWeeks,

    // Filters
    activeFilter,
    activeVehicles,
    activeDays,
    activeWeeks,
    vehicleColors
  } = props;

  return (
    <header className='NavBar'>
      {
        solutionStatus === 'EMPTY' && emptyContent(loadSolution) ||
        solutionStatus === 'LOADING' && loadingContent ||
        <Fragment>
          <ButtonSelect title='Weeks' isActive={activeFilter === 'WEEK'}
            data={vehiclesPerWeek} colors={vehicleColors.map(({ WEEK }) => WEEK)} onChange={setWeeks} />

          <ButtonSelect title='Days' isActive={activeFilter === 'DAY'}
            data={vehiclesPerDay} colors={vehicleColors.map(({ DAY }) => DAY)} onChange={setDays} />

          <ButtonSelect title='Vehicles' isActive={activeFilter === 'VEHICLE'}
            data={vehicles} colors={vehicleColors.map(({ VEHICLE }) => VEHICLE)} onChange={setVehicles} />
            
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
              <span>{timeCalc(vehicles, activeVehicles)}</span>
            </span>
            <span className='NavBar-StatsField'>
              <label>End:</label>
              <span>{timeCalc(vehicles, activeVehicles, true)}</span>
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