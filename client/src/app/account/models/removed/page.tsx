import Header from "@/app/components/Header";
import WidthContainer from "@/app/components/WidthContainer";
import React from "react";
import styles from "@/app/styles/AccountPage.module.css";
import AccountNavbar from "@/app/account/components/AccountNavbar";

type Props = {};

export default function page({}: Props) {
  return (
      <AccountNavbar
          tabDict={{
            0: { tabName: "Учётная запись", isActive: false, url: "/account" },
            1: { tabName: "Ваши модели", isActive: false, url: "/account/models" },
            2: { tabName: "Добавить модель", isActive: false, url: "/account/models/new" },
            3: { tabName: "Снято с продажи", isActive: true, url: "/account/models/removed" },
          }}
        />
  );
}
