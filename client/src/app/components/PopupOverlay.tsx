import React, { useEffect, useState } from "react";
import styles from "../styles/Popup.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function PopupOverlay({ isOpen, onClose, children }: Props) {
  const [popupStatus, setPopupStatus] = useState(isOpen);

  useEffect(() => {
    setPopupStatus(isOpen);
  }, [isOpen]);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      // onClose();
      setPopupStatus(!popupStatus);
    }
  }

  if (!popupStatus) {
    return null;
  }

  return (
    <div id={styles["popup-overlay"]} onClick={handleOverlayClick}>
      {children}
    </div>
  );
}
