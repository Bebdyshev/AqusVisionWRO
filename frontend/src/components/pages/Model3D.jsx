import React, { useRef, forwardRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three'; 

import CityModel from './../../../public/CityModel';
import WaterModel from './../../../public/WaterModel';

const RotatingCityModel = forwardRef((props, ref) => {
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.008; 
    }
  });

  return <CityModel ref={ref} {...props} />;
});

const RotatingWaterModel = forwardRef((props, ref) => {
  useFrame(() => {
    if (ref.current) {
      const lerpSpeed = 0.025;
      ref.current.rotation.z += 0.008; 

      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, props.pos[1], lerpSpeed);
      ref.current.position.x = props.pos[0];
      ref.current.position.z = props.pos[2];
    }
  });

  return <WaterModel ref={ref} {...props} />;
});

function Model3D(props) {
  const cityModelRef = useRef();
  const waterModelRef = useRef();

  const scaleCityModel = [0.1, 0.1, 0.1]; 
  const scaleWaterModel = [14.2, 12.8, props.latestHeight / 100]; 

  const adjustedCityPosition = [-100, -5, 50];
  const adjustedWaterPosition = [-100, -2 + props.latestHeight / 100, 50]; 

  return (
    <div style={{ width: '360px', height: '300px', backgroundColor: "white", margin: "7px", borderRadius: "5px",  boxShadow: "rgba(100, 100, 111, 0.2) 0px 2px 10px 0px"}}>
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[-50, -100, -100]} intensity={1} />
        <PerspectiveCamera makeDefault position={[-100, 20, -10]} rotation={[0, 0, 0]} zoom={1.5} />
        <OrbitControls target={[-100, 0, 50]} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} enableRotate={false} />

        <group>
          <RotatingCityModel ref={cityModelRef} position={adjustedCityPosition} rotation={[3 * Math.PI / 2, 0, 3 * Math.PI / 2]} scale={scaleCityModel} />
          <RotatingWaterModel ref={waterModelRef} pos={adjustedWaterPosition} src={"./water/scene.gltf"} rotation={[3 * Math.PI / 2, 0, 3 * Math.PI / 2]} scale={scaleWaterModel} />
        </group>
      </Canvas>
    </div>
  );
}

export default Model3D;
