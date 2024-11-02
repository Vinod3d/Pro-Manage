/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import styles from './OkModal.module.css';

export default function OkModal({ isOpen, onClose, onOk, titleText, btnText }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) setIsClosing(false);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div
        className={`${styles.modalContainer} ${
          isClosing ? styles.modalClose : styles.modalOpen
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.modalTitle}>{titleText}</h3>
        <div className={styles.buttonContainer}>
          <button onClick={onOk} className={styles.logoutButton}>
            {btnText}
          </button>
          <button onClick={handleClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
