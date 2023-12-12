// scroll to specific section function with specific time
export function scrollToSection(sectionId, duration = 500, offsetTop = 0) {
  const section = document.getElementById(sectionId);
  if (section) {
    const startingY = window.scrollY;
    const targetY =
      section.getBoundingClientRect().top + window.scrollY - offsetTop;
    const startTime = performance.now();

    function scroll() {
      const currentTime = performance.now() - startTime;
      if (currentTime < duration) {
        const progress = currentTime / duration;
        window.scrollTo(0, startingY + (targetY - startingY) * progress);
        requestAnimationFrame(scroll);
      } else {
        window.scrollTo(0, targetY);
      }
    }
    requestAnimationFrame(scroll);
  }
}