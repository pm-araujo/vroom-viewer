import React, { Fragment } from 'react';

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
    activeWeeks
  } = props;

  return (
    <header className='NavBar'>
      {
        solutionStatus === 'EMPTY' && emptyContent(loadSolution) ||
        solutionStatus === 'LOADING' && loadingContent ||
        <Fragment>
          <ButtonSelect isActive={activeFilter === 'WEEK'}
            title='Weeks' data={vehiclesPerWeek} onChange={setWeeks} />
          <ButtonSelect isActive={activeFilter === 'DAY'}
            title='Days' data={vehiclesPerDay} onChange={setDays} />
          <ButtonSelect isActive={activeFilter === 'VEHICLE'}
            title='Vehicles' data={vehicles} onChange={setVehicles} />
        </Fragment>
      }
    </header>
  );
}

export default NavBar;