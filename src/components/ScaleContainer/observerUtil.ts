import ResizeObserver from "resize-observer-polyfill";

export type ResizeListener = (element: HTMLDivElement) => void;
const elementListeners = new Map<HTMLDivElement, Set<ResizeListener>>();

const ro = new ResizeObserver((entries, observer) => {
  for (const entry of entries) {
    const listeners = elementListeners.get(entry.target as HTMLDivElement);
    if (listeners) {
      listeners.forEach((listener) => listener(entry.target as HTMLDivElement));
    }
  }
});

export function observe(
  element: HTMLDivElement | null,
  callback: ResizeListener
) {
  if (!element) return false;
  if (!elementListeners.has(element)) {
    elementListeners.set(element, new Set());
    ro.observe(element);
  }
  elementListeners.get(element)?.add(callback);
}

export function unobserve(
  element: HTMLDivElement | null,
  callback: ResizeListener
) {
  if (!element) return false;
  if (elementListeners.has(element)) {
    elementListeners.get(element)?.delete(callback);
    if (elementListeners.get(element)?.size === 0) {
      ro.unobserve(element);
      elementListeners.delete(element);
    }
  }
}
