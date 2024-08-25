import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

function HexagonChart() {
  const [dataGround, setDataGround] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // Для отображения ошибок

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groundResponse, buoyResponse] = await Promise.all([
          fetch('https://aquavision-wttc.onrender.com/data_ground'),
          fetch('https://aquavision-wttc.onrender.com/data')
        ]);

        if (!groundResponse.ok || !buoyResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const groundData = await groundResponse.json();
        const buoyData = await buoyResponse.json();

        setDataGround(groundData.data);
        setData(buoyData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const latestData = data[data.length - 1] || {};
  const latestGroundData = dataGround[dataGround.length - 1] || {};

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
          latestGroundData.airTemperature || 0,
          latestGroundData.soilTemperature || 0,
          latestGroundData.snowDepth || 0,
          latestGroundData.precipitation || 0,
          latestData.velocity || 0,
          latestData.height || 0,
          latestGroundData.humidity || 0
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

  if (error) {
    return <div>Error: {error}</div>; // Отображаем ошибку
  }

  return (
    <div className="buoy-chart" style={{ width: "360px", height: "370px", borderRadius: "5px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 2px 10px 0px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="chart-container" style={{ width: "100%", height: "100%" }}>
        <Radar data={completeData} options={options} />
      </div>
    </div>
  );
}

export default HexagonChart;
