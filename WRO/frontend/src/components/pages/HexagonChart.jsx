import React, { useContext } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { DataContext } from './../../DataContext';

Chart.register(...registerables);

function BuoyChart(props) {
  const label = props.label;
  const dataY = props.dataY;
  const data = useContext(DataContext);
  const latestData = data[data.length - 1];

  console.log(latestData);
  
  const completeData = {
    labels: [
      'Air temperature',
      'Soil temperature',
      'Snow depth',
      'Precipitation',
      'Velocity',
      'Water level',
      'Humidity'
    ],
    datasets: [
      {
        label: 'My Dataset',
        data: [
          latestData.airTemperature, 
          latestData.soilTemperature, 
          latestData.snowDepth, 
          latestData.precipitation, 
          latestData.velocity, 
          latestData.waterLevel, 
          latestData.humidity
        ],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: 'white',
        pointHoverBackgroundColor: 'white',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  };

  return (
    <div className="buoy-chart" style={{ width: "100%", height: "300px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 2px 10px 0px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="chart-container" style={{ width: "100%", height: "100%" }}>
        <Radar data={completeData} options={options} />
      </div>
    </div>
  );
}

export default BuoyChart;
