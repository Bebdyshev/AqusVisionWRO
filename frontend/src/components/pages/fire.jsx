import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { polygonStages } from "./data";

const FireApp = () => {
  const [mapCenter, setMapCenter] = useState([49.12, 82.55]); // Центр карты
  const [currentStep, setCurrentStep] = useState(0); // Текущий этап анимации
  const [fillOpacity, setFillOpacity] = useState(0.8); // Прозрачность полигона

  const totalSteps = polygonStages.length; // Total number of stages

  // Управляем шагами анимации
  useEffect(() => {
    if (currentStep < totalSteps) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => 
          prevStep < totalSteps - 1 ? prevStep + 1 : 0 // Сброс к первому шагу
        );
      }, 700); // 700ms between each step
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Calculate the progress percentage
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div>
      <MapContainer
        center={mapCenter}
        zoom={11}
        style={{ width: "100%", height: "100vh" }}
      >
        <TileLayer
          url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />

        {/* Отображаем все полигоны до текущего этапа */}
        {polygonStages.slice(0, currentStep + 1).map((polygon, index) => {
          // Determine the fill color based on the step index
          let fillColor = "#808080"; // Default to gray
          if (index === currentStep) {
            fillColor = "#FFA07A"; // Last polygon is bright orange
          } else if (index === currentStep - 1) {
            fillColor = "#FF8C00"; // Second last polygon is slightly orange
          }

          return (
            <Polygon
              key={index}
              positions={polygon}
              pathOptions={{
                color: fillColor, // Color of the polygon border
                opacity: 0,
                fillColor: fillColor, // Color of the polygon's fill
                fillOpacity: fillOpacity, // Transparency of the polygon
              }}
            />
          );
        })}
      </MapContainer>

      {/* Progress Bar */}
      <div
        className="progress-bar-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px", // Высота области под прогресс-бар
        }}
      > 
        <div className="progress-bar-container">
        <span style={{backgroundColor: "transparent", position: 'absolute', left: "10px", top: "2px", color: "white"}}>01:00</span>
        <span style={{backgroundColor: "transparent",  position: 'absolute', right: "10px", top: "2px", color: "black"}}>13:00</span>
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="input-container">
        <label htmlFor="lat">Latitude: </label>
        <input
          type="text"
          id="lat"
          value={mapCenter[0]}
          onChange={(e) => setMapCenter([parseFloat(e.target.value), mapCenter[1]])}
        />
        <label htmlFor="lng"
          style={{marginLeft: "10px"}}
          >Longitude:</label>
        <input
          type="text"
          id="lng"
          value={mapCenter[1]}
          onChange={(e) => setMapCenter([mapCenter[0], parseFloat(e.target.value)])}
        />
      </div>
    </div>
  );
};

export default FireApp;
