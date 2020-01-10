import React, { Component } from 'react';
import MapGL, { Layer, Source } from 'react-map-gl';

import Polyline from '@mapbox/polyline';

import './style.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const arrayEquals = (a1, a2) => a1.length === a2.length && a1.every(a => a2.includes(a));

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
    'line-color': '#000000'
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

export default class Mapbox extends Component {
  state = {
    activeVehicles: [],
    routes: null,
    routesInactive: null,
    uniqueHosts: null,

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
      vehiclesPerWeek
    } = nextProps;

    if (cur && cur.length > 0 && vehicleData && vehicleData.length > 0 &&
      !arrayEquals(cur, prev) ) {
        // const vehicles = vehicleData.filter((_, i) => cur.includes(i));
        const vehicles = [];
        const inactiveVehicles = [];

        vehicleData.forEach((v, i) => {
          if (cur.includes(i)) {
            vehicles.push(v);
          } else {
            inactiveVehicles.push(v);
          }
        })

        const routes = {
          type: 'FeatureCollection',
          features: vehicles.map(v => ({
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
          features: inactiveVehicles.map(v => ({
            type: 'Feature',
            geometry: Polyline.toGeoJSON(v.geometry),
            properties: {
              vehicle: v.vehicle,
              day: vehiclesPerDay.findIndex(vpd => vpd.includes(v.vehicle)),
              week: vehiclesPerWeek.findIndex(vpw => vpw.includes(v.vehicle))
            }
          }))
        };

        return {
          activeVehicles: cur,
          routes,
          routesInactive
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
      viewport
    } = this.state;

    const { showAllRoutes } = this.props

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
            {this._renderTooltip()}
        </MapGL>
      </div>
    );
  }
};