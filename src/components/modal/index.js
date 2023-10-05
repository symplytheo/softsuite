import React, { useEffect } from "react";
import s from "./modal.module.scss";

const Modal = ({ isOpen, onClose, children, maxWidth }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div>
      <dialog open={isOpen} className={s.modal} onClick={onClose}>
        <div className={s.modal_content} style={{ maxWidth }} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </dialog>
    </div>
  );
};

Modal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  maxWidth: 600,
};

export default Modal;
