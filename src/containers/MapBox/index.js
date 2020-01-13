import React, { Component, Fragment } from 'react';
import MapGL, { Marker, Layer, Source } from 'react-map-gl';

import Polyline from '@mapbox/polyline';

import './style.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const arrayEquals = (a1, a2) => a1.length === a2.length && a1.every(a => a2.includes(a));

const MARKER_ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
const MARKER_SIZE = 20;
const COLOR_INACTIVE = '#000000';

const dataLayer = {
  id: 'data',
  type: 'line',
  source: 'routes',
  paint: {
    'line-width': 3,
    // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
    // to set the line-color to a feature property value.
    'line-color': ['get', 'color']
  }
};

const dataLayerInactive = {
  id: 'dataInactive',
  type: 'line',
  beforeId: 'data',
  source: 'routesInactive',
  paint: {
    'line-width': 3,
    'line-color': COLOR_INACTIVE
  }
};

const dataLayerBorder = {
  id: 'dataBorder',
  beforeId: 'data',
  type: 'line',
  source: 'routes',
  paint: {
    'line-width': 5,
    'line-color': '#000000'
  }
};

const markerIcon = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

export default class Mapbox extends Component {
  state = {
    activeVehicles: [],
    routes: null,
    routesInactive: null,
    hosts: [],
    hostsInactive: [],
    depot: null,

    // Map Config
    hoveredFeature: null,
    mapStyle: {
      version: 8,
      sources: {
        'raster-tiles': {
            type: 'raster',
            tiles: [
              'http://tile.osm.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256
        }
      },
      layers: [{
          id: "test",
          type: "raster",
          source: "raster-tiles",
          minzoom: 0,
          maxzoom: 22
      }]
    },
    viewport: {
      latitude: 40,
      longitude: -7,
      zoom: 4,
      bearing: 0,
      pitch: 0
    }
  }

  static getDerivedStateFromProps(nextProps, { activeVehicles: prev }) {
    const {
      activeVehicles: cur,
      activeFilter,
      vehicleColors,
      vehicles: vehicleData,
      vehiclesPerDay,
      vehiclesPerWeek,
      hosts
    } = nextProps;

    if (cur && cur.length > 0 && vehicleData && vehicleData.length > 0 &&
      !arrayEquals(cur, prev) ) {
        const vehiclesActive = [];
        const vehiclesInactive = [];
        const hostsActive = [];
        const hostsInactive = [];

        const [longitude, latitude] = vehicleData[0].steps[0].location;
        const depot = { longitude, latitude };

        vehicleData.forEach((v, i) => {
          const { steps, vehicle } = v;

          if (cur.includes(i)) {
            vehiclesActive.push(v);
            steps.forEach(({ job }) => job !== undefined && hostsActive.push({ job, vehicle }));
          } else {
            vehiclesInactive.push(v);
            steps.forEach(({ job }) => job !== undefined && hostsInactive.push({ job, vehicle }));
          }
        });

        const routes = {
          type: 'FeatureCollection',
          features: vehiclesActive.map(v => ({
            type: 'Feature',
            geometry: Polyline.toGeoJSON(v.geometry),
            properties: {
              vehicle: v.vehicle,
              color: vehicleColors[v.vehicle][activeFilter],
              day: vehiclesPerDay.findIndex(vpd => vpd.includes(v.vehicle)),
              week: vehiclesPerWeek.findIndex(vpw => vpw.includes(v.vehicle))
            }
          }))
        };

        const routesInactive = {
          type: 'FeatureCollection',
          features: vehiclesInactive.map(v => ({
            type: 'Feature',
            geometry: Polyline.toGeoJSON(v.geometry),
            properties: {
              vehicle: v.vehicle,
              day: vehiclesPerDay.findIndex(vpd => vpd.includes(v.vehicle)),
              week: vehiclesPerWeek.findIndex(vpw => vpw.includes(v.vehicle))
            }
          }))
        };

        const resolvedActiveHosts = hostsActive.reduce((acc, h) => {
          const { job, vehicle } = h;
          const resolved = hosts[job];

          if (acc.find(({ host }) => host === resolved.host) === undefined) {
            acc.push({ ...resolved, color: vehicleColors[vehicle][activeFilter] });
          }
          return acc;
        }, []);

        const resolvedInactiveHosts = hostsActive.reduce((acc, h) => {
          const { job } = h;
          const resolved = hosts[job];

          if (acc.find(({ host }) => host === resolved.host) === undefined) {
            acc.push({ ...resolved, color: COLOR_INACTIVE });
          }
          return acc;
        }, []);

        return {
          activeVehicles: cur,
          depot,
          routes,
          routesInactive,
          hosts: resolvedActiveHosts,
          hostsInactive: resolvedInactiveHosts
        };
      }

    return null;
  }

  _handleViewportChange = ({ width, height, ...viewport }) => this.setState({ viewport: { ...this.state.viewport, ...viewport } });

  _onHover = ev => {
    const {
      features,
      srcEvent: { offsetX, offsetY }
    } = ev;

    const hoveredFeature = features && features.find(f => f.layer.id === 'data' || f.layer.id === 'dataInactive');

    this.setState({ hoveredFeature, x: offsetX, y: offsetY });
  }

  _onClick = ev => {
    const { features } = ev;
    const { setActiveFeature } = this.props;
    const activeFeature = features && features.find(f => f.layer.id === 'data' || f.layer.id === 'dataInactive');

    if (activeFeature) {
      setActiveFeature({ type: 'vehicle', id: activeFeature.properties.vehicle });
    } else {
      setActiveFeature();
    }
  }

  _getCursor = cursorState => {
    const { isDragging, isHovering } = cursorState;

    return isDragging ?
      'grabbing'
      : isHovering ?
      'pointer' : 'default'
  }
  
  _renderTooltip() {
    const {hoveredFeature, x, y} = this.state;

    if (!hoveredFeature) {
      return null;
    }

    if (hoveredFeature.type === 'host') {
      debugger;
      const { host, perWeek, perMonth, nContainers, pickup } = hoveredFeature.host;
      return (
        <div className="tooltip" style={{left: x, top: y}}>
          <div>Host: {host}</div>
        </div>
      );
    } else {
      debugger;
      return (
        <div className="tooltip" style={{left: x, top: y}}>
          <div>Vehicle: {hoveredFeature.properties.vehicle + 1}</div>
          <div>Day: {hoveredFeature.properties.day + 1}</div>
          <div>Week: {hoveredFeature.properties.week + 1}</div>
        </div>
      );
    }

    return (
      hoveredFeature && (
        <div className="tooltip" style={{left: x, top: y}}>
          <div>Vehicle: {hoveredFeature.properties.vehicle + 1}</div>
          <div>Day: {hoveredFeature.properties.day + 1}</div>
          <div>Week: {hoveredFeature.properties.week + 1}</div>
        </div>
      )
    );
  }

  render() {
    const {
      mapStyle,
      routes,
      routesInactive,
      viewport,

      hosts,
      hostsInactive,
      depot
    } = this.state;

    const {
      setActiveFeature,
      showAllRoutes
    } = this.props

    return (
      <div id="map">
        <MapGL
          mapStyle={mapStyle}
          height='100%'
          width='100%'
          interactiveLayerIds={[dataLayer.id, ...(showAllRoutes ? [dataLayerInactive.id] : [])]}
          onViewportChange={this._handleViewportChange}
          onHover={this._onHover}
          onClick={this._onClick}
          getCursor={this._getCursor}
          {...viewport}>
            <Source id='routes' type='geojson' data={routes}>
              <Layer {...dataLayer} />
              <Layer {...dataLayerBorder} />
            </Source>
            {
              showAllRoutes ?
                <Source id='routesInactive' type='geojson' data={routesInactive}>
                  <Layer {...dataLayerInactive} />
                </Source>
                : null
            }
            {
              depot ?
                <Marker latitude={depot.latitude} longitude={depot.longitude}>
                  <svg
                    height={MARKER_SIZE}
                    viewBox={`0 0 ${MARKER_SIZE + 4} ${MARKER_SIZE + 4}`}
                    style={{
                      cursor: 'pointer',
                      fill: 'red',
                      stroke: 'none',
                      transform: `translate(${-MARKER_SIZE / 2}px,${-MARKER_SIZE}px)`
                    }}>
                    <path
                      stroke='black'
                      strokeLinejoin='round'
                      strokeWidth={1}
                      d={MARKER_ICON} />
                    <text x='50%' y='50%'
                      fontWeight='bold'
                      fontSize={10}
                      fill='white'>
                      D
                    </text>
                  </svg>
                </Marker>
                : null
            }
            <Fragment>
            {
              hosts.map((h, i) => {
                const { color, host, latitude, longitude } = h;

                return (
                  <Marker
                    key={host}
                    longitude={longitude}
                    latitude={latitude}>
                    <svg
                      onClick={() => setActiveFeature({ type: 'host', id: host })}
                      onMouseEnter={ev => this._onHover({
                        srcEvent: { offsetX: ev.screenX, offsetY: ev.screenY },
                        features: [{ type: 'host', host: h, layer: { id: 'data' } }]
                      })}
                      height={MARKER_SIZE}
                      viewBox={`0 0 ${MARKER_SIZE + 4} ${MARKER_SIZE + 4}`}
                      style={{
                        cursor: 'pointer',
                        fill: color,
                        stroke: 'none',
                        transform: `translate(${-MARKER_SIZE / 2}px,${-MARKER_SIZE}px)`
                      }}>
                      <path
                        stroke='black'
                        strokeLinejoin='round'
                        strokeWidth={1}
                        d={MARKER_ICON} />
                      <text x='50%' y='50%'
                        fontWeight='bold'
                        fontSize={10}
                        fill='black'>
                        {i}
                      </text>
                    </svg>
                  </Marker>
                );
              })
            }
            </Fragment>
            {this._renderTooltip()}
        </MapGL>
      </div>
    );
  }
};