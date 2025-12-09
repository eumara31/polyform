"use client";
import React, { useEffect } from "react";
import styles from "../styles/ItemSwiper.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar"

type Props = {
  children: React.ReactNode;
  swiperDirection: "horizontal" | "vertical";
  spaceBetweenItems: number;
  itemsPerView: number | "auto";
  keyboardControl?: boolean;
  wheelControl?: boolean;
  scrollControl?: boolean;
  swiperId?: string;
  swiperSlideClass?: string;
};

export default function ItemSwiper({
  children,
  swiperDirection,
  spaceBetweenItems,
  itemsPerView,
  keyboardControl,
  wheelControl,
  scrollControl,
  swiperId,
  swiperSlideClass,
}: Props) {

  return (
    <Swiper
    id={swiperId? styles[swiperId] : styles["item-swiper"]}
    direction={swiperDirection}
    spaceBetween={spaceBetweenItems}
    slidesPerView={itemsPerView}
    modules={[Keyboard, Mousewheel, Scrollbar]}
    keyboard={keyboardControl ? { enabled: true } : undefined}
    mousewheel={wheelControl ? { forceToAxis: true, sensitivity: 1 } : undefined}
    scrollbar={scrollControl ? { el: ".swiper-scrollbar", draggable: true, hide: false } : undefined}
  >
    {React.Children.map(children, (child, index) => (
      <SwiperSlide className={styles[swiperSlideClass]} key={index}>{child}</SwiperSlide>
    ))}
  </Swiper>
  );
}
