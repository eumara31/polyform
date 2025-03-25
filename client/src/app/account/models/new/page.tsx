"use client";
import Header from "@/app/components/Header";
import WidthContainer from "@/app/components/WidthContainer";
import React, { useRef, useEffect, useState } from "react";
import styles from "@/app/styles/AccountPage.module.css";
import AccountNavbar from "@/app/account/components/AccountNavbar";
import CategorySwiper from "@/app/account/components/CategorySwiper";
import ImageSwiper from "@/app/components/ItemSwiper";
import FormatBox from "@/app/category/[categoryName]/components/FormatBox";
import Image from "next/image";

type Props = {};

export default function Page({ }: Props) {
  const categoryImageSize = 24;

  return (
    <WidthContainer>
      <Header />
      <AccountNavbar
        tabDict={{
          0: {
            tabName: "Ваши модели",
            isActive: false,
            url: "/account/models",
          },
          1: {
            tabName: "Добавить модель",
            isActive: true,
            url: "/account/models/new",
          },
          2: {
            tabName: "Снято с продажи",
            isActive: false,
            url: "/account/models/removed",
          },
        }}
      />
      <div id={styles["new-model-flex"]}>
        <div id={styles["text-category-flex"]}>
          <div id={styles["text-flex"]}>
            <input type="text" placeholder="Название"></input>
            <textarea placeholder="Описание"></textarea>
          </div>

          <div id={styles["category-flex"]}>
            <div className={styles["category-column"]}>
              <h1>Категории</h1>
              <CategorySwiper
                swiperDirection={"vertical"}
                spaceBetweenItems={5}
                itemsPerView={8}
                wheelControl={true}
                scrollControl={true}
                keyboardControl={true}
              >
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
                  <>
                    <Image
                      src={`/img/${src}`}
                      height={categoryImageSize}
                      width={categoryImageSize}
                      alt=""
                    />
                    <span>{text}</span>
                  </>
                ))}
              </CategorySwiper>
            </div>
            <div className={styles["category-column"]}>
              <h1>Свойства</h1>
              <div className={styles["checkbox-flex"]}>
                {[
                  "Многосоставная",
                  "Подвижная",
                  "Жёсткая",
                  "Гибкая",
                  "Эластичная",
                ].map((label) => (
                  <label
                    key={label}
                    className={styles["checkbox-subflex"]}
                  >
                    <input type="checkbox" />
                    <span className={styles["checkbox-text"]}>{label}</span>
                  </label>
                ))}
              </div>
              <h1>Материал</h1>
              <div className={styles["checkbox-flex"]}>
                {["PLA", "ABS", "PETG", "TPU", "Resin"].map((label) => (
                  <label
                    key={label}
                    className={styles["checkbox-subflex"]}
                  >
                    <input type="checkbox" />
                    <span className={styles["checkbox-text"]}>{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div
              id={styles["format-price-column"]}
              className={styles["category-column"]}
            >
              <div className={styles["format-flex"]}>
                <h1>Форматы</h1>
                <FormatBox />
              </div>
              <div className={styles["format-flex"]}>
                <input type="text" placeholder="цена"></input>
                <button>Добавить</button>
              </div>
            </div>
          </div>
        </div>
        <div id={styles["model-upload-flex"]}>
          123
        </div>

      </div>
    </WidthContainer>
  );
}
