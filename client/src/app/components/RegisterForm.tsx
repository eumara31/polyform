import React, { useEffect, useState } from "react";
import styles from "../styles/RegisterForm.module.css";
import PopupOverlay from "./PopupOverlay";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function RegisterForm({ isOpen, onClose, children }: Props) {
  return (
    <form id={styles["login-form"]}>
      <h1 id={styles["logo"]}>Полиформ</h1>
      <div id={styles["textinput-container"]}>
        <input type="text" placeholder="Отображаемое имя"></input>
        <input type="email" placeholder="E-mail"></input>
        <input type="password" placeholder="Пароль"></input>
      </div>
      <div id={styles["checkbox-container"]}>
        <label className={styles["checkbox-subcontainer"]}>
          <input type="checkbox" />
          <span className={styles["checkbox-text"]}>
            Регистрируясь, я подтверждаю свое согласие на обработку персональных
            данных в соответствии с политикой конфиденциальности
          </span>
        </label>
        <label className={styles["checkbox-subcontainer"]}>
          <input type="checkbox" />
          <span className={styles["checkbox-text"]}>
            Я согласен получать новости и обновления на электронную почту
          </span>
        </label>
      </div>
      <button>Отправить проверочный код</button>
    </form>
  );
}
