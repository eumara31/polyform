import React, { useEffect, useState } from "react";
import styles from "../styles/RegisterForm.module.css";
import Image from "next/image";
import RegisterForm from "./RegisterForm";
import api from "../utilities/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  updateHeaderStatus: (a: string, b: string) => void;
  updatePopupStatus: () => void;
};

export default function LoginForm({ isOpen, onClose, children, updateHeaderStatus, updatePopupStatus }: Props) {
  const [formType, setFormType] = useState<"login" | "register" | null>(
    "login"
  );
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function changeFormType() {
    if (formType === "login") {
      setFormType("register");
    }
  }

  async function handleLoginSubmission(e){
    e.preventDefault();
    const data = {
      login: login,
      password: password,
    }
    try {
      const res = await api.post('/auth/login', data);
      if (res.status >= 200 && res.status < 300) {
        updatePopupStatus();
        const res = await api.get("/account/info/asCookies");
        const {login, email} = res.data;
        updateHeaderStatus(login, email);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {formType === "login" && (
        <form id={styles["login-form"]}>
          <h1 id={styles["logo"]}>Полиформ</h1>
          <div id={styles["login-container"]}>
            <div id={styles["textinput-container"]}>
              <input
                type="text"
                placeholder="E-mail или имя"
                onChange={(e) => setLogin(e.target.value)}
              ></input>
              <input
                type="password"
                placeholder="Пароль"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button
            onClick={(e) => handleLoginSubmission(e)}
            >Войти</button>
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

      {formType === "register" && <RegisterForm />}
    </>
  );
}
