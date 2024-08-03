import React, { useRef, forwardRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import BuoyModel from './../../../public/BuoyModel';
import WaterModel from './../../../public/WaterModel';

const RotatingWaterModel = forwardRef((props, ref) => {
  useFrame(() => {
    if (ref.current) {
      const lerpSpeed = 0.05; 
      const velocity = props.props.velocity / 30;
      const adjustedWaterPosition = props.waterPos;

      if (props.props.yaw > 0) {
        ref.current.position.z -= velocity;
      } else {
        ref.current.position.z += velocity;
      }

      if (ref.current.position.z >= 200 || ref.current.position.z <= -200) {
        ref.current.position.z = 10; 
      }

      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, adjustedWaterPosition[0], lerpSpeed);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, adjustedWaterPosition[1], lerpSpeed);
    }
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.renderOrder = 2; 
    }
  }, [ref]);

  return <WaterModel ref={ref} {...props} />;
});

const RotatingBuoyModel = forwardRef((props, ref) => {
  useFrame(() => {
    if (ref.current) {
      const yawFactor = props.props.yaw / 300;
      const heightAdjustment = props.props.latestHeight / 100 + props.props.yaw / 100; 

      const lerpSpeed = 0.05;

      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, 3 * Math.PI / 2 - yawFactor, lerpSpeed);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, 13.7 + heightAdjustment, lerpSpeed);
      ref.current.position.x = 10;
      ref.current.position.z = 10;
    }
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.renderOrder = 1; 
    }
  }, [ref]);

  return <BuoyModel ref={ref} {...props} />;
});

function Model33D(props) {
  const buoyModelRef = useRef();
  const waterModelRef = useRef();

  const scaleWaterModel = [1000, 1000, 10];
  const adjustedBuoyPosition = [10, 15 + props.latestHeight / 100, 10]; 
  const adjustedWaterPosition = [10, props.latestHeight / 100, 10];

  useEffect(() => {
    if (buoyModelRef.current) {
      buoyModelRef.current.renderOrder = 1; 
    }
  }, [buoyModelRef]);

  return (
    <div style={{ width: '360px', height: '225px', margin: '7px', boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[-10, 20, 10]} intensity={1} />
        <PerspectiveCamera makeDefault position={[-10, 17, 9]} rotation={[0, 0, 0]} zoom={1} />
        <OrbitControls target={[10, 15, 10]} enableZoom={false} enablePan={false} enableRotate={false} />

        <group>
          <RotatingBuoyModel ref={buoyModelRef} props={props} buoyPos={adjustedBuoyPosition} rotation={[0, Math.PI / 2, 3 * Math.PI / 2]} scale={[0.8, 0.8, 0.8]} />
          <RotatingWaterModel ref={waterModelRef} props={props} waterPos={adjustedWaterPosition} rotation={[3 * Math.PI / 2, 0, 3 * Math.PI / 2]} scale={scaleWaterModel} />
        </group>
      </Canvas>
    </div>
  );
}

export default Model33D;
