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
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [mailing, setMailing] = useState(false);

  async function handleSignupSubmission(e) {
    e.preventDefault();
    if (login && email && password && privacyPolicy) {
      const data = {
        login: login,
        email: email,
        password: password,
        mailing: mailing ? "true" : "false",
      };
      console.log(data);
      try {
        const res = await api.post("/auth/signup", data);
        if (res.status >= 200 && res.status < 300) {
          alert("Регистрация прошла успешно");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Заполните все поля");
    }
  }

  return (
    <form id={styles["login-form"]}>
      <h1 id={styles["logo"]}>Полиформ</h1>
      <div id={styles["textinput-container"]}>
        <input
          onChange={(e) => setLogin(e.target.value)}
          type="text"
          required
          placeholder="Отображаемое имя"
        ></input>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="E-mail"
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          placeholder="Пароль"
        ></input>
      </div>
      <div id={styles["checkbox-container"]}>
        <label className={styles["checkbox-subcontainer"]}>
          <input type="checkbox" required 
          onChange={(e) => setPrivacyPolicy(e.target.checked)}/>
          <span className={styles["checkbox-text"]}>
            Регистрируясь, я подтверждаю свое согласие на обработку персональных
            данных в соответствии с политикой конфиденциальности
          </span>
        </label>
        <label className={styles["checkbox-subcontainer"]}>
          <input
            type="checkbox"
            onChange={(e) => setMailing(e.target.checked)}
          />
          <span className={styles["checkbox-text"]}>
            Я согласен получать новости и обновления на электронную почту
          </span>
        </label>
      </div>
      <button type="submit" onClick={(e) => handleSignupSubmission(e)}>
        Отправить проверочный код
      </button>
    </form>
  );
}
