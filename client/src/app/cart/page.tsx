"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/styles/CartPage.module.css";
import ItemSwiper from "../components/ItemSwiper";
import CartItem from "./components/CartItem";
import Cookies from "js-cookie";

type Props = {};

export default function Page({}: Props) {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [productPrices, setProductPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const cart = Cookies.get("cart");
    if (cart) {
      const items = cart.split(",").filter((id) => id.trim() !== "");
      setCartItems(items);
    }
  }, []);

  function handleRemoveFromCart(productId: string) {
    const updatedItems = cartItems.filter((id) => id !== productId);
    setCartItems(updatedItems);
    Cookies.set("cart", updatedItems.join(","), { path: "/", expires: 7 });

    setProductPrices((prev) => {
      const newPrices = { ...prev };
      delete newPrices[productId];
      return newPrices;
    });
  }

  function handlePriceUpdate(productId: string, price: number) {
    setProductPrices((prev) => ({ ...prev, [productId]: price }));
  }

  const totalPrice = Object.values(productPrices).reduce((sum, p) => sum + p, 0);

  return (
    <div id={styles["main-flex"]}>
      <div id={styles["cart-flex"]}>
        <div id={styles["swiper-flex"]}>
          <ItemSwiper
            swiperId={"cart-item-swiper"}
            swiperDirection={"vertical"}
            spaceBetweenItems={8}
            itemsPerView="auto"
            wheelControl={true}
            scrollControl={true}
            keyboardControl={true}
          >
            {cartItems.map((productId) => (
              <CartItem
                key={productId}
                productId={productId}
                onRemove={handleRemoveFromCart}
                onPriceUpdate={handlePriceUpdate}
              />
            ))}
          </ItemSwiper>
        </div>
        <div id={styles["checkout-flex"]}>
          <div id={styles["checkout-price-sum"]}>
            <span className={styles["checkout-bg"]}>Модели ({cartItems.length})</span>
            <span className={styles["checkout-sm"]}>{totalPrice} ₽</span>
          </div>
          <div id={styles["discount"]}>
            <span className={styles["checkout-bg"]}>Скидка</span>
            <span className={styles["checkout-sm"]}>0%</span>
          </div>
          <div id={styles["checkout-final"]}>
            <div id={styles["price-final"]}>
              <span id={styles["final-price"]}>К оплате:</span>
              <span className={styles["checkout-bg"]}>{totalPrice} руб.</span>
            </div>
            <input
              type="number"
              className={styles["form-input"]}
              placeholder="Номер карты"
              max={9999999999999}
            />
            <input
              type="text"
              className={styles["form-input"]}
              placeholder="Имя на карте"
            />
            <div id={styles["date-purchase-button"]}>
              <input
                type="number"
                className={styles["form-input"]}
                placeholder="CVV"
              />
              <button className={styles["purchase-button"]}>Оплатить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
