/**
 * Utility functions for smooth scrolling
 */

export const scrollToElement = (elementId, duration = 500, offsetTop = 0, callback = null) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found.`);
    return;
  }

  // Use native smooth scrolling if available
  if ('scrollBehavior' in document.documentElement.style) {
    const targetY = element.getBoundingClientRect().top + window.scrollY - offsetTop;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });

    // Execute callback after animation completes
    if (callback && typeof callback === 'function') {
      setTimeout(callback, duration);
    }
    return;
  }

  // Fallback for browsers without smooth scrolling
  const startingY = window.scrollY;
  const targetY = element.getBoundingClientRect().top + window.scrollY - offsetTop;
  const startTime = performance.now();

  function scroll() {
    const currentTime = performance.now() - startTime;
    if (currentTime < duration) {
      const progress = currentTime / duration;
      // Use easeInOutCubic for smoother animation
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startingY + (targetY - startingY) * easeProgress);
      requestAnimationFrame(scroll);
    } else {
      window.scrollTo(0, targetY);

      // Execute callback after animation completes
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  }
  requestAnimationFrame(scroll);
};

export const scrollToElementInSection = (
  sectionId,
  elementId,
  delay = 600,
  sectionDuration = 500,
  elementDuration = 500,
  sectionOffset = 20,
  elementOffset = 50
) => {
  // First scroll to the section
  scrollToElement(sectionId, sectionDuration, sectionOffset, () => {
    // Then after the specified delay, scroll to the specific element
    setTimeout(() => {
      scrollToElement(elementId, elementDuration, elementOffset);
    }, delay);
  });
};
