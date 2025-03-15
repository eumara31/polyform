'use client'
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from 'three'
import { useLoader, Canvas } from '@react-three/fiber'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'
import { OrbitControls } from '@react-three/drei'
import styles from "../styles/Item.module.css";

type Props = {
  modelName: string;
};

const STLModel = ({ url }: { url: string }) => {
  const geometry = useLoader(STLLoader, url)

  if(geometry){
  console.log('1');
}
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="gray" />
    </mesh>
  )
}

export default function Item({modelName}: Props) {

  return (
    <div className={styles["item"]}>

      <Canvas className={styles["item-canvas"]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <perspectiveCamera position={[0, 0, 5]} />
          <STLModel url='objects\spikeDragon\files\Articulated_DRAGON_V3.stl'/>
        <OrbitControls/>
      </Canvas>

    
      <div className={styles["item-subcontainer"]}>
        <div className={styles["item-name"]}>Название модели</div>
        <div className={styles["item-rating-container"]}>
          <Image src="img/kid_star.svg" height={24} width={24} alt="" />
          <div className={styles["item-rating-number"]}>4.97</div>
        </div>
        <div className={styles["item-attributes-container"]}>
          <Image src="img/excl_licence.svg" height={20} width={40} alt="licence" />
          <Image src="img/has_parts.svg" height={24} width={24} alt="" />
          <Image src="img/moving.svg" height={24} width={24} alt="" />
          <Image src="img/flexible.svg" height={24} width={24} alt="" />
        </div>
        <div className={styles["item-price"]}>799 ₽</div>
      </div>

    </div>
  );
}
