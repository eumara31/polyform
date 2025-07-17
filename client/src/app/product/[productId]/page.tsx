'use client'

import React from 'react'
import styles from '@/app/styles/ProductPage.module.css'
import StarRating from './components/StarRating'
import Image from 'next/image'
import ModelPreview from './components/ModelPreview'

type Props = {}

export default function page({}: Props) {
  return (
    <div id={styles['main-flex']}>
      <div id={styles['product-flex']}>
        <ModelPreview modelURL={"/img/dragon.stl"} modelFormat='stl' />
        <div id={styles['product-textblock-flex']}>
          <div id={styles['name-rating-flex']}>
            <span id={styles['name']}>Дракон</span>
            <div id={styles['rating-vote']}>
              <div id={styles['rating']}>
                <StarRating rating={4.8} />
                <span id={styles['rating-number']}>4.8,</span>
              </div>
              <span id={styles['vote-count']}>27 голосов</span>
            </div>
          </div>
          <div id={styles['description']}>
            Детализированная 3D-модель дракона для печати на 3D-принтере. Идеально подходит для украшения и коллекционирования.
          </div>
          <div id={styles['attributes-price-flex']}>
            <div id={styles['attributes']}>
              <div className={styles['attribute']}>
                <Image src="/img/multiple_parts_white.svg" alt="" width={24} height={24} />
                <span>Многосоставная</span>
              </div>
              <div className={styles['attribute']}>
                <Image src="/img/solid_white.svg" alt="" width={24} height={24} />
                <span>Жёсткая</span>
              </div>
              <div className={styles['attribute']}>
                <Image src="/img/moving_white.svg" alt="" width={24} height={24} />
                <span>Подвижная</span>
              </div>
              <div id={styles['format']}>Формат: STL</div>
              <div id={styles['license']}>Лицензия: MIT</div>
              <div id={styles['author']}>Автор: Иван98</div>
            </div>
            <div id={styles['price-button-flex']}>
              <div id={styles['price']}>799₽</div>
              <button id={styles['add-to-cart']}>Добавить в корзину</button>
            </div>
          </div>
        </div>
      </div>
      <div id={styles['similar-products-flex']}>{/* тут будет свайпер */}</div>
    </div>
  )
}
