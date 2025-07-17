"use client";

import React, { useEffect, useState } from 'react';
import { useSearchStore } from '@/app/store';
import api from '../utilities/api';
import ItemContainer from '@/app/components/ItemContainer';
import ProductMin from '@/app/components/ProductMin';
import CategorySidebar from './components/CategorySidebar';

export default function Page() {
  const searchQuery = useSearchStore((s) => s.searchQuery);
  const categories = useSearchStore((s) => s.categories);
  const features = useSearchStore((s) => s.features);
  const materials = useSearchStore((s) => s.materials);
  const licenses = useSearchStore((s) => s.licenses);
  const minPrice = useSearchStore((s) => s.minPrice);
  const maxPrice = useSearchStore((s) => s.maxPrice);
  const getJsonQuery = useSearchStore((s) => s.getJsonQuery);

  const [localProductIds, setLocalProductIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = getJsonQuery();
        const res = await api.post("/product/search", query);
        setLocalProductIds(res.data.ids);
      } catch (err) {
        console.error("Ошибка при поиске моделей:", err);
      }
    };

    fetchData();
  }, [searchQuery, categories, features, materials, licenses, minPrice, maxPrice]);

  return (
    <CategorySidebar>
      <ItemContainer>
        {localProductIds.map((id) => (
          <ProductMin key={id} productId={id} />
        ))}
      </ItemContainer>
    </CategorySidebar>
  );
}
