import { useEffect, type RefObject } from "react";

/**
 * Wires up keyboard behavior for a modal drawer/dialog while it's open:
 * Escape closes it, and Tab / Shift+Tab are trapped within the panel.
 */
export function useDrawerKeyboard(
  open: boolean,
  closeDrawer: () => void,
  panelRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeDrawer();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeDrawer, panelRef]);
}
