import React from 'react'
import styles from "@/app/styles/ProductPage.module.css";

type Props = {}

export default function page({}: Props) {
  return (
    <div id={styles["main-flex"]}>
        <div id={styles["product-flex"]}>
            <canvas id={styles["model-canvas"]}>

            </canvas>
            <div id={styles["product-textblock-flex"]}>
                <div id={styles['name-rating-flex']}>
                    <span id={styles['name']}></span>
                    {/* <>тут будет блок со звёздочками, пока не до конца понял, как их реализовать</> */}
                    <span id={styles['rating-as-number']}></span>
                    <span id={styles['vote-count']}></span>
                </div>
                <div id={styles['author-flex']}>
                    <span></span>
                    <span id={styles['author']}></span>
                </div>
                <div id={styles['description']}>

                </div>
                <div id={styles['attributes-price-flex']}>
                    <div id={styles["attributes"]}></div>
                    <div id={styles["price"]}></div>
                </div>
            </div>
        </div>
        <div id={styles["similar-products-flex"]}>
            {/* тут будет свайпер */}
        </div>
    </div>
  )
}