"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/styles/CartPage.module.css";
import api from "@/app/utilities/api";

type Props = {
  productId: string;
  onRemove: (id: string) => void;
  onPriceUpdate: (id: string, price: number) => void;
};

type ProductData = {
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

export default function CartItem({
  productId,
  onRemove,
  onPriceUpdate,
}: Props) {
  const [product, setProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const text = (await api.get(`/product/${productId}/description`)).data
          .text;
        setProduct(text);
        if (text.price) onPriceUpdate(productId, text.price);
      } catch (err) {
        console.error("Ошибка при получении данных:", err);
      }
    }
    fetchProduct();
  }, [productId]);

  return (
    <div id={styles["cart-item"]}>
      <div id={styles["cart-text-flex"]}>
        <span className={styles["checkout-bg"]}>
          {product ? product.name : ""}
        </span>
      </div>
      <div id={styles["price-delete-flex"]}>
        <span className={styles["checkout-bg"]}>
          {product ? `${product.price} ${product.currency || "₽"}` : "..."}
        </span>
        <button
          className={styles["checkout-bg"]}
          onClick={() => onRemove(productId)}
        >
          Удалить из корзины
        </button>
      </div>
    </div>
  );
}
