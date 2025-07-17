"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import PopupOverlay from "./PopupOverlay";
import LoginForm from "./LoginForm";
import api from "../utilities/api";
import { useRouter, usePathname } from "next/navigation";
import SearchInput from "./SearchInput";
import Link from "next/link";

type Props = {
  isLogged: boolean;
  usernameProp: string;
  emailProp: string;
};

gsap.registerPlugin(useGSAP);

export default function Header({ isLogged, usernameProp, emailProp }: Props) {
  const [popupStatus, setPopupStatus] = useState(false);
  const [logoutButton, setLogoutButton] = useState(isLogged);
  const [username, setUsername] = useState(usernameProp);
  const [email, setEmail] = useState(emailProp);

  const categoryImageSize = 24;

  const router = useRouter();
  const pathname = usePathname();

  const accountPath = pathname.startsWith("/account");

  function changePopupStatus() {
    setPopupStatus(!popupStatus);
  }

  function handleLogin(username: string, email: string) {
    setLogoutButton(!logoutButton);
    setUsername(username);
    setEmail(email);
  }

  async function handleLogout() {
    try {
      const res = await api.post("/auth/logout");
      if (res.status >= 200 && res.status < 300) {
        setLogoutButton(!logoutButton);
        setUsername("");
        setEmail("");
        if (accountPath) {
          router.push("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div id={styles["header-container"]}>
        <div id={styles["header"]}>
        <div id={styles["logo"]}><Link className={styles["no-outline"]} href={'/'}>Полиформ</Link></div>
          <div id={styles["category-dropdown"]}>
            <Link href="/search">
          <button id={styles["header-category-button"]}>
            <Image
              id={styles["header-category-img"]}
              src="/img/dashboard_customize.svg"
              width={24}
              height={24}
              alt=""
            />
            Категории
          </button>
          </Link>
          <ul id={styles["dropdown-list"]}>
                      {[
                        { src: "person.svg", text: "Персонажи" },
                        { src: "cottage.svg", text: "Архитектура" },
                        { src: "car.svg", text: "Транспорт" },
                        { src: "bow.svg", text: "Оружие" },
                        { src: "park.svg", text: "Растения" },
                        { src: "chair.svg", text: "Мебель" },
                        { src: "devices.svg", text: "Технологии" },
                        { src: "apparel.svg", text: "Аксессуары" },
                        { src: "manufacturing.svg", text: "Механизмы" },
                        { src: "service_toolbox.svg", text: "Инструменты" },
                        { src: "shield.svg", text: "Фэнтези" },
                        { src: "experiment.svg", text: "Наука" },
                        { src: "fitness_center.svg", text: "Спорт" },
                        { src: "cruelty_free.svg", text: "Животные" },
                        { src: "brush.svg", text: "Художество" },
                        { src: "headphones.svg", text: "Музыка" },
                      ].map(({ src, text }) => (
                        <li key={text}>
                          <Image
                            src={`../img/${src}`}
                            height={categoryImageSize}
                            width={categoryImageSize}
                            alt=""
                          />
                          <span>{text}</span>
                        </li>
                      ))}
          </ul>
          </div>
          <SearchInput/>
          {logoutButton ? (
            <div id={styles["right-header-container"]}>
              <Link href={'/account'}><Image src="/img/account_box.svg" alt="" width={32} height={32} /></Link>
              <Link href={'/cart'}><Image src="/img/local_mall.svg" alt="" width={32} height={32} /></Link>
            </div>
          ) : (
            <>
              <div id={styles["change-lang"]}>en</div>
              <Image
                id={styles["dark-mode-img"]}
                src="/img/dark_mode.svg"
                width={32}
                height={32}
                alt=""
              />
            </>
          )}
        </div>
        <div id={styles["header-underline"]}>
          <div id={styles["header-underline-lsubcontainer"]}>
            <div id={styles["discounts-href"]}>Скидки</div>
            <div id={styles["weekly-items-href"]}>Модели недели</div>
            <div id={styles["best-items-href"]}>Лучшие модели</div>
            <div id={styles["favorites-href"]}>Избранное</div>
          </div>
          <div id={styles["header-underline-itemsfound"]}></div>
          <div></div>
          <div id={styles["header-underline-rsubcontainer"]}>
            {logoutButton ? (
              <>
                <div id={styles["change-lang"]}>en</div>
                <Image
                  id={styles["dark-mode-img"]}
                  src="/img/dark_mode.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </>
            ) : null}
            {username ? <div id={styles["username"]}>{username}</div> : null}
            <div id={styles["login-href"]}>
              <Image
                id={styles["login-image"]}
                src="/img/login.svg"
                width={24}
                height={24}
                alt=""
              />
              {logoutButton ? (
                <div onClick={handleLogout}>Выйти</div>
              ) : (
                <div onClick={changePopupStatus}>Войти</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <PopupOverlay isOpen={popupStatus}>
        <LoginForm
          updateHeaderStatus={handleLogin}
          updatePopupStatus={changePopupStatus}
        ></LoginForm>
      </PopupOverlay>
    </>
  );
}
