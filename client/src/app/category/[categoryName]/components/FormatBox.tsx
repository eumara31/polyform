'use client'
import React, { useState, useEffect, RefObject } from "react";
import styles from "@/app/styles/CategorySidebar.module.css";

type Props = {
  children: React.ReactNode;
};

//стейт обновляется асинхронно - не забыть об этом когда буду заниматься вебсокетами

export default function FormatBox({ children }: Props) {
  const [formatRefDict, setFormatRefDict] = useState<{
    [key: string]: {
      ref: React.RefObject<HTMLDivElement | null>;
      isActive: boolean;
    };
  }>({});

  const formats = [
    "STL",
    "OBJ",
    "FBX",
    "AMF",
    "3MF",
    "GCODE",
    "PLY",
    "STEP",
    "IGES",
  ];

  useEffect(() => {
    const initialDict: {
      [key: string]: {
        ref: React.RefObject<HTMLDivElement | null>;
        isActive: boolean;
      };
    } = {};

    formats.forEach((format) => {
      initialDict[format] = {
        ref: React.createRef<HTMLDivElement>(),
        isActive: false
      };
    });
  

    setFormatRefDict(initialDict);
  }, [])

  useEffect(() =>{
    console.log(formatRefDict)
  }, [formatRefDict])


  const handleFormatClick = (format: string) => {
    setFormatRefDict((prevDict) => {
      return {
        ...prevDict,
        [format]: {
          ...prevDict[format],
          isActive: !prevDict[format].isActive,
        },
      };
    });
  };

  return (
    <div id={styles["format-container"]}>
      {formats.map((format) => (
        <div
          className={styles["format"]}
          key={format}
          ref={formatRefDict[format]?.ref}
          onClick={() => handleFormatClick(format)}
          style={{
            backgroundColor: formatRefDict[format]?.isActive ? "white" : "#363537",
            color: formatRefDict[format]?.isActive ? "#363537" : "white",
          }}
        >
          {format}
        </div>
      ))}
    </div>
  );
}
