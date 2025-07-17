'use client';

import { useEffect, useState } from 'react';
import api from './utilities/api';
import NavigationBeam from "./components/NavigationBeam";
import ItemCardContainer from "./components/ItemContainer";
import ItemCard from "./components/ProductMin";
import BestModelSwiper from "./components/ItemSwiper";
import { BarLoader } from "react-spinners";

export default function Home() {
  const [productIds, setProductIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductIds = async () => {
      try {
        const res = await api.get('/product/ids');
        setProductIds(res.data.ids);
      } catch (err) {
        console.error('Ошибка при загрузке ID:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductIds();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <BarLoader color={"#363537"}  />
      </div>
    );
  }

  const bestIds = productIds.slice(0, 3);
  const topIds = productIds.slice(3);

  return (
    <>
      <NavigationBeam name="Лучшие модели" logo="trophy.svg" />
      <BestModelSwiper swiperDirection="horizontal" spaceBetweenItems={30} itemsPerView={3}>
        {bestIds.map(id => (
          <ItemCard key={id} productId={id} />
        ))}
      </BestModelSwiper>

      <NavigationBeam name="Топ продаж" logo="bookmark_star.svg" />
      <ItemCardContainer>
        {topIds.map(id => (
          <ItemCard key={id} productId={id} />
        ))}
      </ItemCardContainer>
    </>
  );
}
