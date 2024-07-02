// BuoyMap.js
import React, { useEffect, useContext, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { DataContext } from './../../DataContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Импорт иконок для маркера Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: `marker-icon-${color}`
  });
};

const iconSet = {
  1: createCustomIcon('red'),
  2: createCustomIcon('blue'),
  3: createCustomIcon('green'),
  4: createCustomIcon('orange'),
  5: createCustomIcon('purple'),
};

function BuoyMap() {
  const data = useContext(DataContext);

  const mapRef = useRef();
  const markersLayerRef = useRef(L.layerGroup());

  function MapEvents() {
    const map = useMap();
    useEffect(() => {
      mapRef.current = map;
      markersLayerRef.current.addTo(map);
    }, [map]);

    return null;
  }

  useEffect(() => {
    if (!mapRef.current) return;

    markersLayerRef.current.clearLayers();

    const latestEntries = {};
    data.forEach(entry => {
      latestEntries[entry.buoy_id] = entry;
    });

    Object.values(latestEntries).forEach(entry => {
      const { buoy_id, latitude, longitude, density, temp, height, ph, pressure, velocity } = entry;
      const markerIcon = iconSet[buoy_id] || iconSet[1];
      const marker = L.marker([latitude, longitude], { icon: markerIcon });
      marker.bindPopup(`
        Buoy #${buoy_id}<br>
        Coordinates: ${latitude}, ${longitude} <br>
        Density: ${density} kg/m<sup>3</sup> <br>
        Temperature: ${temp}  °C<br>
        Height: ${height} m<br> 
        pH: ${ph} <br>
        Pressure: ${pressure} hPa<br> 
        Velocity: ${velocity} m/s
      `);
      markersLayerRef.current.addLayer(marker);
    });

  }, [data]);

  return (
    <div className="buoy-map">
      <MapContainer 
        center={[50.276754, 57.131794]} 
        zoom={16} 
        style={{ height: '90vh', width: '90vh', margin: '12px', borderRadius: '5px' }} 
        whenCreated={mapInstance => { mapRef.current = mapInstance }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
      </MapContainer>
    </div>
  );
}

export default BuoyMap;
