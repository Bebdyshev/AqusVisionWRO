// BuoyChart.js
import React, { useContext } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { DataContext } from './../../DataContext';
import { NoBlending } from 'three';

Chart.register(...registerables);

function BuoyChart(props) {
  const label = props.label;
  const dataY = props.dataY;
  const rgb = props.rgb;
  const data = useContext(DataContext);

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
        data: [50, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: 'white',
        pointHoverBackgroundColor: 'white',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
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
      legend: false,
    },
  };

  return (
    <div className="buoy-chart"  style={{ width: "85%", height: "300px"}}>
      <div className="chart-container" style={{ width: "100%", height: "100%"}}>
        <Radar data={completeData} options={options} />
      </div>
    </div>
  );
}

export default BuoyChart;
