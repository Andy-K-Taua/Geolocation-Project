// frontend/src/components/MapComponent.jsx

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef, useState } from 'react';
import RouteComponent from './RouteComponent';

const MapComponent = ({ start, end }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: [151.333413, -33.512393],
        zoom: 12,
      });

      map.current.on('load', () => {
        setMapLoaded(true);
      });

      map.current.on('error', (error) => {
        console.error(error);
        setError('Failed to load the map');
      });
    } catch (error) {
      console.error(error);
      setError('Failed to initialize the map');
    }
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '100%', borderRadius: '10px', border: '1px solid #15F4EE' }}
      id="map"
    >
      {mapLoaded && start && end && <RouteComponent start={start} end={end} map={map.current} />}
      {error && <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'red', color: 'white', padding: '10px' }}>{error}</div>}
    </div>
  );
};

export default MapComponent;