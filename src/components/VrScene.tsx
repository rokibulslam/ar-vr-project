import { Environment, Html, OrbitControls, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { XR, createXRStore, useXR } from "@react-three/xr";
import { useRef, useState } from "react";

const store = createXRStore();

const InteractiveBox = ({ position }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { selectStart, selectEnd } = useXR();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        scale={clicked ? 1.5 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        onSelectStart={selectStart}
        onSelectEnd={selectEnd}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
      <Html position={[position[0], position[1] + 1.5, position[2]]}>
        <div className="bg-black text-white p-2 rounded">
          {clicked ? "Box is enlarged!" : "Click me!"}
        </div>
      </Html>
    </group>
  );
};

const UIOverlay = () => (
  <div className="fixed top-0 left-0 p-4 bg-black/50 text-white">
    <h2>VR Scene Controls</h2>
    <ul>
      <li>Click boxes to scale them</li>
      <li>Hover to change color</li>
      <li>Use orbit controls to move camera</li>
    </ul>
  </div>
);

const VRScene = () => {
  return (
    <div style={{}}>
      {/* <UIOverlay /> */}
      <Canvas>
        <XR store={store}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />

          <InteractiveBox position={[-2, 0, 0]} />
          <InteractiveBox position={[2, 0, 0]} />

          <Text position={[0, 2, 0]} fontSize={0.5} color="red">
            Welcome to VR Scene!
          </Text>

          <Environment preset="park" />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#303030" />
          </mesh>
        </XR>
      </Canvas>
    </div>
  );
};

export default VRScene;
