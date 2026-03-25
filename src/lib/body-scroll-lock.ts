let overflowLocks = 0;
let touchLocks = 0;
let savedOverflow = "";
let savedTouchAction = "";

type LockOptions = {
  disableTouchAction?: boolean;
};

export function lockBodyScroll(options: LockOptions = {}) {
  if (typeof document === "undefined") return;
  const { disableTouchAction = false } = options;
  const body = document.body;

  if (overflowLocks === 0) {
    savedOverflow = body.style.overflow;
    savedTouchAction = body.style.touchAction;
  }

  overflowLocks += 1;
  body.style.overflow = "hidden";

  if (disableTouchAction) {
    touchLocks += 1;
    body.style.touchAction = "none";
  }
}

export function unlockBodyScroll(options: LockOptions = {}) {
  if (typeof document === "undefined") return;
  const { disableTouchAction = false } = options;
  const body = document.body;

  overflowLocks = Math.max(0, overflowLocks - 1);
  if (disableTouchAction) {
    touchLocks = Math.max(0, touchLocks - 1);
  }

  if (overflowLocks === 0) {
    body.style.overflow = savedOverflow;
  }

  if (touchLocks === 0) {
    body.style.touchAction = savedTouchAction;
  }
}
