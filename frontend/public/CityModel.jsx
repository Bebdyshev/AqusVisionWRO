import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

useGLTF.preload('/city/scene.glb'); // Preload the model

const CityModel = React.forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/city/scene.glb'); // Adjust the path as necessary

  return (
    <group ref={ref} {...props} dispose={null}>
      {Object.entries(nodes).map(([name, node]) => {
        // Check if the node is a mesh
        if (node.geometry && node.material) {
          return (
            <mesh
              key={name}
              geometry={node.geometry}
              material={node.material}
            />
          );
        }
        // Handle other types of nodes if necessary
        return null;
      })}
    </group>
  );
});

export default CityModel;
