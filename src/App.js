import "./App.css";
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Guitar from "./components/Guitar";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { Controls, useControl } from "react-three-gui";

//I would like to get the position of the guitar that is wrapped in the TransformControls component when it is dragged
//when I try to console.log the guitar.current.position in a useFrame hook it does not update

function Keen({ props }) {
  const orbit = useRef();
  const transform = useRef();
  const mesh = useRef();
  const mode = useControl("mode", {
    type: "select",
    items: ["scale", "rotate", "translate"],
  });
  useEffect(() => {
    if (transform.current) {
      const controls = transform.current;
      controls.setMode("translate");
      const callback = (event) => (orbit.current.enabled = !event.value);
      controls.addEventListener("dragging-changed", callback);
      return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

  //not sure what to put in here to get the guitars position from the ref
  useFrame(() => {
    console.log(mesh.current.matrix);
  });

  return (
    <>
      <TransformControls ref={transform}>
        <Guitar
          scale={[0.5, 0.5, 0.5]}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
        />
        <mesh ref={mesh}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </TransformControls>
      <OrbitControls ref={orbit} />
    </>
  );
}

function App() {
  return (
    <div className="canvas">
      <Canvas>
        <Keen />
        <ambientLight intensity={0.9} />
      </Canvas>
    </div>
  );
}

export default App;
