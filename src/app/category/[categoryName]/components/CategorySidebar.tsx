import React from "react";
import Image from "next/image";
import WidthContainer from "@/app/components/WidthContainer";
import Header from "@/app/components/Header";
import ItemContainer from "@/app/components/ItemContainer";
import Item from "@/app/components/Item";
import CollapsibleList from "./CollapsibleList";
import styles from "@/app/styles/CategorySidebar.module.css";
import PriceSlider from "./PriceSlider";

type Props = {
  children: React.ReactNode;
};

export default function CategorySidebar({ children }: Props) {
  const categoryImageSize = 28;

  return (
    <div id={styles["category-layout"]}>
      <div id={styles["category-sidebar"]}>
        <h1 className={styles["sidebar-h1"]}>Категории</h1>
        <CollapsibleList>
          <li>
            <Image
              src="../img/person.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Персонажи</span>
          </li>
          <li>
            <Image
              src="../img/cottage.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Архитектура</span>
          </li>
          <li>
            <Image
              src="../img/car.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Транспорт</span>
          </li>
          <li>
            <Image
              src="../img/bow.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Оружие</span>
          </li>
          <li>
            <Image
              src="../img/park.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Растения</span>
          </li>
          <li>
            <Image
              src="../img/chair.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Мебель</span>
          </li>
          <li>
            <Image
              src="../img/devices.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Технологии</span>
          </li>
          <li>
            <Image
              src="../img/apparel.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Аксессуары</span>
          </li>
          <li>
            <Image
              src="../img/manufacturing.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Механизмы</span>
          </li>
          <li>
            <Image
              src="../img/service_toolbox.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Инструменты</span>
          </li>
          <li>
            <Image
              src="../img/shield.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Фэнтези</span>
          </li>
          <li>
            <Image
              src="../img/experiment.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Наука</span>
          </li>
          <li>
            <Image
              src="../img/fitness_center.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Спорт</span>
          </li>
          <li>
            <Image
              src="../img/cruelty_free.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Животные</span>
          </li>
          <li>
            <Image
              src="../img/brush.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Художество</span>
          </li>
          <li>
            <Image
              src="../img/headphones.svg"
              height={categoryImageSize}
              width={categoryImageSize}
              alt=""
            />
            <span>Музыка</span>
          </li>
        </CollapsibleList>
        <h1 className={styles["sidebar-h1"]}>Цена</h1>
        <PriceSlider></PriceSlider>
        <h1 className={styles["sidebar-h1"]}>Функциональность</h1>
        <div className={styles['checkbox-container']}>
          <div className={styles['checkbox-subcontainer']}>
            <input type="checkbox" />
            <div className={styles['checkbox-text']}>Многосоставная</div>
          </div>
          <div className={styles['checkbox-subcontainer']}>
            <input type="checkbox" />
            <div className={styles['checkbox-text']}>Подвижная</div>
          </div>
          <div className={styles['checkbox-subcontainer']}>
            <input type="checkbox" />
            <div className={styles['checkbox-text']}>Жёсткая</div>
          </div>
          <div className={styles['checkbox-subcontainer']}>
            <input type="checkbox" />
            <div className={styles['checkbox-text']}>Гибкая</div>
          </div>
          <div className={styles['checkbox-subcontainer']}>
            <input type="checkbox" />
            <div className={styles['checkbox-text']}>Эластичная</div>
          </div>
        </div>

        <h1 className={styles["sidebar-h2"]}>Рекомендованный материал</h1>

        <div className={styles['checkbox-container']}>
          <div className={styles['checkbox-subcontainer']}>
            <input type="checkbox" />
            <div className={styles['checkbox-text']}>PLA</div>
          </div>
          <div className={styles['checkbox-subcontainer']}>
            <input type="checkbox" />
            <div className={styles['checkbox-text']}>ABS</div>
          </div>
          <div className={styles['checkbox-subcontainer']}>
            <input type="checkbox" />
            <div className={styles['checkbox-text']}>PETG</div>
          </div>
          <div className={styles['checkbox-subcontainer']}>
            <input type="checkbox" />
            <div className={styles['checkbox-text']}>TPU</div>
          </div>
          <div className={styles['checkbox-subcontainer']}>
            <input type="checkbox" />
            <div className={styles['checkbox-text']}>Resin</div>
          </div>
        </div>
      </div>
      <div id={styles["item-container"]}>{children}</div>
    </div>
  );
}