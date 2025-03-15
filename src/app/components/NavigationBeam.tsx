import React from 'react'
import Image from "next/image";
import styles from "../styles/NavigationBeam.module.css";

type Props = {}

export default function NavigationBeam({}: Props) {
  return (
    <div id={styles["navbeam"]}>
      <div id={styles["navbeam-textandlogo"]}>
        <Image src="img/trophy.svg" height={32} width={32} alt="" />
        <div>Модели месяца</div>
      </div>
      <Image src="img/arrow_forward_ios.svg" height={28} width={28}  alt="" />
    </div>
  )
}