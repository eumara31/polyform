"use client";
import React from "react";
import styles from "../styles/ItemSwiper.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar"

type Props = {
  children: React.ReactNode;
  swiperDirection: "horizontal" | "vertical";
  spaceBetweenItems: number;
  itemsPerView: number;
  keyboardControl?: boolean;
  wheelControl?: boolean;
  scrollControl?: boolean;
};

export default function ItemSwiper({
  children,
  swiperDirection,
  spaceBetweenItems,
  itemsPerView,
  keyboardControl,
  wheelControl,
  scrollControl
}: Props) {

  return (
    <Swiper
    id={styles["item-swiper"]}
    direction={swiperDirection}
    spaceBetween={spaceBetweenItems}
    slidesPerView={itemsPerView}
    modules={[Keyboard, Mousewheel, Scrollbar]}
    keyboard={keyboardControl ? { enabled: true } : undefined}
    mousewheel={wheelControl ? { forceToAxis: true, sensitivity: 1 } : undefined}
    scrollbar={scrollControl ? { el: ".swiper-scrollbar", draggable: true, hide: false } : undefined}
  >
    {React.Children.map(children, (child, index) => (
      <SwiperSlide key={index}>{child}</SwiperSlide>
    ))}
  </Swiper>
  );
}
