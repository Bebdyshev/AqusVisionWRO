import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

useGLTF.preload('/water/scene.gltf'); 

const WaterModel = React.forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/water/scene.gltf'); 

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
              material-opacity={0.6} 
            />
          );
        }

        return null;
      })}
    </group>
  );
});

export default WaterModel;
