import React, { useEffect, useState } from "react";
import ItemSwiper from "@/app/components/ItemSwiper";

type Props = {
  imageSize: number;
  swiperDirection: "vertical" | "horizontal";
  spaceBetweenItems: number;
  itemsPerView: number;
  wheelControl: boolean;
  scrollControl: boolean;
  keyboardControl: boolean;
  children: React.ReactNode;
};

export default function CategorySwiper({
  swiperDirection,
  spaceBetweenItems,
  itemsPerView,
  wheelControl,
  scrollControl,
  keyboardControl,
  children,
}: Props) {
  const [categoryRefDict, setCategoryRefDict] = useState<{
    [index: number]: {
      ref: React.RefObject<HTMLDivElement | null>;
      isActive: boolean;
    };
  }>({});

  useEffect(() => {
    const initialDict: {
      [key: string]: {
        ref: React.RefObject<HTMLDivElement | null>;
        isActive: boolean;
      };
    } = {};

    React.Children.toArray(children).forEach((child, index) => {
      initialDict[index] = {
        ref: React.createRef<HTMLDivElement>(),
        isActive: false,
      };
    });
    setCategoryRefDict(initialDict);
  }, []);

  function handleCategoryClick(childIndex: number) {
    const tmpDict = structuredClone(categoryRefDict);
    for (let i = 0; i<Object.entries(tmpDict).length; i++) {
      if (i == childIndex) {
        tmpDict[i].isActive = true;
      } else {
        tmpDict[i].isActive = false;
      }
    }
    setCategoryRefDict(tmpDict);
  }

  useEffect(() => {
    console.log("categoryRefDict обновился:", categoryRefDict);
  }, [categoryRefDict]);

  return (
    <ItemSwiper
      swiperDirection={swiperDirection}
      spaceBetweenItems={spaceBetweenItems}
      itemsPerView={itemsPerView}
      wheelControl={wheelControl}
      scrollControl={scrollControl}
      keyboardControl={keyboardControl}
    >
      {React.Children.map(children, (child, index) => {
        return (
          <li
            onClick={() => {
              handleCategoryClick(index);
            }}
            key={index}
            style={{
              border: "2px solid",
              borderColor: categoryRefDict[index]?.isActive ? "white" : "transparent",
              borderRadius: "100px",
              transition: "border-color 0.2s ease-in-out",
            }}
          >
            {child}
          </li>
        );
      })}
    </ItemSwiper>
  );
}
