import React from 'react';
import BuoyChart from './BuoyChart';
import BuoyMap from './Map';
import './Statistics.css'; 

function Statistics() {
  return (
    <div className="statistics-container">
      <div className="map-container">
        <BuoyMap />
      </div>
      <div className="charts-container">
        <BuoyChart label="Density" dataY="density" rgb="rgba(75, 192, 192, 1)" />
        <BuoyChart label="Temperature" dataY="temp" rgb="rgba(255, 99, 132, 1)" />
        <BuoyChart label="Height" dataY="height" rgb="rgba(54, 162, 235, 1)" />
        <BuoyChart label="pH" dataY="ph" rgb="rgba(153, 102, 255, 1)" />
        <BuoyChart label="Pressure" dataY="pressure" rgb="rgba(255, 206, 86, 1)" />
        <BuoyChart label="Velocity" dataY="velocity" rgb="rgb(40, 167, 69)" />
      </div>
    </div>
  );
}

export default Statistics;
