import React from "react";
import './Home.css'
function Home() {
  return(
    <div className="allfather">
      <div className="homepage">
        <h1 align="center" style={{"margin": "15px"}}>
          Welcome to the <span style={{"color": "#0750FF"}}>River Monitoring and Flood Prediction System!</span>
        </h1>
        <div className="water-buoy">
          <img src="../../../public/images/water.png"/>
          <p className="text"> 
          <strong style={{"color": "#FF8400"}}> Aqua Vision </strong> - это Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem provident tempora temporibus qui cum quam at quasi expedita vitae quod rem minima saepe odio, numquam deleniti unde, nam eaque aliquam.
          </p>
        </div>
        <div className="ground-buoy">
          <p className="text">
          <strong style={{"color": "#FF8400"}}> Наземная станция </strong> - это Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi possimus unde debitis, consectetur placeat porro quibusdam esse alias sapiente, labore repudiandae autem. Eveniet sint quia minima quod eos provident voluptatem?
          </p>
          <img src="../../../public/images/ground.png"/>
        </div>
      </div>


    </div>
  );
}

export default Home