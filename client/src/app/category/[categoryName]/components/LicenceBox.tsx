"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/CategorySidebar.module.css";

type Props = {
  children: React.ReactNode;
  updateLicence: (selected: string | null) => void;
};

export default function LicenceBox({ children, updateLicence }: Props) {
  const [activeLicence, setActiveLicence] = useState<string | null>(null);

  const licences = [
    "MIT",
    "GPL",
    "Apache",
    "BSD",
    "LGPL",
    "MPL",
    "EPL",
    "Unlicense",
  ];

  const handleLicenceClick = (licence: string) => {
    setActiveLicence((prev) => (prev === licence ? null : licence));
  };

  useEffect(() => {
    updateLicence(activeLicence);
  }, [activeLicence]);

  return (
    <div id={styles["format-container"]}>
      {licences.map((licence) => (
        <div
          key={licence}
          onClick={() => handleLicenceClick(licence)}
          className={styles["format"]}
          style={{
            backgroundColor: activeLicence === licence ? "white" : "#363537",
            color: activeLicence === licence ? "#363537" : "white",
          }}
        >
          {licence}
        </div>
      ))}
    </div>
  );
}
