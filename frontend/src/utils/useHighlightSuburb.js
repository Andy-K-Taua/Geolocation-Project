// frontend/src/utils/useHighlightSuburb.js

import { useEffect } from 'react';

const useHighlightSuburb = (map, suburbs, suburbToHighlight) => {
  const geojson = {
    type: 'FeatureCollection',
    features: suburbs.map((suburb) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [151.0, -33.0], // Default coordinates, replace with actual values
      },
      properties: {
        name: suburb.place_name,
        postcode: suburb.postcode,
        state: suburb.state_name,
      },
    })),
  };

  useEffect(() => {
    if (!map.current) return;

    const addLayers = () => {
      map.current.addSource('suburbs', {
        type: 'geojson',
        data: geojson,
      });

      map.current.addLayer({
        id: 'suburbs-layer',
        type: 'circle',
        source: 'suburbs',
        paint: {
          'circle-color': 'rgba(200, 100, 240, 0.4)',
          'circle-stroke-color': 'rgba(200, 100, 240, 1)',
        },
      });

      if (suburbToHighlight) {
        map.current.addLayer({
          id: 'highlighted-suburb-layer',
          type: 'circle',
          source: 'suburbs',
          filter: ['==', 'name', suburbToHighlight],
          paint: {
            'circle-color': 'rgba(255, 0, 0, 0.7)',
            'circle-stroke-color': 'rgba(255, 0, 0, 1)',
          },
        });
      }
    };

    if (map.current.loaded()) {
      addLayers();
    } else {
      map.current.on('load', addLayers);
    }

    return () => {
      if (map.current) {
        map.current.off('load', addLayers);
      }
    };
  }, [map, suburbs, suburbToHighlight]);
};

export default useHighlightSuburb;
