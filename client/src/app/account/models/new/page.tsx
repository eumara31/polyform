"use client";
import Header from "@/app/components/Header";
import WidthContainer from "@/app/components/WidthContainer";
import React, { useRef, useEffect, useState } from "react";
import styles from "@/app/styles/AccountPage.module.css";
import AccountNavbar from "@/app/account/components/AccountNavbar";
import CategorySwiper from "@/app/account/components/CategorySwiper";
import ImageSwiper from "@/app/components/ItemSwiper";
import FormatBox from "@/app/category/[categoryName]/components/FormatBox";
import ModelUpload from "./components/ModelUpload";
import ModelPreview from "./components/ModelPreview";
import Image from "next/image";
import { StringController } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { PerspectiveCamera } from "@react-three/drei";
import { e } from "mathjs";

type Props = {};

type ModelJson = {
  name: string;
  description: string;
  category: string;
  tags: string[];
  materials: string[];
  formats: string[];
  price: number | undefined;
  currency: string | undefined;
};

export default function Page({}: Props) {
  const [showModelPreview, setShowModelPreview] = useState(false);
  const [currency, setCurrency] = useState("RUB");
  const [modelURL, setModelURL] = useState(""); //являе
  const [modelFormat, setModelFormat] = useState("");
  const [modelJson, setModelJson] = useState<ModelJson>({
    name: "",
    description: "",
    category: "",
    tags: [],
    materials: [],
    formats: [],
    price: undefined,
    currency: undefined,
  });
  const categoryImageSize = 24;

  useEffect(() => {
    setModelJson((prev) => ({
      ...prev,
      currency: currency
    }))
  }, [])

  useEffect(() => {
    console.log(modelJson);
  }, [modelJson]);

  function isModelJsonComplete(): boolean {
    return (
      modelJson.name.trim() !== "" &&
      modelJson.description.trim() !== "" &&
      modelJson.category.trim() !== "" &&
      modelJson.tags.length > 0 &&
      modelJson.materials.length > 0 &&
      modelJson.formats.length > 0 &&
      modelJson.price !== undefined &&
      modelJson.currency !== undefined
    );
  }

  function handleModelJsonChange(
    field: string,
    value: string | number | string[] | undefined
  ): void {
    setModelJson((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleCheckboxChange(e, field: string) {
    const checkboxValue = e.target.value;

    setModelJson((prev) => {
      const newData = e.target.checked
        ? [...prev[field], checkboxValue]
        : prev[field].filter((val) => val !== checkboxValue);

      return {
        ...prev,
        [field]: newData,
      };
    });
  }

  function handleFormatChange(formatObj: {
    [key: string]: { isActive: boolean };
  }) {
    const formatArr = Object.entries(formatObj).reduce(
      (tmp, [formatName, data]) => {
        if (data.isActive) {
          tmp.push(formatName);
        }
        return tmp;
      },
      [] as string[]
    );
    setModelJson((prev) => ({
      ...prev,
      formats: formatArr,
    }));
  }

  function handleCurrencyChange() {
    setCurrency((prev) => {
      const newCurrency = prev === "RUB" ? "USD" : "RUB";
      handleModelJsonChange("currency", newCurrency);
      return newCurrency;
    });
  }

function handleModelSubmission() {
  if (!isModelJsonComplete() || !modelURL) {
    alert("Заполните все поля");
  }

  else {
    alert("Отправлено");
  }
}

  return (
    <>
      <AccountNavbar
        tabDict={{
          0: { tabName: "Учётная запись", isActive: false, url: "/account" },
          1: {
            tabName: "Ваши модели",
            isActive: false,
            url: "/account/models",
          },
          2: {
            tabName: "Добавить модель",
            isActive: true,
            url: "/account/models/new",
          },
          3: {
            tabName: "Снято с продажи",
            isActive: false,
            url: "/account/models/removed",
          },
        }}
      />
      <div id={styles["new-model-flex"]}>
        <div id={styles["text-category-flex"]}>
          <div id={styles["text-flex"]}>
            <input
              type="text"
              placeholder="Название"
              onChange={(e) =>
                handleModelJsonChange("name", e.target.value.toString())
              }
            ></input>
            <textarea
              placeholder="Описание"
              onChange={(e) =>
                handleModelJsonChange("description", e.target.value.toString())
              }
            ></textarea>
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
                  <div
                    key={text}
                    data-value={text}
                    onClick={(e) =>
                      handleModelJsonChange(
                        "category",
                        e.currentTarget.dataset.value
                      )
                    }
                  >
                    <Image
                      src={`/img/${src}`}
                      height={categoryImageSize}
                      width={categoryImageSize}
                      alt=""
                    />
                    <span>{text}</span>
                  </div>
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
                  <label key={label} className={styles["checkbox-subflex"]}>
                    <input
                      type="checkbox"
                      value={label}
                      onClick={(e) => handleCheckboxChange(e, "tags")}
                    />
                    <span className={styles["checkbox-text"]}>{label}</span>
                  </label>
                ))}
              </div>
              <h1>Материал</h1>
              <div className={styles["checkbox-flex"]}>
                {["PLA", "ABS", "PETG", "TPU", "Resin"].map((label) => (
                  <label key={label} className={styles["checkbox-subflex"]}>
                    <input
                      type="checkbox"
                      value={label}
                      onClick={(e) => handleCheckboxChange(e, "materials")}
                    />
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
                <FormatBox updateFormatArray={handleFormatChange} />
              </div>
              <div className={styles["format-flex"]}>
                <div id={styles["price-currency-container"]}>
                  <input
                    type="number"
                    placeholder="цена"
                    onChange={(e) =>
                      handleModelJsonChange("price", e.target.value.toString())
                    }
                  ></input>
                  <button onClick={handleCurrencyChange}>{currency}</button>
                </div>
                <button onClick={handleModelSubmission}>Добавить</button>
              </div>
            </div>
          </div>
        </div>
        <div id={styles["model-upload-flex"]}>
          <div id={styles["model-input"]}>
            {showModelPreview ? (
              <ModelPreview modelURL={modelURL} modelFormat={modelFormat} />
            ) : (
              <ModelUpload
                setModelURL={setModelURL}
                setModelFormat={setModelFormat}
                setShowModelPreview={setShowModelPreview}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
