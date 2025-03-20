"use client"
import React from 'react'
import styles from "../styles/ItemSwiper.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Props = {
    children: React.ReactNode;
  };
  
  export default function ItemSwiper({ children }: Props) {
    return (
        <Swiper id={styles["item-swiper"]}
        spaceBetween={30}
        slidesPerView={3}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {React.Children.map(children, (child) => (
          <SwiperSlide>{child}</SwiperSlide>
        ))}
      </Swiper>
      )
}
