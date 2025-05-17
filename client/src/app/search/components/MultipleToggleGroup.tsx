'use client';
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/CategorySidebar.module.css";

type Props = {
  items: string[];
  onGroupSelect?: (groupState: {
    [key: string]: {
      ref: React.RefObject<HTMLDivElement | null>;
      isActive: boolean;
    };
  }) => void;
};

export default function MultipleToggleGroup({ items, onGroupSelect }: Props) {
  const [groupState, setGroupState] = useState<{
    [key: string]: {
      ref: React.RefObject<HTMLDivElement | null>;
      isActive: boolean;
    };
  }>({});

  useEffect(() => {
    const initialState: {
      [key: string]: {
        ref: React.RefObject<HTMLDivElement | null>;
        isActive: boolean;
      };
    } = {};

    items.forEach((item) => {
      initialState[item] = {
        ref: React.createRef<HTMLDivElement>(),
        isActive: false,
      };
    });

    setGroupState(initialState);
  }, [items]);

  const handleClick = (item: string) => {
    setGroupState((prev) => ({
      ...prev,
      [item]: {
        ...prev[item],
        isActive: !prev[item].isActive,
      },
    }));
  };

  useEffect(() => {
    onGroupSelect?.(groupState);
  }, [groupState]);

  return (
    <div id={styles["format-container"]}>
      {items.map((item) => (
        <div
          key={item}
          ref={groupState[item]?.ref}
          onClick={() => handleClick(item)}
          className={styles["format"]}
          style={{
            backgroundColor: groupState[item]?.isActive ? "white" : "#363537",
            color: groupState[item]?.isActive ? "#363537" : "white",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
