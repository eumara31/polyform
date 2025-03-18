"use client";
import React, {useState} from 'react'
import { Range } from "react-range";
import styles from "@/app/styles/PriceSlider.module.css";

type Props = {

}

export default function PriceSlider({}: Props) {
  const [values, setValues] = useState([0, 100]);  
  return (
    <div id={styles["container"]}>
     <Range
      label="Select your value"
      step={0.1}
      min={0}
      max={100}
      values={values}
      onChange={(values) => setValues(values)}
      renderTrack={({ props, children }) => (
        <div
         id={styles["slider-track"]}
          {...props}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
        id={styles["slider-thumb"]}
          {...props}
          key={props.key}
        />
      )}
    />
    <div id={styles["numerical-fields"]}>
      <input type="text" value={values[0]}></input>
      <input type="text" value={values[1]}></input>
    </div>
    </div>
  )
}