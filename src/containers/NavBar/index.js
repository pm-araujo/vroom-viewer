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
    setWeeks
  } = props;

  return (
    <header className='NavBar'>
      {
        solutionStatus === 'EMPTY' && emptyContent(loadSolution) ||
        solutionStatus === 'LOADING' && loadingContent ||
        <Fragment>
          <ButtonSelect
            title='Weeks' data={vehiclesPerWeek} />
          <ButtonSelect
            title='Days' data={vehiclesPerDay} />
          <ButtonSelect
            title='Vehicles' data={vehicles} />
        </Fragment>
      }
    </header>
  );
}

export default NavBar;