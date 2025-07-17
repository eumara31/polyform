import React from "react";
import AccountNavbar from "../components/AccountNavbar";

type Props = {};

export default function page({}: Props) {
  return (
      <AccountNavbar
        tabDict={{
          0: { tabName: "Учётная запись", isActive: false, url: "/account" },
          1: { tabName: "Ваши модели", isActive: true, url: "/account/models" },
          2: { tabName: "Добавить модель", isActive: false, url: "/account/models/new" },
          3: { tabName: "Снято с продажи", isActive: false, url: "/account/models/removed" },
        }}
      />
  );
}
