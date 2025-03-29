import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/RegisterForm.module.css";
import PopupOverlay from "./PopupOverlay";
import api from "../utilities/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function RegisterForm({ isOpen, onClose, children }: Props) {
  const loginRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSignupSubmission(e) {
    e.preventDefault();
    const data = {
      login: loginRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };
    try {
      const res = await api.post("/auth/signup", data);
      console.log(data);
      if (res.status >= 200 && res.status < 300) {
        alert("Регистрация прошла успешно");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form id={styles["login-form"]}>
      <h1 id={styles["logo"]}>Полиформ</h1>
      <div id={styles["textinput-container"]}>
        <input
          ref={loginRef}
          type="text"
          required
          placeholder="Отображаемое имя"
        ></input>
        <input
          ref={emailRef}
          type="email"
          required
          placeholder="E-mail"
        ></input>
        <input
          ref={passwordRef}
          type="password"
          required
          placeholder="Пароль"
        ></input>
      </div>
      <div id={styles["checkbox-container"]}>
        <label className={styles["checkbox-subcontainer"]}>
          <input type="checkbox" required />
          <span className={styles["checkbox-text"]}>
            Регистрируясь, я подтверждаю свое согласие на обработку персональных
            данных в соответствии с политикой конфиденциальности
          </span>
        </label>
        <label className={styles["checkbox-subcontainer"]}>
          <input type="checkbox" required />
          <span className={styles["checkbox-text"]}>
            Я согласен получать новости и обновления на электронную почту
          </span>
        </label>
      </div>
      <button onClick={(e) => handleSignupSubmission(e)}>
        Отправить проверочный код
      </button>
    </form>
  );
}
