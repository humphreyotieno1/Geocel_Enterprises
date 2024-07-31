import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxMap = () => {
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmFudGFhYSIsImEiOiJjbHlwb2prZjcwZWwxMmpzZzExMjh3Zmw5In0.NQhfMPOPWY079uptmf2RcA';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [34.288779954119484, 0.053662688257464695], // Updated coordinates
      zoom: 9
    });

    map.addControl(new mapboxgl.NavigationControl());

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainerRef} style={{ height: '200px', width: '100%' }}></div>;
};

export default MapboxMap;
