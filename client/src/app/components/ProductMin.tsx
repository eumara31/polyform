"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/ProductMin.module.css";
import api from "@/app/utilities/api";
import Link from "next/link";
import { SquareLoader } from "react-spinners";


type Props = {
  productId: number;
};

type ProductDescription = {
  text: {
    name: string;
    description: string;
    tags: string[];
    price: number;
    materials: string[];
    currency: string;
    category: string;
    licence: string;
    rating: number;
    rating_votes: number;
    author: string;
  };
};

type ProductImages = {
  images: Array<{
    data: string;
    name: string;
    type: string;
  }>;
};

const availableTags: { [key: string]: { src: string; label: string } } = {
  Многосоставная: {
    src: "/img/multiple_parts.svg",
    label: "Многосоставная",
  },
  Жёсткая: {
    src: "/img/solid.svg",
    label: "Жёсткая",
  },
  Подвижная: {
    src: "/img/moving.svg",
    label: "Подвижная",
  },
  Гибкая: {
    src: "/img/flexible.svg",
    label: "Гибкая",
  },
  Эластичная: {
    src: "/img/elastic.svg",
    label: "Эластичная",
  },
};

export default function Item({ productId }: Props) {
  const [description, setDescription] = useState<ProductDescription | null>(null);
  const [images, setImages] = useState<ProductImages | null>(null);

  useEffect(() => {
    async function fetchDescription() {
      try {
        const res = await api.get(`/product/${productId}/description`);
        setDescription(res.data);
      } catch (err) {
        console.error("Ошибка загрузки описания:", err);
      }
    }
    fetchDescription();
  }, [productId]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await api.get(`/product/${productId}/image-blobs`);
        setImages(res.data);
      } catch (err) {
        console.error("Ошибка загрузки изображений:", err);
      }
    }
    fetchImages();
  }, [productId]);

  return (
    <Link href={`/product/${productId}`}>
    <div className={styles["item"]}>
      <div className={styles["item-thumbnail"]}>
  {images?.images?.[0] ? (
    <img
      src={`data:${images.images[0].type};base64,${images.images[0].data}`}
      alt="thumbnail"
    />
  ) : (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <SquareLoader color={"#363537"} size={40} />
    </div>
  )}
</div>

      <div className={styles["item-subcontainer"]}>
        <div className={styles["item-name"]}>
          {description?.text.name || "Название модели"}
        </div>
        <div className={styles["item-rating-container"]}>
          <Image src="../../img/kid_star.svg" height={24} width={24} alt="" />
          <div className={styles["item-rating-number"]}>
            {description?.text.rating?.toFixed(2) || "нет голосов"}
          </div>
        </div>
        <div className={styles["item-attributes-container"]}>
          <span id={styles["licence"]}>{description?.text.licence}</span>
          {description?.text.tags?.map(
            (tag) =>
              availableTags[tag] && (
                <Image
                  key={tag}
                  src={availableTags[tag].src}
                  height={24}
                  width={24}
                  alt={tag}
                />
              )
          )}
        </div>
        <div className={styles["item-price"]}>
          {description ? `${description.text.price} ${description.text.currency}` : "799 ₽"}
        </div>
      </div>
    </div>
    </Link>
  );
}
