import React from 'react';

import Toast from '../Toast';

import styles from './ToastShelf.module.css';

function ToastShelf({ toasts }) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ id, variant, message, onClose }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast variant={variant} onClose={onClose}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
