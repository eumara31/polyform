import Header from "@/app/components/Header";
import WidthContainer from "@/app/components/WidthContainer";
import React from "react";
import styles from "@/app/styles/AccountPage.module.css";
import AccountNavbar from "@/app/account/components/AccountNavbar";

type Props = {};

export default function page({}: Props) {
  return (
    <WidthContainer>
      <Header />
      <AccountNavbar
        tabDict={{
          0: {
            tabName: "Ваши модели",
            isActive: false,
            url: "/account/models",
          },
          1: {
            tabName: "Добавить модель",
            isActive: true,
            url: "/account/models/new",
          },
          2: {
            tabName: "Снято с продажи",
            isActive: false,
            url: "/account/models/removed",
          },
        }}
      />
      {/* грид на 4 ячейки, во всех  */}
      <div id={styles["new-model-container"]}>
        <div id={styles["new-model-text-container"]}>
          <input type="text" id={styles["new-model-name-input"]} placeholder="Название">
          </input>
          <textarea id={styles['new-model-textarea']} placeholder="Описание"></textarea>
        </div>
        <div id={styles["new-model-upload-container"]}></div>
        {/* категория|функциональность & рекомендованный материал| формат| */}
        <div id={styles["new-model-category-container"]}>
          <div className={styles['new-model-category-subcontainer']}>
          <h1 className={styles["new-model-category-h1"]}>Категории</h1>
          </div>
          <div className={styles['new-model-category-subcontainer']}>

          </div>
          <div className={styles['new-model-category-subcontainer']}>

          </div>
          <div className={styles['new-model-category-subcontainer']}>

          </div>
        </div>
        <div id={styles["new-model-price-container"]}></div>
      </div>
    </WidthContainer>
  );
}
