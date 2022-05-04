import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
function Model(props) {
  const { gltf } = useGLTF(props.modelURL);
  const modelRef = useRef();

  return <primitive object={gltf} ref={modelRef} {...props} />;
}

export default Model;
