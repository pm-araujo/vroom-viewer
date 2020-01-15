import React, { PureComponent } from 'react';
import MapGL, { Layer, Source } from 'react-map-gl';

import Polyline from '@mapbox/polyline';

import { MapMarkers } from '../../components';

import './style.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const arrayEquals = (a1, a2) => a1.length === a2.length && a1.every(a => a2.includes(a));

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

export default class Mapbox extends PureComponent {
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
            steps.forEach(({ job }, order) => job !== undefined && hostsActive.push({ job, vehicle, order }));
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
          const { job, order, vehicle } = h;
          const resolved = hosts[job];

          if (acc.find(({ host }) => host === resolved.host) === undefined) {
            acc.push({ ...resolved, color: vehicleColors[vehicle][activeFilter], order });
          }
          return acc;
        }, []);

        const resolvedInactiveHosts = hostsInactive.reduce((acc, h) => {
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

    const hoveredFeatures = features && features.reduce((acc, f) => {
      if (
        (f.layer.id === 'data' || f.layer.id === 'dataInactive')
        && (acc.find(af => af.properties.vehicle === f.properties.vehicle) === undefined)
      ) { acc.push(f); }
      return acc;
    }, []);

    this.setState({
      hoveredFeatures,
      x: offsetX, y: offsetY
    });
  }

  _onClick = ev => {
    const { features } = ev;
    const { setActiveFeatures } = this.props;
    const activeFeatures = features && features.filter(f => f.layer.id === 'data' || f.layer.id === 'dataInactive');

    if (activeFeatures) {
      // setActiveFeature({ type: 'vehicle', id: activeFeature.properties.vehicle });
      setActiveFeatures(activeFeatures.map(f => ({ type: 'vehicle', id: f.properties.vehicle })))
    } else {
      setActiveFeatures();
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
    const {hoveredFeatures, x, y} = this.state;

    if (!hoveredFeatures || !hoveredFeatures.length) {
      return null;
    }

    return (
      <div className='Tooltip' style={{left: x, top: y}}>
        {
          hoveredFeatures.length > 1 && <div>Count: {hoveredFeatures.length}</div>
        }
        <div>Vehicles: </div>
        <div className='Tooltip-VehicleHolder'>
          { hoveredFeatures.map((f, i) => <span key={i}>{f.properties.vehicle + 1}</span>) }
        </div>
      </div>
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
      setActiveFeatures,
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
                <MapMarkers data={[depot]} type='depot'/>
                : null
            }
                        {
              showAllRoutes ?
                <MapMarkers data={hostsInactive} type='inactive' clickHandler={setActiveFeatures} />
                : null
            }
            <MapMarkers data={hosts} type='host' clickHandler={setActiveFeatures}/>
            {this._renderTooltip()}
        </MapGL>
      </div>
    );
  }
};