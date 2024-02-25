import { Canvas } from "@react-three/fiber";
import ShowRoom from "@components/three/ShowRoom";

function Home() {
  return (
    <Canvas>
      {/* <axesHelper args={[5]} />
      <gridHelper /> */}
      <ShowRoom />
    </Canvas>
  );
}

export default Home;
