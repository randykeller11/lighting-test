import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
function Model(state, ...props) {
  const { scene } = useGLTF(storeTarget.url);
  const modelRef = useRef();

  return <primitive object={scene} ref={modelRef} {...props} />;
}

export default Model;
