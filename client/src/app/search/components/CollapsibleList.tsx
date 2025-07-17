"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "@/app/styles/CollapsibleList.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type ListItem = {
  src: string;
  text: string;
};

type Props = {
  elements: ListItem[];
  onElementSelect?: (userSelect: string) => void;
  imageSize?: number;
};

gsap.registerPlugin(useGSAP);

export default function CollapsibleList({ elements, onElementSelect, imageSize = 32 }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [arrowState, setArrowState] = useState("down");
  const collapsibleListRef = useRef(null);
  const collapsibleButtonRef = useRef(null);
  const { contextSafe } = useGSAP();

  const expandList = contextSafe(() => {
    if (!isExpanded) {
      gsap.to(collapsibleListRef.current, {
        height: "auto",
        duration: 1,
        ease: "power2.inOut",
      });
      gsap.to(collapsibleButtonRef.current, {
        background: 'linear-gradient(to top, rgba(54,53,55,1) 0, rgba(255,255,255,0) 0%)',
        duration: 0.5,
        ease: "power2.inOut",
      });
      setIsExpanded(true);
      setArrowState("up");
    } else {
      gsap.to(collapsibleListRef.current, {
        height: "140px",
        duration: 1,
        ease: "power2.inOut",
      });
      gsap.to(collapsibleButtonRef.current, {
        background: 'linear-gradient(to top, rgba(54,53,55,1) 30%, rgba(255,255,255,0) 100%)',
        duration: 0.5,
        ease: "power2.inOut",
      });
      setIsExpanded(false);
      setArrowState("down");
    }
  });

  return (
    <div id={styles["container"]}>
      <ul ref={collapsibleListRef} id={styles["collapsible-list"]}>
        {elements.map(({ src, text }) => (
          <li key={text} onClick={() => onElementSelect?.(text)}>
            <Image
              src={`/img/${src}`}
              height={imageSize}
              width={imageSize}
              alt=""
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <div
        id={styles["collapsible-button"]}
        onClick={expandList}
        ref={collapsibleButtonRef}
      >
        <Image
          src={`/img/arrow_${arrowState}_ios.svg`}
          height={22}
          width={22}
          alt=""
        />
      </div>
    </div>
  );
}
