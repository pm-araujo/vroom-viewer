import MapGL, {Marker, Source, Layer} from 'react-map-gl';

const Mapbox = () => {
  const mapOptions = {
    height: '100%',
    width: '100%',
    viewport: {
      latitude: 40,
      longitude: -100,
      zoom: 3,
      bearing: 0,
      pitch: 0
    }
  };
  
  return (
    <div id="map">
      <MapGL {...mapOptions} />
  </div>
  );
};

export default Mapbox;