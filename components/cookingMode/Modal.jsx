import React from "react";
import classes from "./modal.module.css";

function Modal(props) {
  const { onClose, children } = props;

  return (
    <div className={classes.modalBackdrop}>
      <div className={classes.modalContent}>
        <span className={classes.closeButton} onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}

export default Modal;
