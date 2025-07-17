"use client";
import React, { useEffect } from "react";
import styles from "@/app/styles/CategorySidebar.module.css";
import PriceSlider from "./PriceSlider";
import CollapsibleList from "./CollapsibleList";
import MultipleToggleGroup from "./MultipleToggleGroup";
import { useSearchStore } from "@/app/store";
import { shallow } from 'zustand/shallow';

type Props = {
  children: React.ReactNode;
};

export default function CategorySidebar({ children }: Props) {
  const categoryImageSize = 28;

const categories = useSearchStore(state => state.categories);
const features = useSearchStore(state => state.features);
const materials = useSearchStore(state => state.materials);
const licenses = useSearchStore(state => state.licenses);
const minPrice = useSearchStore(state => state.minPrice);
const maxPrice = useSearchStore(state => state.maxPrice);

const setCategories = useSearchStore(state => state.setCategories);
const setFeatures = useSearchStore(state => state.setFeatures);
const setMaterials = useSearchStore(state => state.setMaterials);
const setLicenses = useSearchStore(state => state.setLicenses);
const setMinPrice = useSearchStore(state => state.setMinPrice);
const setMaxPrice = useSearchStore(state => state.setMaxPrice);


  const toggleArrayItem = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const handleFeatureToggle = (label: string) => {
    setFeatures(toggleArrayItem(features, label));
  };

  const handleMaterialToggle = (label: string) => {
    setMaterials(toggleArrayItem(materials, label));
  };

  const handleLicencesUpdate = (license: string) => {
    setLicenses(license);
  };

  useEffect(() => {
    console.log({
      features,
      materials,
      licenses,
    });
  }, [features, materials, licenses]);

  return (
    <div id={styles["category-layout"]}>
      <div id={styles["category-sidebar"]}>
        <h1 className={styles["sidebar-h1"]}>Категории</h1>
        <CollapsibleList
          elements={[
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
          ]}
          imageSize={30}
        />

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
              <input
                type="checkbox"
                checked={features.includes(label)}
                onChange={() => handleFeatureToggle(label)}
              />
              <span className={styles["checkbox-text"]}>{label}</span>
            </label>
          ))}
        </div>

        <h1 className={styles["sidebar-h2"]}>Рекомендованный материал</h1>
        <div className={styles["checkbox-container"]}>
          {["PLA", "ABS", "PETG", "TPU", "Resin"].map((label) => (
            <label key={label} className={styles["checkbox-subcontainer"]}>
              <input
                type="checkbox"
                checked={materials.includes(label)}
                onChange={() => handleMaterialToggle(label)}
              />
              <span className={styles["checkbox-text"]}>{label}</span>
            </label>
          ))}
        </div>

        <h1 className={styles["sidebar-h2"]}>Лицензии</h1>
        <MultipleToggleGroup
          onGroupSelect={handleLicencesUpdate}
          items={[
            "MIT",
            "GPL",
            "Apache",
            "BSD",
            "LGPL",
            "MPL",
            "EPL",
            "Unlicense",
          ]}
        />
      </div>

      <div id={styles["item-container"]}>{children}</div>
    </div>
  );
}
