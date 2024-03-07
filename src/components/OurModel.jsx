import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, Stage } from "@react-three/drei";

function Model(props) {
  const { scene } = useGLTF("./bitcoin.glb");
  return <primitive object={scene} {...props} />;
}

const Ourmodel = () => {
  return (
    <div>
      <Canvas
        drp={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{ position: "absolute", top: "8%" }}
      >
        <ambientLight intensity={-1} />
        <PresentationControls
          speed={2}
          global
          zoom={0.5}
          polar={[-0.1, Math.PI / 4]}
        >
          <Stage environment={null}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default Ourmodel;
