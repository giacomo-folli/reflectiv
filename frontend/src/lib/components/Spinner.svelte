<script lang="ts">
  import { fade } from "svelte/transition";
  import { onDestroy } from "svelte";

  export let size: number = 24;
  export let color: string = "#6366f1";
  export let width: number = 3;
  export let delay: number = 300;
  export let immediate: boolean = false;

  let show: typeof immediate = immediate;
  let timeout: NodeJS.Timeout;

  if (!immediate) {
    timeout = setTimeout(() => (show = true), delay);
  }

  onDestroy(() => {
    if (timeout) clearTimeout(timeout);
  });
</script>

{#if show}
  <div
    class="inline-block relative animate-spinner-rotate"
    style="width: {size}px; height: {size}px;"
    in:fade={{ duration: 150 }}
    out:fade={{ duration: 100 }}
  >
    <svg viewBox="0 0 50 50" class="w-full h-full">
      <circle 
        class="spinner-circle" 
        cx="25" 
        cy="25" 
        r="20" 
        fill="none" 
        stroke-width="5"
        style="stroke: {color}; stroke-width: {width}px;"
      ></circle>
    </svg>
  </div>
{/if}

<style global>
  @keyframes spinner-rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spinner-dash {
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

  .animate-spinner-rotate {
    animation: spinner-rotate 1.5s linear infinite;
  }

  .spinner-circle {
    stroke-linecap: round;
    transform-origin: center;
    animation: spinner-dash 1.5s ease-in-out infinite;
  }
</style>