import React from "react";
import classes from "./modal.module.css";

/**
 * Modal Component
 *
 * A React component for creating modal dialogs. It provides a modal
 * backdrop with customizable content and a close button.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onClose - A function to be called when the modal is closed.
 * @param {ReactNode} props.children - The content to be displayed inside the modal.
 *
 * @returns {JSX.Element} - The JSX representation of the Modal component.
 *
 * */

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
