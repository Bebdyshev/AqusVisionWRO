import React, { useState, useEffect, useContext } from 'react';
import Model3D from './Model3D';
import Model33D from './Model33D';
import { DataContext } from './../../DataContext';
import './Model.css'; // Подключаем CSS для стилизации

function Model() {
  const data = useContext(DataContext);
  const [latestHeight, setLatestHeight] = useState(null);
  const [yaw, setYaw] = useState(null);
  const [velocity, setVelocity] = useState(null);
  const [predictedData, setPredictData] = useState([]);
  const [actualData, setActualData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const lastData = data[data.length - 1];
    const lastHeight = lastData ? lastData.height : null;
    setLatestHeight(lastHeight);

    const yaw = lastData ? lastData.yaw : null;
    setYaw(yaw);

    const velocity = lastData ? lastData.velocity : null;
    setVelocity(velocity);
  }, [data]);

  const fetchPredictionData = (date) => {
    fetch(`http://127.0.0.1:5000/predict?date=${date}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setPredictData(data.predict);
        setActualData(data.actual);
        setDateData(data.date);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchPredictionData(date);
  };

  return (
    <div className="main-container">
      <div className="left-container">
      </div>
      <div className='modelContainer'>
        <Model3D latestHeight={latestHeight} />
      </div>
      <div className='right-container'>
        <Model33D latestHeight={latestHeight} velocity={velocity} yaw={yaw} />
        <input 
          type="date" 
          value={selectedDate} 
          onChange={handleDateChange} 
        />
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolores sint, ea soluta quo molestias architecto aliquid fugit fugiat explicabo placeat nesciunt repudiandae perspiciatis, non nam dicta debitis vero eius.
        </span>
      </div>
    </div>
  );
}

export default Model;
