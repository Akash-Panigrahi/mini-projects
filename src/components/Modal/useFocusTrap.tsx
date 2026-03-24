import { useEffect, type RefObject } from "react";
import { getFocusableElements } from "./utils";

function useFocusTrap(ref: RefObject<HTMLElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const container = ref.current;
    if (!container) return;

    const focusable = getFocusableElements(container);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTabClick = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // going backward
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // going forward
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener("keydown", handleTabClick);

    return () => {
      container.removeEventListener("keydown", handleTabClick);
    };
  }, [ref, isActive]);
}

export default useFocusTrap;
