import React from "react";
import './Home.css';

function Home() {
  return (
    <div className="allfather">
      <div className="homepage">
        <h1 align="center" style={{ margin: "15px" }}>
          Welcome to the <span style={{ color: "#0750FF" }}>River Monitoring and Flood Prediction System!</span>
        </h1>
        <div className="water-buoy">
          <img src="../../../public/images/water.png" alt="Aqua Vision"/>
          <p className="text">
            <strong style={{ color: "#FF8400" }}>Aqua Vision</strong> — это автономное устройство, которое плавно движется по реке, используя энергию встроенного гидрогенератора. Благодаря своим датчикам температуры, pH и давления, Aqua Vision постоянно измеряет уровень воды, температуру, кислотность, скорость и передает эти данные на сервер с помощью радиосигналов. Это обеспечивает непрерывный мониторинг состояния реки в режиме реального времени.
          </p>
        </div>
        <div className="ground-buoy">
          <p className="text">
            <strong style={{ color: "#FF8400" }}>Наземная станция</strong> — это высокотехнологичное устройство, установленное на берегу реки, которое собирает данные о температуре почвы, влажности воздуха и количестве осадков. Эти данные играют ключевую роль в прогнозировании наводнений и помогают оперативно реагировать на изменения окружающей среды.
          </p>
          <img src="../../../public/images/ground.png" alt="Наземная станция"/>
        </div>
      </div>
    </div>
  );
}

export default Home;
