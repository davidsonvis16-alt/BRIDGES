/**
 * Smooth Easing Scroll Utility with dynamic header offset compensation
 * and subtle target entrance highlight animation.
 */

// Easing function: Cubic Ease-In-Out for natural, polished momentum
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export interface SmoothScrollOptions {
  duration?: number;
  offset?: number;
  highlightTarget?: boolean;
  onComplete?: () => void;
}

/**
 * Smoothly scrolls the window to an element or Y position using custom easing
 */
export function smoothScrollTo(
  target: string | HTMLElement | number,
  options: SmoothScrollOptions = {}
): void {
  if (typeof window === 'undefined') return;

  const {
    duration = 750,
    offset,
    highlightTarget = true,
    onComplete
  } = options;

  let targetElement: HTMLElement | null = null;
  let targetY = 0;

  if (typeof target === 'number') {
    targetY = target;
  } else if (typeof target === 'string') {
    const selector = target.startsWith('#') ? target.slice(1) : target;
    targetElement = document.getElementById(selector);
    if (!targetElement) {
      console.warn(`SmoothScroll: Element with id "${target}" not found.`);
      return;
    }
  } else if (target instanceof HTMLElement) {
    targetElement = target;
  }

  // Calculate dynamic sticky header height
  const header = document.getElementById('main-sticky-header');
  const headerHeight = header ? header.offsetHeight : 70;
  const computedOffset = offset !== undefined ? offset : headerHeight + 16;

  if (targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    targetY = rect.top + currentScrollY - computedOffset;
  }

  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
  const clampedTargetY = Math.max(0, Math.min(targetY, maxScrollY));
  const distance = clampedTargetY - startY;

  // If already at position
  if (Math.abs(distance) < 2) {
    if (targetElement && highlightTarget) {
      applySubtleHighlight(targetElement);
    }
    onComplete?.();
    return;
  }

  let startTime: number | null = null;

  function step(currentTime: number) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (timeElapsed < duration) {
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, clampedTargetY);
      if (targetElement && highlightTarget) {
        applySubtleHighlight(targetElement);
      }
      onComplete?.();
    }
  }

  window.requestAnimationFrame(step);
}

/**
 * Applies a gentle, elegant entrance pulse to the target section
 */
function applySubtleHighlight(element: HTMLElement) {
  element.classList.remove('section-entrance-glow');
  // Trigger reflow to restart animation if triggered again
  void element.offsetWidth;
  element.classList.add('section-entrance-glow');

  setTimeout(() => {
    element.classList.remove('section-entrance-glow');
  }, 1600);
}
