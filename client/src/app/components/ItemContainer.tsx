import React from 'react'
import Image from "next/image";
import styles from "../styles/ItemContainer.module.css";

type Props = {
    children: React.ReactNode;
};

export default function ItemContainer({children}: Props) {
    return (
        <div id={styles["item-container"]}>
            {children}
        </div>
      )
}
