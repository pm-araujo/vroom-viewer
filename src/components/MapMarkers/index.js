import React, { memo } from 'react';
import { Marker } from 'react-map-gl';
import chroma from 'chroma-js';

const COLOR_INACTIVE = '#000000';
const COLOR_DEPOT = '#FF0000';

const MARKER_SIZE = 20;
const MARKER_ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const MapMarkers = (props) => {
  const {
    data,
    type,
    
    clickHandler,
    hoverHandler
  } = props;

  return data.map(({ color, host, latitude, longitude, order }, idx) => {

    const markerStyles = {
      cursor: 'pointer',
      fill: color || (type === 'depot' && COLOR_DEPOT) || COLOR_INACTIVE,
      fontSize: '12px',
      textAnchor: 'middle',
      strokeWidth: 1,
      strokeLinejoin: 'round',
      transform: `translate(${-MARKER_SIZE / 2}px,${-MARKER_SIZE}px)`
    };
    markerStyles.stroke = markerStyles.fill === COLOR_INACTIVE ? 'white' : 'black';
  
    const textColor = chroma(markerStyles.fill).luminance() > 0.6 ? '#000' : '#fff';

    return (
      <Marker key={`marker-${type}-${host || idx}`}
        longitude={longitude}
        latitude={latitude}>

        <svg style={{...markerStyles}}
          height={MARKER_SIZE}
          viewBox={`0 0 ${MARKER_SIZE + 4} ${MARKER_SIZE + 4}`}
          onClick={type !== 'depot' ? (() => clickHandler({ type, id: host })) : null}>

          <path d={MARKER_ICON} />
          <text x='50%' y='50%' stroke={textColor}>
            { type === 'depot' ? 'D' : order}
          </text>
        </svg>

      </Marker>
    );
  });
}

const arePropsEqual = (prev, cur) => {
  const { prevData, prevType } = prev;
  const { curData, curType } = cur;

  return (
    prev && cur
    && prevData && curData
    && prevType === curType
    && prevData.length === curData.length
  );
}

export default memo(MapMarkers, arePropsEqual);