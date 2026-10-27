/* Momentum scrolling (Lenis). Native scrolling stays in charge of keyboard, touch, and
   reduced motion; this only smooths the mouse wheel / trackpad. */
(() => {
  "use strict";
  if (!window.Lenis || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const lenis = new window.Lenis({
    lerp: 0.12,          // how quickly the page catches up to the wheel
    wheelMultiplier: 1,
    smoothWheel: true,
    autoRaf: true,
    anchors: { offset: -88 }, // same gap as scroll-padding-top, under the floating nav
  });
  window.hermixScroll = lenis;
})();
