import React from 'react'
import Image from "next/image";
import styles from "../styles/NavigationBeam.module.css";

type Props = {
  name: string;
  logo: string;
}

export default function NavigationBeam({name, logo}: Props) {
  return (
    <div id={styles["navbeam"]}>
      <div id={styles["navbeam-textandlogo"]}>
        <Image src={'img/' + logo} height={32} width={32} alt="" />
        <div>{name}</div>
      </div>
      <Image src="img/arrow_forward_ios.svg" height={28} width={28}  alt="" />
    </div>
  )
}