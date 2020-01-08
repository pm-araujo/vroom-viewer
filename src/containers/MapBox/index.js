import React, { Component } from 'react';
import MapGL, { Layer, Source } from 'react-map-gl';

import Polyline from '@mapbox/polyline';

import './style.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const arrayEquals = (a1, a2) => a1.length === a2.length && a1.every(a => a2.includes(a));

const genRandomColor = (randSat, randLit) => {
  const randHue = Math.floor(Math.random() * 360);

  return `hsl(${randHue}, ${randSat}%, ${randLit}%)`;
};

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

export default class Mapbox extends Component {
  state = {
    activeVehicles: [],
    routes: null,

    // Map Config
    mapStyle: {
      version: 8,
      sources: {
        'raster-tiles': {
            type: 'raster',
            tiles: [
              'http://c.tile.osm.org/{z}/{x}/{y}.png'
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

  static getDerivedStateFromProps({ activeVehicles: cur, vehicles: vehicleData }, { activeVehicles: prev }) {
    if (cur && cur.length > 0 && vehicleData && vehicleData.length > 0 &&
      !arrayEquals(cur, prev) ) {
        const vehicles = vehicleData.filter((_, i) => cur.includes(i));
        const randSat = Math.floor(Math.random() * 100);
        const randLit = Math.floor(Math.random() * (80 - 40) + 40);

        const routes = {
          type: 'FeatureCollection',
          features: vehicles.map(v => ({
            type: 'Feature',
            geometry: Polyline.toGeoJSON(v.geometry),
            properties: {
              vehicle: v.vehicle,
              color: genRandomColor(100, 50)
            }
          }))
        };

        return {
          activeVehicles: cur,
          routes
        };
      }

    return null;
  }

  _handleViewportChange = ({ width, height, ...viewport }) => this.setState({ viewport: { ...this.state.viewport, ...viewport } });
  
  render() {
    const { mapStyle, routes, viewport } = this.state;

    return (
      <div id="map">
        <MapGL
          mapStyle={mapStyle}
          height='100%'
          width='100%'
          onViewportChange={this._handleViewportChange}
          {...viewport}>
            <Source id='routes' type='geojson' data={routes}>
              <Layer {...dataLayer} />
            </Source>
        </MapGL>
      </div>
    );
  }
};