"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/AccountPage.module.css";
import AccountNavbar from "@/app/account/components/AccountNavbar";
import CategorySwiper from "@/app/account/components/CategorySwiper";
import ImageSwiper from "@/app/components/ItemSwiper";
import LicenceBox from "@/app/category/[categoryName]/components/LicenceBox";
import ModelUpload from "./components/ModelUpload";
import ModelPreview from "./components/ModelPreview";
import Image from "next/image";
import toast from "react-hot-toast";
import api from "@/app/utilities/api";
import { CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH } from "next/dist/shared/lib/constants";

type Props = {};

type ModelJson = {
  name: string;
  description: string;
  category: string;
  tags: string[];
  materials: string[];
  licence: string;
  price: number | undefined;
  currency: string | undefined;
  images: string[] | undefined;
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
    licence: "",
    price: undefined,
    currency: undefined,
    images: [],
  });
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [imageBinaryMap, setImageBinaryMap] = useState<Map<number, string>>(
    new Map<number, string>()
  );

  const categoryImageSize = 24;
  function remToPixels(rem: number): number {
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    return Math.round(rem * rootFontSize);
  }

  useEffect(() => {
    setModelJson((prev) => ({
      ...prev,
      currency: currency,
    }));
  }, []);

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
      modelJson.licence.trim() !== "" &&
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

  function handleLicenceChange(selectedLicence: string | null) {
    setModelJson((prev) => ({
      ...prev,
      licence: selectedLicence,
    }));
  }
  function handleCurrencyChange() {
    setCurrency((prev) => {
      const newCurrency = prev === "RUB" ? "USD" : "RUB";
      handleModelJsonChange("currency", newCurrency);
      return newCurrency;
    });
  }

  async function handleModelSubmission() {
    if (!isModelJsonComplete() || !modelURL) {
      toast.error("Заполните все поля");
    } else {
      const uploadPendingToast = toast.loading("Модель загружается...");
      try {
        const formData = new FormData();
        formData.append("json", JSON.stringify(modelJson));
        formData.append("model", modelFile);
        Array.from(imageBinaryMap.values()).forEach((file) => {
          formData.append("images", file);
        });

        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }

        await api.post("/account/model/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        });
        toast.success("Файл загружен!", { id: uploadPendingToast });
      } catch (err) {
        toast.error("Ошибка загрузки", { id: uploadPendingToast });
        console.log(err);
      }
    }
  }

  function handleImageUpload(e) {
    const image = e.target.files?.[0];
    if (image) {
      setImageBinaryMap((prev) => new Map(prev).set(image.name, image));
    }
  }

  useEffect(() => {
    setModelJson((prev) => {
      return {
        ...prev,
        images: Array.from(imageBinaryMap.keys()),
      };
    });
  }, [imageBinaryMap]);

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
                <h1>Лицензия</h1>
                <LicenceBox updateLicence={handleLicenceChange} />
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
          {showModelPreview ? (
            <ModelPreview modelURL={modelURL} modelFormat={modelFormat} />
          ) : (
            <ModelUpload
              setModelURL={setModelURL}
              setModelFormat={setModelFormat}
              setShowModelPreview={setShowModelPreview}
              setModelFile={setModelFile}
            />
          )}
          <div id={styles["model-photo-swiper-container"]}>
            <ImageSwiper
              swiperId={"model-photo-swiper"}
              swiperSlideClass={"model-photo-slide-class"}
              swiperDirection={"horizontal"}
              spaceBetweenItems={remToPixels(1)}
              itemsPerView={3}
              wheelControl={true}
              scrollControl={true}
              keyboardControl={true}
            >
              <div className={styles["add-photo"]}>
                <input
                  type="file"
                  id="image-upload"
                  multiple={false}
                  className={styles["hidden-input"]}
                  onChange={handleImageUpload}
                />

                <label htmlFor="image-upload">
                  <p style={{ fontSize: "48px" }}>+</p>
                  <p>добавить изображение</p>
                </label>
              </div>
              {Array.from(imageBinaryMap.entries()).map(([name, blob]) => {
                const url = URL.createObjectURL(blob);
                return <img key={name} src={url} alt={name} />;
              })}
            </ImageSwiper>
          </div>
        </div>
      </div>
    </>
  );
}
