import { Box, OrbitControls, Plane } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
// Correct path for GLTFLoader

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/scene.gltf");
  return <primitive object={gltf.scene} />;
};

const RenderModel = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex ",
      }}
    >
      {/* <VRScene /> */}
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial attach="material" color="lightgrey" />
        </Plane>
        <Box args={[1, 1, 1]} position={[0, 0.5, 0]}>
          <meshStandardMaterial attach="material" color="orange" />
        </Box>
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default RenderModel;
