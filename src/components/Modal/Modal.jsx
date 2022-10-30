import React from 'react';
import { useEffect } from 'react';

import css from '../Modal/Modal.module.css';

export default function Modal({ image, closeModal }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === `Escape`) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = event => {
    if (event.target.nodeName === 'DIV') {
      closeModal();
    }
  };

  return (
    <div className={css.modal_backdrop} onClick={handleBackdropClick}>
      <img src={image} className={css.modal_image} alt="searching element" />
    </div>
  );
}
