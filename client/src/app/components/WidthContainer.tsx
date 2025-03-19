import React from 'react'
import styles from "../styles/WidthContainer.module.css";

type Props = {
    children: React.ReactNode;
};

export default function WidthContainer({children}: Props) {
  return (
    <div id={styles["main-area-div"]}>
    <div id={styles["main-area_subcontainer"]}>
        {children}
    </div>
    </div>
  )
}