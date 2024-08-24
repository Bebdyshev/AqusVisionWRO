import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

useGLTF.preload('/buoy/buoy.glb'); 

const WaterModel = React.forwardRef((props, ref) => {

  const { nodes, materials } = useGLTF('/buoy/buoy.glb'); 

  return (
    <group ref={ref} {...props} dispose={null}>
      {Object.entries(nodes).map(([name, node]) => {
        if (node.geometry && node.material) {
          return (
            <mesh
              key={name}
              geometry={node.geometry}
              material={node.material}
              material-transparent
            />
          );
        }

        return null;
      })}
    </group>
  );
});

export default WaterModel;
