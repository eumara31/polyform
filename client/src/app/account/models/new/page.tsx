import Header from "@/app/components/Header";
import WidthContainer from "@/app/components/WidthContainer";
import React from "react";
import styles from "@/app/styles/AccountPage.module.css";
import AccountNavbar from "@/app/account/components/AccountNavbar";

type Props = {};

export default function page({ }: Props) {
  return (
    <WidthContainer>
      <Header />
      <AccountNavbar
        tabDict={{
          0: { tabName: "Ваши модели", isActive: false, url: "/account/models" },
          1: { tabName: "Добавить модель", isActive: true, url: "/account/models/new" },
          2: { tabName: "Снято с продажи", isActive: false, url: "/account/models/removed" },
        }}
      />
      {/* грид на 4 ячейки, во всех  */}
      <div id={styles["new-model-container"]}>
        <div></div>
        <div id={styles['new-model-upload-container']}></div>
        <div></div>
        <div></div>
      </div>
    </WidthContainer>
  );
}