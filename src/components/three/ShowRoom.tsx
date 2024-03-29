import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { CameraControls, ContactShadows } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { selectedColorState, selectedMeshState } from "@src/atoms/Atoms";
import Constants from "@src/Constants";

function ShowRoom() {
  const { raycaster, scene } = useThree();
  const glb = useLoader(GLTFLoader, "./models/custom.glb");
  const cameraControlsRef = useRef<CameraControls>(null);
  // const [isFitting, setIsFitting] = useState(false);
  const [selectedColor] = useRecoilState(selectedColorState);
  const [selectedMesh, setSelectedMesh] = useRecoilState(selectedMeshState);

  useEffect(() => {
    // cameraControlsRef.current!.addEventListener("control", () => {
    //   setIsFitting(true);
    // });
    // cameraControlsRef.current!.addEventListener("sleep", () => {
    //   setIsFitting(false);
    // });
    //test
  });

  useEffect(() => {
    glb.scene.traverse((item: any) => {
      if (item.name === "Vamp_Left") {
        const itemMaterial = item.material as THREE.MeshStandardMaterial;
        const cloneMaterial = itemMaterial.clone();
        item.material = cloneMaterial;
        setSelectedMesh(item.name);
      }
    });
  }, [glb.scene]);

  useEffect(() => {
    if (selectedMesh) {
      const obj = scene.getObjectByName(selectedMesh) as THREE.Mesh;
      const material = obj.material as THREE.MeshStandardMaterial;
      material.color = new THREE.Color(
        Constants.COLOR_ARRAY[selectedColor].color
      );
    }
  }, [selectedColor]);

  // let angle = 0;
  // const dis = 2.0;
  useFrame(() => {
    // if (!isFitting) {
    //   cameraControlsRef.current!.setPosition(
    //     dis * Math.sin(angle),
    //     0.8,
    //     dis * Math.cos(angle),
    //     true
    //   );
    //   angle += 0.01;
    // }

    const right = glb.scene.children[0];
    const left = glb.scene.children[1];

    right.rotation.y = THREE.MathUtils.degToRad(10);
    left.rotation.y = THREE.MathUtils.degToRad(335);
    left.rotation.z = THREE.MathUtils.degToRad(-30);
    left.position.x = -0.25;
    left.position.z = 0.37;
    left.position.y = 0.44;
  });

  function shoesClick() {
    const intersects = raycaster.intersectObjects(glb.scene.children, true);
    if (intersects.length) {
      const firstObject = intersects[0].object as THREE.Mesh;
      const firstMaterial = firstObject.material as THREE.MeshStandardMaterial;

      const cloneMaterial = firstMaterial.clone();
      // cloneMaterial.color = new THREE.Color(
      //   Constants.COLOR_ARRAY[selectedColor].color
      // );
      cloneMaterial.emissive = new THREE.Color("#B7F2F1");
      setTimeout(() => {
        cloneMaterial.emissive = new THREE.Color("black");
      }, 500);
      firstObject.material = cloneMaterial;

      cameraControlsRef.current!.fitToBox(firstObject, true);
      setSelectedMesh(firstObject.name);
    }
  }

  return (
    <>
      <directionalLight position={[3, 3, 3]} />
      <pointLight position={[0, 1, 0]} intensity={3} />
      <CameraControls
        ref={cameraControlsRef}
        dollyToCursor={true}
        enabled={true}
        minDistance={1}
        maxDistance={2}
      />

      <mesh position={[0, -0.51, 0]} scale={5}>
        <cylinderGeometry args={[0.4, 0.2, 0.2, 50]} />
        <meshStandardMaterial />
      </mesh>
      <primitive object={glb.scene} onClick={shoesClick} />
      <ContactShadows
        position={[0, 0, 0]}
        scale={5}
        color={"#000000"}
        resolution={512}
        opacity={0.8}
        blur={0.5}
      />
    </>
  );
}

export default ShowRoom;
