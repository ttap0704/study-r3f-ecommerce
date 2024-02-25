import { Canvas } from "@react-three/fiber";
import ShowRoom from "@components/three/ShowRoom";
import ResponsiveAppBar from "@components/ResponsiveAppBar";
import ColorPicker from "@components/ColorPicker";

function Home() {
  const angle = 0;
  const dis = 2.0;

  return (
    <>
      <ResponsiveAppBar />
      <Canvas
        camera={{
          position: [dis * Math.sin(angle), 0.8, dis * Math.cos(angle)],
        }}
      >
        {/* <axesHelper args={[5]} />
      <gridHelper /> */}
        <color attach={"background"} args={["#b7f2f1"]} />
        <ShowRoom />
      </Canvas>
      <ColorPicker />
    </>
  );
}

export default Home;
