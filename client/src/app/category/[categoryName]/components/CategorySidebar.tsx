import React from "react";
import Image from "next/image";
import styles from "@/app/styles/CategorySidebar.module.css";
import PriceSlider from "./PriceSlider";
import CollapsibleList from "./CollapsibleList";
import FormatBox from "./FormatBox";

type Props = {
  children: React.ReactNode;
};

export default function CategorySidebar({ children }: Props) {

  const categoryImageSize = 28;

  return (
    <div id={styles["category-layout"]}>
      <div id={styles["category-sidebar"]}>
        <h1 className={styles["sidebar-h1"]}>Категории</h1>
        <CollapsibleList>
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
        </CollapsibleList>

        <h1 className={styles["sidebar-h1"]}>Цена</h1>
        <PriceSlider />

        <h1 className={styles["sidebar-h1"]}>Функциональность</h1>
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

        <h1 className={styles["sidebar-h2"]}>Рекомендованный материал</h1>
        <div className={styles["checkbox-container"]}>
          {["PLA", "ABS", "PETG", "TPU", "Resin"].map((label) => (
            <label key={label} className={styles["checkbox-subcontainer"]}>
              <input type="checkbox" />
              <span className={styles["checkbox-text"]}>{label}</span>
            </label>
          ))}
        </div>
        <h1 className={styles["sidebar-h2"]}>Форматы</h1>
        <FormatBox/>
      </div>
      <div id={styles["item-container"]}>{children}</div>
    </div>
  );
}
