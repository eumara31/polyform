import React, { useEffect, useState } from "react";
import styles from "../styles/RegisterForm.module.css";
import Image from "next/image";
import PopupOverlay from "./PopupOverlay";
import RegisterForm from "./RegisterForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function LoginForm({ isOpen, onClose, children }: Props) {
  const [formType, setFormType] = useState<"login" | "register" | null>(
    "login"
  );

  function changeFormType(){
    if (formType === 'login'){
      setFormType('register')
    } 
  }

  return (
    <>
      {formType === "login" && (
        <form id={styles["login-form"]}>
          <h1 id={styles["logo"]}>Полиформ</h1>
          <div id={styles["login-container"]}>
            <div id={styles["textinput-container"]}>
              <input type="text" placeholder="E-mail или имя"></input>
              <input type="password" placeholder="Пароль"></input>
            </div>
            <button>Войти</button>
            <p>—————— или ———————</p>
            <button onClick={changeFormType}>Создать аккаунт</button>
            <button id={styles["google-auth-button"]}>
              <Image
                id={styles["google-login-img"]}
                src="../img/google_logo.svg"
                height={24}
                width={24}
                alt=""
              />
              <span>Продолжить</span>
            </button>
          </div>
        </form>
      )}

      {formType === 'register' && (
        <RegisterForm/>
      )}
    </>
  );
}
