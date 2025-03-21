"use client";
import Header from "@/app/components/Header";
import WidthContainer from "@/app/components/WidthContainer";
import React, {useRef, useEffect, useState} from "react";
import styles from "@/app/styles/AccountPage.module.css";
import AccountNavbar from "@/app/account/components/AccountNavbar";
import CategorySwiper from "@/app/account/components/CategorySwiper";
import Image from "next/image";

type Props = {};

export default function Page({}: Props) {
  const [itemsPerView, setItemsPerView] = useState(8);
  const newModelCategorySubcontainer = useRef(null);
  const newModelCategoryH1 = useRef(null)
  const categoryImageSize = 24;

  useEffect(()=>{
    setItemsPerView(
      (newModelCategorySubcontainer.current.offsetHeight-newModelCategoryH1.current.offsetHeight)/40
    )
  }, [])

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
      {/* грид на 4 ячейки, во всех  */}
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
        <div id={styles["new-model-upload-container"]}></div>
        {/* категория|функциональность & рекомендованный материал| формат| */}
        <div id={styles["new-model-category-container"]}>
          <div ref={newModelCategorySubcontainer} className={styles["new-model-category-subcontainer"]}>
            <h1 ref={newModelCategoryH1} className={styles["new-model-category-h1"]}>Категории</h1>
            <CategorySwiper
              swiperDirection={"vertical"}
              spaceBetweenItems={5}
              itemsPerView={itemsPerView}
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
          <div className={styles["new-model-category-subcontainer"]}></div>
          <div className={styles["new-model-category-subcontainer"]}></div>
          <div className={styles["new-model-category-subcontainer"]}></div>
        </div>
        <div id={styles["new-model-price-container"]}></div>
      </div>
    </WidthContainer>
  );
}
