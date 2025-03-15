import React from "react";
import Image from "next/image";
import styles from "../styles/Item.module.css";

type Props = {};

export default function Item({}: Props) {
  return (
    <div className={styles["item"]}>
      <canvas className={styles["item-canvas"]}></canvas>
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
