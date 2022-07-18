import s from "./Modal.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");
function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };
  const handleBackDropClick = (event) => {
    if (event.currentTarget === event.target) onClose();
  };
  return createPortal(
    <div className={s.Overlay} onClick={handleBackDropClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
