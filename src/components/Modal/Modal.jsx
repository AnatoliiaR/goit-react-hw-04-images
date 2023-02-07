import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeModal);
      document.body.style.overflow = 'unset';
    };
    // eslint-disable-next-line
  }, []);

  return createPortal(
    <div className={style.overlay} onClick={closeModal}>
      <div className={style.modal}>
        {children}
        <span className={style.close} onClick={onClose}>
          <AiOutlineCloseCircle color="white" size="50px" />
        </span>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
