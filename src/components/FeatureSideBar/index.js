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
        <ul>
          {
            activeFeature.type === 'vehicle' ?
            vehicles[activeFeature.id].steps.map((s, i) => (
                <li key={i}>
                  {s.type !== 'job' ? `${s.type} - ` : ''} {s.job}
                  <br />
                  <small>{resolveTime(s.arrival)}</small>
                </li>
            ))
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