"use client"
import React, {use, useEffect, useRef, useState} from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from "next/image";
import styles from "../styles/Header.module.css";

type Props = {};

gsap.registerPlugin(useGSAP);

export default function Header({}: Props) {
  const headerRef = useRef(null);
  const headerUnderlineRef = useRef(null);

  // useEffect(() => {
  //   let lastScrollTop = 0;
  //   window.addEventListener("scroll", ()=>{
  //     let currentScroll = window.scrollY || document.documentElement.scrollTop;

  //     if (currentScroll > lastScrollTop) {
  //       console.log('down')
  //       gsap.to(headerRef.current, {
  //         height: "30%", // Используем "auto" для полной высоты
  //         duration: 0.1, // Длительность анимации
  //         ease: "power2.inOut", // Функция плавности
  //        });
  //     } else if (currentScroll < lastScrollTop) {
  //       console.log('down')
  //       gsap.to(headerRef.current, {
  //         height: "70%", // Используем "auto" для полной высоты
  //         duration: 0.1, // Длительность анимации
  //         ease: "power2.inOut", // Функция плавности
  //        });
  //     }
    
  //     lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  //   })
  // }, [])

  return (
    <>
        <div id={styles["header-container"]}>
          <div id={styles["header"]}
          ref={headerRef}>
            <div id={styles["logo"]}>Полиформ</div>
            <button id={styles["header-category-button"]}>
              <Image
                id={styles["header-category-img"]}
                src="../img/dashboard_customize.svg"
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
                src="../img/search.svg"
                width={24}
                height={24}
                alt=""
              />
            </form>
            <div id={styles["change-lang"]}>en</div>
            <Image
              id={styles["dark-mode-img"]}
              src="../img/dark_mode.svg"
              width={32}
              height={32}
              alt=""
            />
          </div>
          <div id={styles["header-underline"]}
          ref={headerUnderlineRef}>
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
                  src="../img/login.svg"
                  width={24}
                  height={24}
                  alt=""
                />
                <div>Войти</div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
