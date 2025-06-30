// src/components/Modal.tsx
import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h3>{title}</h3>
          <button onClick={onClose} className={styles.close}>✕</button>
        </header>
        <section className={styles.content}>{children}</section>
      </div>
    </div>
  );
};

export default Modal;
