import { createPortal } from "react-dom";
import "./style.css";
import { useEffect, useRef, type ReactNode } from "react";
import useFocusTrap from "./useFocusTrap";
import { getFocusableElements } from "./utils";

type Props = {
  onClose: () => void;
  children: ReactNode;
  isTop: boolean;
};

function Modal({ onClose, children, isTop }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, isTop);

  useEffect(() => {
    const elementToRestore = document.activeElement as HTMLElement;

    // autofocus
    const focusable = ref.current ? getFocusableElements(ref.current) : [];
    if (focusable.length > 0) focusable[0].focus();
    else ref.current?.focus();

    return () => {
      elementToRestore?.focus();
    };
  }, []);

  useEffect(() => {
    if (!isTop) return;

    // scroll lock
    document.body.style.overflow = "hidden";

    // handle escape key onClick
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isTop, onClose]);

  const container = document.getElementById("modal-root");

  if (!container) return null;

  return createPortal(
    <div ref={ref} className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} tabIndex={-1}>
        {children}

        {isTop && <button onClick={onClose}>Close Modal</button>}
      </div>
    </div>,
    container,
  );
}

export default Modal;
