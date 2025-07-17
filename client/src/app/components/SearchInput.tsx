'use client';

import { useSearchStore } from '../store';
import Image from 'next/image';
import styles from "../styles/Header.module.css";
import { ChangeEvent } from 'react';

const SearchInput = () => {
  const searchQuery = useSearchStore(state => state.searchQuery);
  const setSearchQuery = useSearchStore(state => state.setSearchQuery);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
      <input
        id={styles["search-bar"]}
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Поиск..."
      />
  );
};

export default SearchInput;