"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Range } from "react-range";
import styles from "@/app/styles/PriceSlider.module.css";
import { useSearchStore } from "@/app/store";
import { NeverCompare } from "three";
import { debounce, template } from "lodash";

type Props = {
  minPrice: number;
  maxPrice: number;
};

export default function PriceSlider({ minPrice, maxPrice }: Props) {
  const [values, setValues] = useState([minPrice, maxPrice]);
  const [initialPrice, setInitialPrice] = useState([minPrice, maxPrice]);
  const setMinPrice = useSearchStore((state) => state.setMinPrice);
  const setMaxPrice = useSearchStore((state) => state.setMaxPrice);

  useEffect(() => {
    setValues([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const debouncedUpdate = useMemo(
    () =>
      debounce((newValues: [number, number]) => {
        const tmpPrices = initialPrice;
        if (
          newValues[0] >= tmpPrices[0] &&
          newValues[1] <= tmpPrices[1] &&
          newValues[0] <= tmpPrices[1] &&
          newValues[1] >= tmpPrices[0]
        ) {
          setMinPrice(newValues[0]);
          setMaxPrice(newValues[1]);
        }
        if (newValues[0] >= tmpPrices[1]) {
          newValues[1] = tmpPrices[1];
          newValues[0] = tmpPrices[1] - 50;
          setMinPrice(newValues[0]);
          setMaxPrice(newValues[1]);
        }
        if (newValues[1] <= tmpPrices[0]) {
          newValues[0] = tmpPrices[0];
          newValues[1] = newValues[0] + 50;
          setMinPrice(newValues[0]);
          setMaxPrice(newValues[1]);
        }
        if (newValues[0] >= newValues[1]) {
          newValues[1] = newValues[0];
          newValues[1] = newValues[1] + 50;
          setMinPrice(newValues[0]);
          setMaxPrice(newValues[1]);
        }
        if (newValues[1] <= newValues[0]) {
          newValues[0] = newValues[1];
          newValues[1] = newValues[1] + 50;
          setMinPrice(newValues[0]);
          setMaxPrice(newValues[1]);
        }
      }, 300),
    [minPrice, maxPrice, setMinPrice, setMaxPrice]
  );

  return (
    <div id={styles["container"]}>
      <Range
        label="Select your value"
        step={30}
        min={initialPrice[0]}
        max={initialPrice[1]}
        values={values}
        onChange={(newValues) => {
          setValues(newValues);
          debouncedUpdate(newValues);
        }}
        renderTrack={({ props, children }) => (
          <div id={styles["slider-track"]} {...props}>
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div id={styles["slider-thumb"]} {...props} key={props.key} />
        )}
      />
      <div id={styles["numerical-fields"]}>
        <input
          type="text"
          value={values[0]}
          onChange={(e) => {
            setValues([+e.target.value, values[1]]);
            debouncedUpdate([+e.target.value, values[1]]);
          }}
        />
        <input
          type="text"
          value={values[1]}
          onChange={(e) => {
            setValues([values[0], +e.target.value]);
            debouncedUpdate([values[0], +e.target.value]);
          }}
        />
      </div>
    </div>
  );
}
