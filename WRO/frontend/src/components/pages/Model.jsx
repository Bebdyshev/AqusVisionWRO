import React, { useState, useEffect, useContext } from 'react';
import Model3D from './Model3D';
import Model33D from './Model33D';
import { DataContext } from './../../DataContext';
import './Model.css'; // Подключаем CSS для стилизации
import AIChart from './AIChart';
import HexagonChart from './HexagonChart';

function Model() {
  const data = useContext(DataContext);
  const [latestHeight, setLatestHeight] = useState(null);
  const [yaw, setYaw] = useState(null);
  const [pitch, setPitch] = useState(null);
  const [roll, setRoll] = useState(null);
  const [velocity, setVelocity] = useState(null);
  const [predictedData, setPredictData] = useState([]);
  const [actualData, setActualData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchPredictionData = (date) => {
    fetch(`http://127.0.0.1:5000/predict?date=${date}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setPredictData(data.predict);
        setActualData(data.actual);
        setDateData(data.dates);
      })
      .catch(error => console.error('Error fetching data:', error));
  };
  
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchPredictionData(date);
  };
  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    fetchPredictionData(today);
  }, []);

  useEffect(() => {
    const lastData = data[data.length - 1];
    const lastHeight = lastData ? lastData.height : null;
    setLatestHeight(lastHeight);

    const yaw = lastData ? lastData.yaw : null;
    setYaw(yaw);

    const roll = lastData ? lastData.roll : null;
    setRoll(roll);

    const pitch = lastData ? lastData.pitch : null;
    setPitch(pitch);

    const velocity = lastData ? lastData.velocity : null;
    setVelocity(velocity);
  }, [data]);

  return (
    <div className="main-container">
      <div className="left-container">
        <Model3D latestHeight={latestHeight} />
      </div>
      <div className='modelContainer'>
        <input className='inputDate' type="date" value={selectedDate} onChange={handleDateChange} />
        <div className='AIcccchaart'>
        <AIChart 
            dataActual={actualData} 
            dataPredicted={predictedData} 
            dataDate={dateData} 
            width="80%" 
            height="500px" 
        />
        </div>
      </div>
      <div className='right-container'>
        <Model33D latestHeight={latestHeight} velocity={velocity} yaw={yaw} />
        <div className="buoyDescription">
          Velocity: {velocity} mps 
          Pitch: {pitch}° 
          Roll: {roll}° 
          Yaw: {yaw}°
        </div>
        <div className='hexagonChart'>
          <HexagonChart/>
        </div>
      </div>
    </div>
  );
}

export default Model;
