import { useEffect, useRef, type RefObject } from "react";

/**
 * Manages focus around a modal drawer/dialog:
 * on open, remembers whatever had focus and moves focus to `initialFocusRef`;
 * on close, restores focus to the remembered element.
 */
export function useFocusReturn(
  open: boolean,
  initialFocusRef: RefObject<HTMLElement | null>,
) {
  // The element that had focus at the moment the drawer opened.
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      initialFocusRef.current?.focus();
    } else {
      lastFocusedRef.current?.focus?.();
    }
  }, [open, initialFocusRef]);
}
