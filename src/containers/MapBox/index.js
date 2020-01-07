import React, { Component } from 'react';
import MapGL, { Source } from 'react-map-gl';

import './style.css';

export default class Mapbox extends Component {
  state = {
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

  _handleViewportChange = ({ width, height, ...viewport }) => this.setState({ viewport: { ...this.state.viewport, ...viewport } });
  
  render() {
    const { mapStyle, viewport } = this.state;

    return (
      <div id="map">
        <MapGL
          mapStyle={mapStyle}
          height='100%'
          width='100%'
          onViewportChange={this._handleViewportChange}
          {...viewport}>
        </MapGL>
      </div>
    );
  }
};