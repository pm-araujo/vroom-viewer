import React, { Component, Fragment } from 'react';
import { slide as Menu } from 'react-burger-menu';

import { resolveTime } from '../../utils';

import './style.css';

export default class FeatureSideBar extends Component {
  state = {
    isOpen: false,
    type: null,
    id: null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeFeature } = nextProps;
    const { id, type } = activeFeature;
    const { prevId, prevType } = prevState;

    if (type !== prevType && id !== prevId) {
      return { isOpen: true, id, type };
    }

    return null;
  }

  render() {
    const {
      activeFeature,
      vehicles,
      hosts,
      setActiveFeature
    } = this.props;

    return (
      <Menu
        customBurgerIcon={false}
        isOpen={this.state.isOpen}
        pageWrapId={'main-content'}
        outerContainerId={'App'}
        onStateChange={({ isOpen }) => !isOpen && setActiveFeature()}
        noOverlay
        right >

        <h1>
          <span className='SideBar-Title'>{activeFeature.type}</span>
          {activeFeature.id + 1}
        </h1>
        <div className='SideBar-Stats'>
          {
            activeFeature.type === 'vehicle' ?
              <Fragment>
                <span>
                  Hosts: {vehicles[activeFeature.id].steps.length - 2} | 
                </span>
                <span>
                  Capacity: {vehicles[activeFeature.id].pickup[0]} / 21
                </span>
              </Fragment>
              : null
          }
        </div>
        <ul>
          {
            activeFeature.type === 'vehicle' ?
            vehicles[activeFeature.id].steps.map((s, i) => {
              const {
                host,
                pickup,
                perMonth,
                perWeek,
                nContainers,
                nPickups
              } = s.type === 'job' && hosts[s.job];
debugger;
              return (
                <li className='FeatureVehicle' key={i}>
                  {
                    s.type !== 'job' ?
                      <Fragment>
                        <div className='FeatureVehicle-Title'>{s.type}</div>
                        <small><b>Arrival: </b>{resolveTime(s.arrival)}</small>
                      </Fragment> :
                      <Fragment>
                        <div className='FeatureVehicle-Title'>
                          {host}
                          <small>{perMonth}{perMonth === 7 ? `.${perWeek}` : null }</small>
                        </div>
                        <small><b># Containers: </b>{nContainers}</small>
                        <br />
                        <small><b>Pickup Nr: </b>{pickup + 1} / {nPickups}</small>
                        <br />
                        <small><b>Arrival: </b>{resolveTime(s.arrival)}</small>
                      </Fragment>
                  }
                </li>
              );
            })
            : activeFeature.type === 'host' ?
              <Fragment>
              </Fragment>
            : null
          }
        </ul>

    </Menu>
    );
  }
}