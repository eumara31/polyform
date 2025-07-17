"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/styles/ProductPage.module.css";
import StarRating from "./components/StarRating";
import Image from "next/image";
import ModelPreview from "@/app/components/ModelPreview";
import api from "@/app/utilities/api";
import ImageSwiper from "@/app/components/ItemSwiper";
import { BarLoader } from "react-spinners";
import Cookies from "js-cookie";

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
  author: string;
  rating: number | null;
  rating_votes: number | null;
};

const availableTags: { [key: string]: { src: string; label: string } } = {
  Многосоставная: {
    src: "/img/multiple_parts_white.svg",
    label: "Многосоставная",
  },
  Жёсткая: {
    src: "/img/solid_white.svg",
    label: "Жёсткая",
  },
  Подвижная: {
    src: "/img/moving_white.svg",
    label: "Подвижная",
  },
  Гибкая: {
    src: "/img/flexible_white.svg",
    label: "Гибкая",
  },
  Эластичная: {
    src: "/img/elastic_white.svg",
    label: "Эластичная",
  },
};

function base64ToBlob(base64: string, type: string): Blob {
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
  return new Blob([array], { type });
}

function remToPixels(rem: number): number {
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return Math.round(rem * rootFontSize);
}

export default function Page({ params }: Props) {
  const [modelJson, setModelJson] = useState<ModelJson>({
    name: "",
    description: "",
    category: "",
    tags: [],
    materials: [],
    licence: "",
    price: undefined,
    currency: undefined,
    author: "",
    rating: null,
    rating_votes: null,
  });
  const [modelURL, setModelURL] = useState<string | null>(null);
  const [modelFormat, setModelFormat] = useState<string | null>(null);
  const [imageURLs, setImageURLs] = useState<string[] | null>(null);
  const [currentPreviewContent, setCurrentPreviewContent] = useState("model");
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(true);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isModelInCart, setIsModelInCart] = useState(false);

  useEffect(() => {
    async function fetchText() {
      try {
        const { productId } = params;
        const text = (await api.get(`/product/${productId}/description`)).data
          .text;
        setModelJson(text);
        setIsDescriptionLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsDescriptionLoading(false);
      }
    }
    fetchText();
  }, []);

  useEffect(() => {
    async function fetchBlobs() {
      try {
        const { productId } = params;
        const b64EncodedBlobs = (await api.get(`/product/${productId}/blobs`))
          .data;
        const { model, images } = b64EncodedBlobs;

        const modelBlob = base64ToBlob(model.data, model.type);
        setModelURL(URL.createObjectURL(modelBlob));
        setModelFormat(model.type);

        const imgUrls = images.map((img) =>
          URL.createObjectURL(base64ToBlob(img.data, img.type))
        );
        setImageURLs(imgUrls);
      } catch (err) {
        console.error(err);
      } finally {
        setIsModelLoading(false);
      }
    }
    fetchBlobs();
  }, []);

  function handlePreviewChange(e: React.MouseEvent<HTMLDivElement>) {
    const img = e.currentTarget.querySelector("img");
    if (img?.src) setCurrentPreviewContent(img.src);
  }

function handleCartChange() {
  setIsModelInCart((prev) => {
    const productId = Number(params.productId); // Явно приводим к числу
    const currentCart = Cookies.get("cart");
    const cartItems = currentCart
      ? currentCart.split(",").map((id) => Number(id))
      : [];

    let updatedCart: number[];
    if (prev) {
      // удаление
      updatedCart = cartItems.filter((id) => id !== productId);
    } else {
      // добавление
      if (!cartItems.includes(productId)) {
        updatedCart = [...cartItems, productId];
      } else {
        updatedCart = cartItems;
      }
    }

    Cookies.set("cart", updatedCart.join(","), { path: "/", expires: 7 });

    return !prev;
  });
}


  return (
    <div id={styles["main-flex"]}>
      <div id={styles["product-flex"]}>
        {isDescriptionLoading ? (
          <div id={styles["loader-container"]}>
            <BarLoader color={"#363537"} loading={isDescriptionLoading} />
          </div>
        ) : (
          <>
            <div id={styles["preview-flex"]}>
              {isModelLoading ? (
                <div id={styles["loader-container"]}>
                  <BarLoader color={"#363537"} loading={isModelLoading} />
                </div>
              ) : (
                <>
                  {currentPreviewContent === "model" ? (
                    <div id={styles["canv"]}>
                      <ModelPreview modelURL={modelURL} modelFormat={"stl"} />
                    </div>
                  ) : (
                    <div id={styles["image-preview"]}>
                      <img src={currentPreviewContent} alt="preview" />
                    </div>
                  )}
                  <div id={styles["images"]}>
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
                      <div
                        id={styles["model-preview-button"]}
                        onClick={() => setCurrentPreviewContent("model")}
                      >
                        <img src="/img/add_model.svg" width={24} height={24} />
                        <span>Показать модель</span>
                      </div>

                      {imageURLs &&
                        imageURLs.map((url, index) => (
                          <div
                            key={index}
                            className={styles["item-preview-button"]}
                            onClick={handlePreviewChange}
                          >
                            <img src={url} alt={`preview-${index}`} />
                          </div>
                        ))}
                    </ImageSwiper>
                  </div>
                </>
              )}
            </div>
            <div id={styles["product-textblock-flex"]}>
              <div id={styles["name-rating-flex"]}>
                <span id={styles["name"]}>{modelJson.name}</span>
                <div id={styles["rating-vote"]}>
                  {modelJson.rating != null &&
                  modelJson.rating_votes != null ? (
                    <>
                      <div id={styles["rating"]}>
                        <StarRating rating={modelJson.rating} />
                        <span id={styles["rating-number"]}>
                          {modelJson.rating.toFixed(1)},
                        </span>
                      </div>
                      <span id={styles["vote-count"]}>
                        {modelJson.rating_votes} голосов
                      </span>
                    </>
                  ) : (
                    <span id={styles["vote-count"]}>нет голосов</span>
                  )}
                </div>
              </div>
              <div id={styles["description"]}>{modelJson.description}</div>
              <div id={styles["attributes-price-flex"]}>
                <div id={styles["attributes"]}>
                  {modelJson.tags
                    .filter((tag) => availableTags.hasOwnProperty(tag))
                    .map((tag) => (
                      <div key={tag} className={styles["attribute"]}>
                        <Image
                          src={availableTags[tag].src}
                          alt=""
                          width={32}
                          height={32}
                        />
                        <span>{availableTags[tag].label}</span>
                      </div>
                    ))}
                  <div id={styles["materials"]}>
                    Рек. материалы: {modelJson.materials.join(", ")}
                  </div>
                  <div id={styles["license"]}>
                    Лицензия: {modelJson.licence}
                  </div>
                  <div id={styles["author"]}>Автор: {modelJson.author}</div>
                </div>
                <div id={styles["price-button-flex"]}>
                  <div id={styles["price"]}>
                    {modelJson.price
                      ? `${modelJson.price} ${modelJson.currency ?? ""}`
                      : "Бесплатно"}
                  </div>
                  <button id={styles["add-to-cart"]} onClick={handleCartChange}>
                    {isModelInCart
                      ? "Удалить из корзины"
                      : "Добавить в корзину"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div id={styles["similar-products-flex"]}>{/* тут будет свайпер */}</div>
    </div>
  );
}
