import { cubicOut, elasticOut, backOut, quintOut } from "svelte/easing";
import { crossfade, fly, fade, slide, scale } from "svelte/transition";
import type { TransitionParams } from "$lib/types/transitions.types";

/**
 * Custom fly transition that can be used for page transitions
 * @param {Node} node - DOM element to animate
 * @param {Object} params - Animation parameters
 * @returns {Object} - Transition object
 */
export function pageTransition(
  node: HTMLElement,
  { delay = 0, duration = 250 }: TransitionParams = {}
) {
  return {
    delay,
    duration,
    css: (t: any) => {
      const eased = cubicOut(t);
      return `
        opacity: ${eased};
        transform: translateY(${(1 - eased) * 15}px);
      `;
    },
  };
}

/**
 * Custom scale transition with fade for UI elements
 * @param {Node} node - DOM element to animate
 * @param {Object} params - Animation parameters
 * @returns {Object} - Transition object
 */
export function popIn(node: HTMLElement, { delay = 0, duration = 200 }: TransitionParams = {}) {
  return {
    delay,
    duration,
    css: (t: any) => {
      const eased = elasticOut(t);
      return `
        opacity: ${t};
        transform: scale(${0.9 + eased * 0.1});
      `;
    },
  };
}

/**
 * Pulse effect for highlighting elements
 * @param {Node} node - DOM element to animate
 * @param {Object} params - Animation parameters
 * @returns {Object} - Transition object
 */
export function pulse(
  node: HTMLElement,
  { delay = 0, duration = 400, intensity = 1.05 }: TransitionParams = {}
) {
  return {
    delay,
    duration,
    css: (t: any) => {
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // Custom cubic easing

      const scale = 1 + (eased < 0.5 ? eased : 1 - eased) * (intensity - 1);

      return `
        transform: scale(${scale});
        opacity: ${0.8 + eased * 0.2};
      `;
    },
  };
}

/**
 * Bounce effect for interactive elements
 * @param {Node} node - DOM element to animate
 * @param {Object} params - Animation parameters
 * @returns {Object} - Transition object
 */
export function bounce(
  node: HTMLElement,
  { delay = 0, duration = 300, y = 10 }: TransitionParams = {}
) {
  return {
    delay,
    duration,
    css: (t: any) => {
      const eased = backOut(t);
      return `
        transform: translateY(${(1 - eased) * y * -1}px);
      `;
    },
  };
}

/**
 * Reveal text with a gradient wipe effect
 * @param {Node} node - DOM element to animate
 * @param {Object} params - Animation parameters
 * @returns {Object} - Transition object
 */
export function textReveal(
  node: HTMLElement,
  { delay = 0, duration = 800 }: TransitionParams = {}
) {
  node.style.position = "relative";

  // Create a overlay element to cover the text
  const overlay = document.createElement("span");
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.right = "0";
  overlay.style.bottom = "0";
  overlay.style.background =
    "linear-gradient(to right, transparent, currentColor 20%, currentColor 80%, transparent)";
  overlay.style.transform = "translateX(-100%)";
  overlay.style.zIndex = "1";
  overlay.style.pointerEvents = "none";

  node.appendChild(overlay);

  return {
    delay,
    duration,
    css: (t: any, u: any) => {
      const eased = quintOut(t);

      // Move the gradient overlay across the text
      overlay.style.transform = `translateX(${(eased - 0.5) * 200}%)`;

      return `
        clip-path: inset(0 ${100 - t * 100}% 0 0);
      `;
    },
    tick: (t: any) => {
      if (t === 1) {
        // Clean up when animation is complete
        node.removeChild(overlay);
        node.style.position = "";
        node.style.clipPath = "";
      }
    },
  };
}

/**
 * Create crossfade transitions for list items
 * @param {Object} params - Parameters for the crossfade
 * @returns {Object} - send and receive transition functions
 */
export function createListTransition(params: any = {}) {
  return crossfade({
    duration: (d) => Math.sqrt(d * 300),
    fallback: scale,
    ...params,
  });
}

/**
 * Stagger children animations
 * @param {Node} node - Container node
 * @param {Object} params - Animation parameters
 */
export function staggerChildren(
  node: HTMLElement,
  { staggerTime = 50, transition = fade, ...params } = {}
) {
  const children = Array.from(node.children) as HTMLElement[];

  // Hide all children initially
  children.forEach((child, i) => {
    child.style.opacity = "0";
  });

  // Animate children one by one
  let timeouts: any[] = [];

  children.forEach((child, i) => {
    const timeout = setTimeout(() => {
      // Apply the transition
      const animation = transition(child, { delay: 0, ...params });

      // Clean up initial styles
      child.style.opacity = "";
    }, i * staggerTime);

    timeouts.push(timeout);
  });

  return {
    destroy() {
      // Clean up timeouts if the component is removed before animations complete
      timeouts.forEach(clearTimeout);
    },
  };
}

/**
 * Typewriter effect
 * @param {Node} node - Text node to animate
 * @param {Object} params - Animation parameters
 */
export function typewriter(node: any, { speed = 1, delay = 0 } = {}) {
  const text = node.textContent;
  const duration = text.length / (speed * 0.01);

  return {
    delay,
    duration,
    tick: (t: any) => {
      const i = Math.trunc(text.length * t);
      node.textContent = text.slice(0, i);
    },
  };
}

/**
 * Floating animation for subtle element movement
 * @param {Node} node - DOM element to animate
 * @returns {Object} - Animation object
 */
export function float(node: HTMLElement) {
  // Random values to make each float unique
  const randomDuration = 2000 + Math.random() * 1000;
  const randomOffset = Math.random() * 5;

  // Create keyframes animation
  const animation = node.animate(
    [
      { transform: `translateY(0px)` },
      { transform: `translateY(-${randomOffset}px)` },
      { transform: `translateY(0px)` },
    ],
    {
      duration: randomDuration,
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );

  return {
    destroy() {
      animation.cancel();
    },
  };
}

// Export common transitions with sensible defaults
export const fadeIn = (node: HTMLElement, params: TransitionParams) =>
  fade(node, { duration: 200, ...params });

export const fadeOut = (node: HTMLElement, params: TransitionParams) =>
  fade(node, { duration: 150, ...params });

export const slideIn = (node: HTMLElement, params: TransitionParams) =>
  slide(node, { duration: 300, ...params });

export const flyRight = (node: HTMLElement, params: TransitionParams) =>
  fly(node, { x: 20, y: 0, duration: 250, ...params });

export const flyUp = (node: HTMLElement, params: TransitionParams) =>
  fly(node, { y: 20, x: 0, duration: 250, ...params });

export const flyLeft = (node: HTMLElement, params: TransitionParams) =>
  fly(node, { x: -20, y: 0, duration: 250, ...params });

export const flyDown = (node: HTMLElement, params: TransitionParams) =>
  fly(node, { y: -20, x: 0, duration: 250, ...params });

export const scaleIn = (node: HTMLElement, params: TransitionParams) =>
  scale(node, { start: 0.95, duration: 200, ...params });

export const scaleOut = (node: HTMLElement, params: TransitionParams) =>
  scale(node, { start: 1, duration: 150, ...params });
