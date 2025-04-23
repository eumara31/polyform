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
import Cookies from "js-cookie";

type Props = {
  isLogged: boolean;
};

gsap.registerPlugin(useGSAP);

export default function Header({ isLogged }: Props) {
  const [popupStatus, setPopupStatus] = useState(false);
  const [logoutButton, setLogoutButton] = useState(isLogged);

  const router = useRouter();
  const pathname = usePathname();

  const accountPath = pathname.startsWith("/account");

  function changePopupStatus() {
    setPopupStatus(!popupStatus);
  }

  function handleLogin(){
    setLogoutButton(!logoutButton);
  }

  async function handleLogout() {
    try {
      const res = await api.post("/auth/logout");
      if (res.status >= 200 && res.status < 300) {
        Cookies.remove("logged");
        setLogoutButton(!logoutButton);
        if (accountPath) {
          router.push("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  // const [headerHeight, setHeaderHeight] = useState('')
  // const [lastScrollY, setLastScrollY] = useState(0)
  // const headerRef = useRef(null);
  // const headerUnderlineRef = useRef(null);

  // function changeHeaderHeight(){
  //   if (window.scrollY > lastScrollY) {
  //     setHeaderHeight("0rem");
  //   } else {
  //     setHeaderHeight("2rem");
  //   }

  //   setLastScrollY(window.scrollY);
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', changeHeaderHeight);

  //   return () => {
  //      window.removeEventListener('scroll', changeHeaderHeight);
  //   };
  // }, [lastScrollY]);

  return (
    <>
      <div id={styles["header-container"]}>
        <div id={styles["header"]}>
          <div id={styles["logo"]}>Полиформ</div>
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
          <form id={styles["search-bar"]}>
            placeholder
            <Image
              id={styles["search-img"]}
              src="/img/search.svg"
              width={24}
              height={24}
              alt=""
            />
          </form>
          <div id={styles["change-lang"]}>en</div>
          <Image
            id={styles["dark-mode-img"]}
            src="/img/dark_mode.svg"
            width={32}
            height={32}
            alt=""
          />
        </div>
        <div id={styles["header-underline"]}>
          <div id={styles["header-underline-lsubcontainer"]}>
            <div id={styles["discounts-href"]}>Скидки</div>
            <div id={styles["weekly-items-href"]}>Модели недели</div>
            <div id={styles["best-items-href"]}>Лучшие модели</div>
            <div id={styles["favorites-href"]}>Избранное</div>
          </div>
          <div id={styles["header-underline-itemsfound"]}></div>
          <div>По запросу "" найдено n товаров</div>
          <div id={styles["header-underline-rsubcontainer"]}>
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
        <LoginForm updateLoginButton={handleLogin} updatePopupStatus={changePopupStatus}></LoginForm>
      </PopupOverlay>
    </>
  );
}
