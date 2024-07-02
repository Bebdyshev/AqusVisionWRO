// DataContext.js
import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://127.0.0.1:5000/data') // Замените на ваш эндпоинт
        .then(response => response.json())
        .then(data => {
          setData(data.data);
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); // Обновлять данные каждые 10 секунд

    return () => clearInterval(intervalId);
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
