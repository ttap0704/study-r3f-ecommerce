import { useLoader } from "@react-three/fiber";
// import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/Addons.js";

function ShowRoom() {
  const obj = useLoader(OBJLoader, "./models/custom.obj");

  return (
    <primitive object={obj} /> // .obj 파일

    // <mesh
    //   rotation={[THREE.MathUtils.degToRad(45), THREE.MathUtils.degToRad(45), 0]}
    // >
    //   <boxGeometry />
    //   <meshStandardMaterial />
    // </mesh>
  );
}

export default ShowRoom;
