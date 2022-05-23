import "./App.css";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Guitar from "./components/Guitar";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { Controls, useControl } from "react-three-gui";

function Keen({ props }) {
  const orbit = useRef();
  const transform = useRef();
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
  return (
    <>
      <TransformControls
        ref={transform}
        onChange={(e) => {
          console.log(e);
        }}
      >
        <Guitar
          scale={[0.5, 0.5, 0.5]}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
        />
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
