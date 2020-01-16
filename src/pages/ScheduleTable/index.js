import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stripIndent } from 'common-tags';

import * as SettingsActions from '../../store/settings/actions';
import { resolveWeekDay } from '../../utils';

import './style.css';

const N_WEEKDAYS = 5;
const N_WEEKS = 4;

const N_WORKDAYS = N_WEEKS * N_WEEKDAYS;

class ScheduleTable extends Component {
  state = {
    hostsWithPickups: []
  }

  /*
    This page must only be accessible when a solution has been loaded

    Actions emitted from this page will not be caught on other pages,
      there is however a subscribe hook on the root store object which
      upon receiving a state change serializes the state into localStorage
  */
  

  static getDerivedStateFromProps({ settings, solution }, prevState) {
    const {
      hosts,
      vehicles,
      vehiclesPerDay
    } = solution;
    const {
      vehicleColors
    } = settings;

    if (hosts && vehicles) {
      return {
        hostsWithPickups: hosts.reduce((acc, h, idxHost) => {
          let curHost;

          if ((curHost = acc.find(a => a.host === h.host)) === undefined) {

            acc.push({
              host: h.host,
              freq: `${h.perMonth}${h.perMonth === 7 ? '.' + h.perWeek : ''}`,
              pickupPerDay: Array.from({ length: N_WORKDAYS }, (_, idxDay) => {
                const [id] = vehiclesPerDay[idxDay].filter(v =>
                  vehicles[v].steps.find(s => s.type === 'job' && s.job === idxHost) !== undefined
                );
                const color = id !== undefined && vehicleColors[id].DAY
                return {
                  vehicle: { id, color }
                };
              })
            })
          } else {
            curHost.pickupPerDay = curHost.pickupPerDay.map((p, idxDay) => {
              const [id] = vehiclesPerDay[idxDay].filter(v =>
                vehicles[v].steps.find(s => s.type === 'job' && s.job === idxHost) !== undefined
              );
              const color = id !== undefined && vehicleColors[id].DAY

              return id !== undefined ? {
                vehicle: { id, color }
              } : p;
            })
          }

          return acc;
        }, [])
      };
    }

    return null;
  }

  resolveTitle = (vehicleId, host, freq) => {
    return stripIndent`
      ${vehicleId !== undefined ? `Vehicle ${vehicleId + 1}` : ''}
      Host: ${host}
      Freq: ${freq}
    `;
  }

  render() {
    const {
      settings,
      solution,

      setShowRoutes
    } = this.props;

    const {
      status,
      hosts,
      vehicles
    } = solution;

    const {
      hostsWithPickups
    } = this.state;

    return (
      <div className='ScheduleTable'>
        <div className='ScheduleTable-Header'>
          <div className='ScheduleTable-HeaderCol'>Host</div>
          {
            Array.from({ length: N_WORKDAYS }, (_, i) =>
              <div
                key={`header-${i}`}
                className='ScheduleTable-HeaderCol'
                style={i % N_WEEKDAYS === 4 ? { borderRight: '4px solid black' } : null}>
                {`${resolveWeekDay(i)} W${Math.floor(i / N_WEEKDAYS) + 1}`}
              </div>
            )
          }
        </div>
        <div className='ScheduleTable-Content'>
          <div className='ScheduleTable-HostColumn'>
          {
            hosts.reduce((acc, h, _) => {
              if (acc.find(a => a.host === h.host) === undefined) {
                acc.push(h);
              }

              return acc;
            }, []).map((h, i) => <div key={`host-cell-${i}`} className='ScheduleTable-HostCell'>{h.host}</div>)
          }
          </div>
          {
            Array.from({ length: N_WORKDAYS }, (_, idxDay) =>
              <div className='ScheduleTable-DayColumn'>
              {
                hostsWithPickups.map(({ host, freq, pickupPerDay }) => {
                  const vehicleId = pickupPerDay[idxDay].vehicle.id;
                  const vehicleColor = pickupPerDay[idxDay].vehicle.color;

                  return (
                    <div
                      title={vehicleId !== undefined ? `Vehicle ${vehicleId}` : null}
                      title={this.resolveTitle(vehicleId, host, freq)}
                      className='ScheduleTable-HostPickup'
                      style={{
                        content: ' ',
                        background: vehicleColor,
                        ...(idxDay % N_WEEKDAYS === 4 ? { borderRight: '4px solid black'} : {})
                      }}>
                    </div>
                  );
                })
              }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { settings, solution } = state;

  return {
    settings,
    solution
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  // Settings
  setVehicles: vehicles => dispatch(SettingsActions.setVehicles(vehicles)),
  setWeeks: weeks => dispatch(SettingsActions.setWeeks(weeks)),
  setDays: days => dispatch(SettingsActions.setDays(days)),

  setActiveFeatures: features => dispatch(SettingsActions.setActiveFeatures(features)),
  setShowRoutes : showAllRoutes => dispatch(SettingsActions.setShowRoutes(showAllRoutes))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleTable);