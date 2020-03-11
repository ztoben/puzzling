export function isTouchDevice() {
  if ("ontouchstart" in window) {
    return true;
  }
  return false;
};
