<script>
  import { fade } from 'svelte/transition';
  
  // Size in pixels
  export let size = 24;
  
  // Color of the spinner
  export let color = '#6366f1';
  
  // Width of the spinner stroke
  export let width = 3;
  
  // Delay before showing spinner (prevents flashing for quick loads)
  export let delay = 300;
  
  // Whether to show immediately (e.g., for long operations)
  export let immediate = false;
  
  let show = immediate;
  let timeout;
  
  // Only show spinner after delay
  if (!immediate) {
    timeout = setTimeout(() => {
      show = true;
    }, delay);
  }
  
  // Clean up timeout if component is destroyed
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    if (timeout) clearTimeout(timeout);
  });
</script>

{#if show}
  <div 
    class="spinner"
    style="--size: {size}px; --color: {color}; --width: {width}px;"
    in:fade={{ duration: 150 }}
    out:fade={{ duration: 100 }}
  >
    <svg viewBox="0 0 50 50">
      <circle 
        class="path" 
        cx="25" 
        cy="25" 
        r="20" 
        fill="none" 
        stroke-width="5"
      ></circle>
    </svg>
  </div>
{/if}

<style>
  .spinner {
    display: inline-block;
    width: var(--size);
    height: var(--size);
    position: relative;
  }
  
  svg {
    animation: rotate 1.5s linear infinite;
    width: 100%;
    height: 100%;
  }
  
  .path {
    stroke: var(--color);
    stroke-width: var(--width);
    stroke-linecap: round;
    transform-origin: center;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
</style>