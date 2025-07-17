"use client";
import React, { useState, useCallback } from "react";
import styles from "@/app/styles/CategorySidebar.module.css";

interface MultipleToggleGroupProps {
  items: string[];
  onGroupSelect?: (selectedItems: string[]) => void;
}

function MultipleToggleGroup({ items, onGroupSelect }: MultipleToggleGroupProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleClick = useCallback(function(item: string) {
    setSelectedItems(function(prev) {
      const newSelectedItems = prev.includes(item)
        ? prev.filter(function(selected) { return selected !== item; })
        : [...prev, item];
      
      // Передаем новый массив выбранных элементов в родительский компонент
      onGroupSelect?.(newSelectedItems);
      return newSelectedItems;
    });
  }, [onGroupSelect]);

  return (
    <div id={styles["format-container"]}>
      {items.map(function(item) {
        return (
          <div
            key={item}
            onClick={function() { handleClick(item); }}
            className={styles["format"]}
            style={{
              backgroundColor: selectedItems.includes(item) ? "white" : "#363537",
              color: selectedItems.includes(item) ? "#363537" : "white",
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default MultipleToggleGroup;