"use client"
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { PLYLoader } from "three/addons/loaders/PLYLoader.js";
import { AMFLoader } from "three/addons/loaders/AMFLoader.js";
import { ThreeMFLoader } from "three/addons/loaders/3MFLoader.js";
import styles from "@/app/styles/AccountPage.module.css";

type Props = {
  modelURL: string;
  modelFormat: string;
};

export default function ModelPreview({ modelURL, modelFormat }: Props) {
  console.log(modelFormat);
  let loader;
  switch (modelFormat) {
    case "stl":
      loader = STLLoader;
      break;
    case "obj":
      loader = OBJLoader;
      break;
    case "fbx":
      loader = FBXLoader;
      break;
    case "amf":
      loader = AMFLoader;
      break;
    case "3mf":
      loader = ThreeMFLoader;
      break;
    case "ply":
      loader = PLYLoader;
      break;
    case "gcode":
    case "step":
    case "iges":
      console.warn(
        `Loader for .${modelFormat} is not available in Three.js by default`
      );
      loader = null; // Эти форматы требуют кастомных решений
      break;
    default:
      console.error(`Unsupported format: ${modelFormat}`);
      loader = null;
  }

  function Model() {
    const loadedModel = useLoader(loader, modelURL);

    if (loader === STLLoader || loader === PLYLoader) {
      return (
        <mesh geometry={loadedModel}>
          <meshStandardMaterial/>
        </mesh>
      );
    }

    return <primitive object={loadedModel.scene ? loadedModel.scene : loadedModel} />;
  }
  
  return (
    <div id={styles["canvas-flex"]}>
      <Canvas id={styles["model-canvas"]}>
        <Model/>
        <ambientLight intensity={1} />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
        />
        <directionalLight
            castShadow
            intensity={Math.PI * 2}/>
      </Canvas>
      </div>
  );
}
