import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import './BuoyChart.css';

Chart.register(...registerables);

function AIChart({ dataActual = [], dataPredicted = [], dataDate = [], width = '100%', height = '400px' }) {
    const dataLength = Math.min(dataActual.length, dataPredicted.length, dataDate.length);

    if (dataActual.length === 0) {
        return <p>No data available</p>;
    }

    const chartData = [
        {
            label: 'Actual Data',
            data: dataActual.slice(0, dataLength).map((value, index) => ({
                x: new Date(dataDate[index]),
                y: value,
            })),
            borderColor: 'blue',
            borderWidth: 1,
            fill: false,
        },
        {
            label: 'Predicted Data',
            data: dataPredicted.slice(0, dataLength).map((value, index) => ({
                x: new Date(dataDate[index]),
                y: value,
            })),
            borderColor: 'red',
            borderWidth: 1,
            fill: false,
        }
    ];

    const options = {
        responsive: true, // Устанавливает график как адаптивный
        maintainAspectRatio: false, // Позволяет изменять размеры контейнера
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
                title: {
                    display: true,
                    text: 'Days',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Water Level, m',
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
        <div className="buoy-chart" style={{ width: "93%", height: "500px"}}>
            <div className="chart-container" style={{ width: "100%", height: "100%"}}>
                <Line data={{ datasets: chartData }} options={options} />
            </div>
        </div>
    );    
}

export default AIChart;
