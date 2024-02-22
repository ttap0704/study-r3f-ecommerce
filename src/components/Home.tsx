import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ShowRoom from "@components/three/ShowRoom";

function Home() {
  return (
    <Canvas>
      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper />
      <directionalLight position={[3, 3, 3]} />
      <ShowRoom />
    </Canvas>
  );
}

export default Home;
