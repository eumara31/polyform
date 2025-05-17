"use client";
import Header from "@/app/components/Header";
import WidthContainer from "@/app/components/WidthContainer";
import React, { useRef, useEffect, useState } from "react";
import styles from "@/app/styles/AccountPage.module.css";
import AccountNavbar from "@/app/account/components/AccountNavbar";
import CategorySwiper from "@/app/account/components/CategorySwiper";
import ImageSwiper from "@/app/components/ItemSwiper";
import FormatBox from "@/app/search/components/FormatBox";
import Image from "next/image";

type Props = {};

export default function Page({}: Props) {
  const [itemsPerView, setItemsPerView] = useState(8);
  const newModelCategorySubcontainer = useRef(null);
  const newModelCategoryH1 = useRef(null);
  const categoryImageSize = 24;

  useEffect(() => {
    setItemsPerView(
      (newModelCategorySubcontainer.current.offsetHeight -
        newModelCategoryH1.current.offsetHeight) /
        40
    );
  }, []);

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
      <div id={styles["new-model-container"]}>
        <div id={styles["new-model-text-container"]}>
          <input
            type="text"
            id={styles["new-model-name-input"]}
            placeholder="Название"
          ></input>
          <textarea
            id={styles["new-model-textarea"]}
            placeholder="Описание"
          ></textarea>
        </div>
        <div id={styles["new-model-category-container"]}>
          <div
            ref={newModelCategorySubcontainer}
            className={styles["new-model-category-subcontainer"]}
          >
            <h1
              ref={newModelCategoryH1}
              className={styles["new-model-category-h1"]}
            >
              Категории
            </h1>
            
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
          <div className={styles["new-model-category-subcontainer"]}>
            <h1
              ref={newModelCategoryH1}
              className={styles["new-model-category-h1"]}
            >
              Свойства
            </h1>
            <div className={styles["checkbox-container"]}>
              {[
                "Многосоставная",
                "Подвижная",
                "Жёсткая",
                "Гибкая",
                "Эластичная",
              ].map((label) => (
                <label key={label} className={styles["checkbox-subcontainer"]}>
                  <input type="checkbox" />
                  <span className={styles["checkbox-text"]}>{label}</span>
                </label>
              ))}
            </div>
            <h1
              ref={newModelCategoryH1}
              className={styles["new-model-category-h1"]}
            >
              Материал
            </h1>
            <div className={styles["checkbox-container"]}>
              {["PLA", "ABS", "PETG", "TPU", "Resin"].map((label) => (
                <label key={label} className={styles["checkbox-subcontainer"]}>
                  <input type="checkbox" />
                  <span className={styles["checkbox-text"]}>{label}</span>
                </label>
              ))}
            </div>
          </div>
          <div
            id={styles["format-price"]}
            className={styles["new-model-category-subcontainer"]}
          >
            <div className={styles["new-model-category-subcontainer-l2"]}>
              <h1 className={styles["new-model-category-h1"]}>Форматы</h1>
              <FormatBox />
            </div>
            <div className={styles["new-model-category-subcontainer-l2"]}>
              <input type="text" placeholder="цена"></input>
              <button>Добавить</button>
            </div>
          </div>
        </div>
        <div id={styles["new-model-upload-container"]}>
          <div id={styles["new-model-upload-subcontainer"]}>
            <input id="model-upload" type="file"></input>
            <label htmlFor="model-upload" id={styles["custom-model-upload"]}>
              <div
                style={{
                  fontSize: "48px",
                }}
              >
                <Image src="/img/add_model.svg" width={32} height={32} alt="" />
              </div>
              <div>загрузить модель</div>
            </label>
          </div>
        </div>
        <div></div>
      </div>
    </WidthContainer>
  );
}
