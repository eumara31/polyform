"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/CategorySidebar.module.css";

type Props = {
  items: string[];
  onGroupSelect: (selected: string | null) => void;
};

export default function SingleToggleGroup({ items, onGroupSelect }: Props) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const handleGroupClick = (item: string) => {
    setActiveGroup((prev) => (prev === item ? null : item));
  };

  useEffect(() => {
    onGroupSelect(activeGroup);
  }, [activeGroup]);

  return (
    <div id={styles["format-container"]}>
      {items.map((item) => (
        <div
          key={item}
          onClick={() => handleGroupClick(item)}
          className={styles["format"]}
          style={{
            backgroundColor: activeGroup === item ? "white" : "#363537",
            color: activeGroup === item ? "#363537" : "white",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
