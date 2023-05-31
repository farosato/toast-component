import React from 'react';

import ToastShelf from '../ToastShelf';
import useKeyDown from '../../hooks/use-keydown.hook';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function dismissToast(id) {
    // don't use the outer toasts here as it's a closure
    // and so it depends on what version of onClose you're using
    setToasts((toasts) => toasts.filter((item) => item.id !== id));
  }

  function createToast(variant, message) {
    const id = crypto.randomUUID();
    setToasts([
      ...toasts,
      { id, variant, message, onClose: () => dismissToast(id) },
    ]);
  }

  const handleEscape = React.useCallback(() => setToasts([]), []);

  useKeyDown('Escape', handleEscape); // no need to use useMemo on 'Escape' as it's not an object

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
      <ToastShelf />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
