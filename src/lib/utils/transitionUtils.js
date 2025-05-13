import { cubicOut, cubicInOut, elasticOut } from 'svelte/easing';
import { crossfade, fly, fade, slide, scale } from 'svelte/transition';

/**
 * Custom fly transition that can be used for page transitions
 * @param {Node} node - DOM element to animate
 * @param {Object} params - Animation parameters
 * @returns {Object} - Transition object
 */
export function pageTransition(node, { delay = 0, duration = 250 } = {}) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = cubicOut(t);
      return `
        opacity: ${eased};
        transform: translateY(${(1 - eased) * 15}px);
      `;
    }
  };
}

/**
 * Custom scale transition with fade for UI elements
 * @param {Node} node - DOM element to animate
 * @param {Object} params - Animation parameters
 * @returns {Object} - Transition object
 */
export function popIn(node, { delay = 0, duration = 200 } = {}) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = elasticOut(t);
      return `
        opacity: ${t};
        transform: scale(${0.9 + eased * 0.1});
      `;
    }
  };
}

/**
 * Create crossfade transitions for list items
 * @param {Object} params - Parameters for the crossfade
 * @returns {Object} - send and receive transition functions
 */
export function createListTransition(params = {}) {
  return crossfade({
    duration: (d) => Math.sqrt(d * 300),
    fallback: scale,
    ...params
  });
}

/**
 * Stagger children animations
 * @param {Node} node - Container node
 * @param {Object} params - Animation parameters
 */
export function staggerChildren(node, { staggerTime = 50, transition = fade, ...params } = {}) {
  const children = Array.from(node.children);
  
  // Hide all children initially
  children.forEach((child, i) => {
    child.style.opacity = '0';
  });
  
  // Animate children one by one
  let timeouts = [];
  
  children.forEach((child, i) => {
    const timeout = setTimeout(() => {
      // Apply the transition
      const animation = transition(child, { delay: 0, ...params });
      
      // Clean up initial styles
      child.style.opacity = '';
    }, i * staggerTime);
    
    timeouts.push(timeout);
  });
  
  return {
    destroy() {
      // Clean up timeouts if the component is removed before animations complete
      timeouts.forEach(clearTimeout);
    }
  };
}

/**
 * Typewriter effect
 * @param {Node} node - Text node to animate
 * @param {Object} params - Animation parameters
 */
export function typewriter(node, { speed = 1, delay = 0 } = {}) {
  const text = node.textContent;
  const duration = text.length / (speed * 0.01);
  
  return {
    delay,
    duration,
    tick: (t) => {
      const i = Math.trunc(text.length * t);
      node.textContent = text.slice(0, i);
    }
  };
}

// Export common transitions with sensible defaults
export const fadeIn = (node, params) => fade(node, { duration: 200, ...params });
export const fadeOut = (node, params) => fade(node, { duration: 150, ...params });
export const slideIn = (node, params) => slide(node, { duration: 300, ...params });
export const flyRight = (node, params) => fly(node, { x: 20, y: 0, duration: 250, ...params });
export const flyUp = (node, params) => fly(node, { y: 20, x: 0, duration: 250, ...params });