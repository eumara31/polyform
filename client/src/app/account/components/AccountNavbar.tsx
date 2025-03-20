import React from "react";
import styles from "@/app/styles/AccountPage.module.css";
import Link from "next/link";

type Props = {
  tabDict: {
    [index: number]: {
      tabName: string;
      isActive: boolean;
      url: string;
    };
  };
};

export default function AccountNavbar({ tabDict }: Props) {
  return (
    <div id={styles["account-navbar"]}>
      {Object.entries(tabDict).map(([index, { tabName, isActive, url }]) => (
        <h1
          key={parseInt(index)}
          className={styles["account-navbar-tab"]}
          style={{
            fontWeight: isActive ? "700" : "500",
          }}
        >
          {!isActive ? <Link href={url}>{tabName}</Link> : tabName}
        </h1>
      ))}
    </div>
  );
}
