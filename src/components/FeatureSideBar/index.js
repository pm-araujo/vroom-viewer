import React, { Component, Fragment } from 'react';
import { slide as Menu } from 'react-burger-menu';

import { resolveTime } from '../../utils';

import './style.css';

export default class FeatureSideBar extends Component {
  state = {
    isOpen: false,
    features: [],
    active: null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeFeatures } = nextProps;
    const { features } = prevState;

    const isDistinct = (f1, f2) => (f1 && f2) && f1.some(f => f2.find(p => (p.id === f.id) && (p.type === f.type)) === undefined);

    if (activeFeatures && activeFeatures.length === 0) {
      return { isOpen: false, features: [], active: null };
    }

    if (isDistinct(activeFeatures, features)) {
      return {
        features: activeFeatures,
        isOpen: true,
        active: activeFeatures.length > 1 ? null : 0
      };
    }

    return null;
  }

  _selectActive = active => {
    this.setState({ active })
  }

  _resolveHost = host => {
    const { hosts, vehicles } = this.props;
    const hostIndexes = hosts.reduce((acc, h, originalId) => {
      if (h.host === host) {
        acc.push({...h, originalId });
      }

      return acc;
    }, []);

    const routes = hostIndexes.reduce((acc, h) => {
      let jobIndex;
      const hostVehicle = vehicles.find(v =>
        (jobIndex = v.steps.findIndex(s => s.type === 'job' && s.job === h.originalId)) !== -1
      );

      acc.push({
        vehicle: hostVehicle.vehicle,
        time: resolveTime(hostVehicle.steps[jobIndex].arrival)
      });

      return acc;
    }, []);

    return {
      ...hostIndexes[0],
      routes
    };
  }

  render() {
    const {
      activeFeatures,
      vehicles,
      hosts,
      setActiveFeatures
    } = this.props;

    const {
      active,
      features,
      isOpen
    } = this.state;

    const currentFeature = active !== null && ({
      ...features[active],
      ...(
        features[active].type === 'vehicle'
          ? { id: features[active].id + 1, ...vehicles[features[active].id] }
          : this._resolveHost(features[active].id)
      )
    });

    return (
      <Menu
        customBurgerIcon={false}
        isOpen={this.state.isOpen}
        pageWrapId={'main-content'}
        outerContainerId={'App'}
        onStateChange={({ isOpen }) => !isOpen && setActiveFeatures()}
        noOverlay
        right >

        {
          activeFeatures && activeFeatures.length > 1 ?
            <ul>
              {
                activeFeatures.map((f, i) =>
                  <li key={i} className={`FeatureLink ${active === i ? 'active' : ''}`} onClick={() => this._selectActive(i)}>
                    {f.type} - {f.id + 1}
                  </li>
                )
              }
            </ul>
            : null
        }

        {
          currentFeature && isOpen ?
            <Fragment>
              <h1>
                <span className='SideBar-Title'>{currentFeature.type}</span>
                { currentFeature.id }
              </h1>
              <div className='SideBar-Stats'>
                {
                  currentFeature.type === 'vehicle' ?
                    <Fragment>
                      <span>
                        <b>Hosts:</b> {currentFeature.steps.length - 2}
                      </span>
                      <span>
                        <b>Capacity:</b> {currentFeature.pickup[0]} / 21
                      </span>
                    </Fragment>
                    : <Fragment>
                      <span>
                        <b># Containers</b> {currentFeature.nContainers}
                      </span>
                      <span>
                        <b>Freq:</b> {currentFeature.perMonth}{currentFeature.perMonth === 7 ? `.${currentFeature.perWeek}` : null }
                      </span>
                      <span>
                        <b># Pickups:</b> {currentFeature.nPickups}
                      </span>
                    </Fragment>
                }
              </div>
              <h3>Routes: </h3>
              <ul>
                {
                  currentFeature.type === 'vehicle' ?
                  currentFeature.steps.map((s, i) => {
                    const {
                      host,
                      pickup,
                      perMonth,
                      perWeek,
                      nContainers,
                      nPickups
                    } = s.type === 'job' && hosts[s.job];

                    return (
                      <li key={i} className='Feature'>
                        {
                          s.type !== 'job' ?
                            <Fragment>
                              <div className='Feature-Title'>{s.type}</div>
                              <small><b>Arrival: </b>{resolveTime(s.arrival)}</small>
                            </Fragment> :
                            <Fragment>
                              <div className='Feature-Title FeatureLink'
                                onClick={() => s.type === 'job' && setActiveFeatures([{ type: 'host', id: host }])}>
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
                  : currentFeature.routes.map((r, i) => {
                      const { vehicle, time } = r;

                      return (
                        <li className='Feature' key={i}>
                          <div className='Feature-Title FeatureLink'
                            onClick={() => setActiveFeatures([{ type: 'vehicle', id: vehicle }])}>
                            Vehicle {vehicle + 1}
                          </div>
                          <small>{time}</small>
                        </li>
                      );
                    })
                }
              </ul>
            </Fragment>
            : null
        }
    </Menu>
    );
  }
}