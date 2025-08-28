"use client";

import { useSearchStore } from "../store";
import styles from "../styles/Header.module.css";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import api from "../utilities/api";
import { useRouter, } from "next/navigation";

const SearchInput = () => {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownContents, setDropdownContents] = useState([]);
  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await api.get("/product/names/popular");
        if (res.status >= 200 && res.status < 300) {
          const namesArr = [];
          res.data.names.forEach((name) =>
            namesArr.push(Object.values(name)[0])
          );
          setDropdownContents(namesArr);
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPopularProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        searchBarRef.current &&
        e.target !== searchBarRef.current
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === "string") {
      setSearchQuery(e);
    } else {
      setSearchQuery(e.target.value);
    }
  };

  const handleSearchSubmition = (e) => {
     if (e.key === 'Enter') {
      router.push("/search")
    }
  }

  const showDropdown = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownSelect = (dropdownElementName: string) => {
    handleChange(dropdownElementName);
    router.push("/search")
  };

  return (
    <div id={styles["search-bar-dropdown-container"]}>
      <input
        id={styles["search-bar"]}
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Поиск..."
        onClick={showDropdown}
        ref={searchBarRef}
        onKeyDown={handleSearchSubmition}
      />
      {isDropdownOpen ? (
          <ul id={styles["search-dropdown"]} ref={dropdownRef}>
            {dropdownContents.map((name, i) => (
              <li onClick={() => handleDropdownSelect(name)} key={i}
              className={styles["search-dropdown-item"]}>
                {name}
              </li>
            ))}
          </ul>
      ) : null}
      </div>
  );
};

export default SearchInput;
