import React from "react";
import styles from "@/app/styles/ProductPage.module.css";
import StarRating from "./components/StarRating";

type Props = {};

export default function page({}: Props) {
  return (
    <div id={styles["main-flex"]}>
      <div id={styles["product-flex"]}>
        <canvas id={styles["model-canvas"]}></canvas>
        <div id={styles["product-textblock-flex"]}>
          <div id={styles["name-rating-flex"]}>
            <span id={styles["name"]}>Lorem</span>
            <div id={styles["rating-vote"]}>
              <div id={styles["rating"]}>
                <StarRating rating={4.4} />
                <span id={styles["rating-number"]}>4.4,</span>
              </div>
              <span id={styles["vote-count"]}>1898 голосов</span>
            </div>
          </div>
          {/* <div id={styles["author-flex"]}>
          </div> */}
          <div id={styles["description"]}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius,
            numquam sequi similique libero sed exercitationem quis nisi
            aspernatur? Error ipsa totam ipsam deleniti eum repudiandae possimus
            maxime, sapiente nihil dolor!
          </div>
          <div id={styles["attributes-price-flex"]}>
            <div id={styles["attributes"]}></div>
            {/* <div id={styles["price"]}>599 руб</div> */}
          </div>
        </div>
      </div>
      <div id={styles["similar-products-flex"]}>{/* тут будет свайпер */}</div>
    </div>
  );
}
