// BuoyChart.js
import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { DataContext } from './../../DataContext';

Chart.register(...registerables);

function BuoyChart(props) {
  const label = props.label;
  const dataY = props.dataY;
  const rgb = props.rgb;
  const data = useContext(DataContext);

  const limitedData = data.slice(-30);

  const chartData = [
    {
      label: label,
      data: limitedData.map(entry => ({
        x: new Date(entry.time),
        y: entry[dataY]
      })),
      borderColor: rgb,
      borderWidth: 1,
      fill: false,
    }
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="buoy-chart">
      {chartData.map((chart, index) => (
        <div key={index} className="chart-container">
          <Line data={{ datasets: [chart] }} options={options} />
        </div>
      ))}
    </div>
  );
}

export default BuoyChart;
