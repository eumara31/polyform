"use client"
import React, {useState} from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from "next/image";
import styles from "../styles/Header.module.css";
import PopupOverlay from "./PopupOverlay";
import LoginForm from "./LoginForm";
import Head from 'next/head';

type Props = {};

gsap.registerPlugin(useGSAP);

export default function Header({}: Props) {
  const [popupStatus, setPopupStatus] = useState(false);

  function changePopupStatus(){
    setPopupStatus(!popupStatus)
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
              <div id={styles["login-href"]} 
              onClick={changePopupStatus}>
                <Image
                  id={styles["login-image"]}
                  src="/img/login.svg"
                  width={24}
                  height={24}
                  alt=""
                />
                <div>Войти</div>
              </div>
            </div>
          </div>
        </div>
        <PopupOverlay isOpen={popupStatus}>
          <LoginForm></LoginForm>
        </PopupOverlay>
    </>
  );
}
