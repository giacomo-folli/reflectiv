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
    class="spinner"
    style="--size: {size}px; --color: {color}; --width: {width}px;"
    in:fade={{ duration: 150 }}
    out:fade={{ duration: 100 }}
  >
    <svg viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"
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
