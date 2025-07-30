// frontend/src/components/RouteComponent.jsx

import React, { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import polyline from '@mapbox/polyline';


const RouteComponent = ({ start, end, map }) => {
  const [route, setRoute] = useState(null);
  const [error, setErrorState] = useState(null);

  const getRoute = async () => {
    if (!start || !end || start.length !== 2 || end.length !== 2) return;

    console.log('Start lon:', start[0]);
    console.log('Start lat:', start[1]);
    console.log('End lon:', end[0]);
    console.log('End lat:', end[1]);

    try {
      const response = await fetch(`http://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const routeGeometry = polyline.toGeoJSON(data.routes[0].geometry);
        console.log('Route Geometry:', routeGeometry);
        setRoute(routeGeometry);
        setErrorState(null);
      } else {
        setRoute(null);
        setErrorState('No route found between the given points');
      }
    } catch (error) {
      console.error(error);
      setRoute(null);
      setErrorState('Failed to calculate the route');
    }
  };

  useEffect(() => {
    getRoute();
  }, [start, end]);

  useEffect(() => {
    if (route && map) {
      console.log('Adding route to map:', route);
      try {
        if (map.getSource('route')) {
          map.removeLayer('route');
          map.removeSource('route');
        }
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: route,
              },
            ],
          },
        });
        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#007bff',
            'line-width': 5,
          },
        });

        const coordinates = route.coordinates;
        const bounds = coordinates.reduce((bounds, coord) => {
          return [
            [Math.min(bounds[0][0], coord[0]), Math.min(bounds[0][1], coord[1])],
            [Math.max(bounds[1][0], coord[0]), Math.max(bounds[1][1], coord[1])],
          ];
        }, [[Infinity, Infinity], [-Infinity, -Infinity]]);

        map.fitBounds(bounds, {
          padding: 20,
          duration: 2500, // adjusting the motion of the zoom
        });
        
      } catch (error) {
        console.error(error);
        setErrorState('Failed to add the route to the map');
      }
    }
    return () => {
      if (map) {
        if (map.getSource('route')) {
          map.removeLayer('route');
          map.removeSource('route');
        }
      }
    };
  }, [route, map, start, end]);

  return (
    <div>
      {error && <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'red', color: 'white', padding: '10px' }}>{error}</div>}
    </div>
  );
};

export default RouteComponent;