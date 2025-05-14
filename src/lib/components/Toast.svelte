<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import toastStore, { removeToast } from "$lib/utils/toastStore";

  export let position: string = "top-right";

  const icons = { info: "📣", success: "✅", warning: "⚠️", error: "❌" };

  $: positionClass = `toast-container position-${position}`;
</script>

<div class={positionClass}>
  {#each $toastStore as toast (toast.id)}
    <div
      class="toast toast-{toast.type}"
      in:fly={{ y: position.includes("top") ? -20 : 20, duration: 300 }}
      out:fade={{ duration: 200 }}
    >
      <div class="toast-icon">
        {icons[toast.type]}
      </div>
      <div class="toast-content">
        {toast.message}
      </div>
      <button class="toast-close" on:click={() => removeToast(toast.id)}>
        &times;
      </button>

      <!-- Progress bar -->
      {#if toast.duration > 0}
        <div
          class="toast-progress"
          style="animation-duration: {toast.duration}ms;"
        />
      {/if}
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 24rem;
    width: 100%;
    padding: 1rem;
    pointer-events: none;
  }

  /* Position variants */
  .position-top-right {
    top: 0;
    right: 0;
  }

  .position-top-left {
    top: 0;
    left: 0;
  }

  .position-bottom-right {
    bottom: 0;
    right: 0;
  }

  .position-bottom-left {
    bottom: 0;
    left: 0;
  }

  .toast {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    pointer-events: auto;
  }

  /* Toast variants */
  .toast-info {
    background-color: #1e40af;
    color: white;
  }

  .toast-success {
    background-color: #047857;
    color: white;
  }

  .toast-warning {
    background-color: #b45309;
    color: white;
  }

  .toast-error {
    background-color: #b91c1c;
    color: white;
  }

  .toast-icon {
    margin-right: 0.75rem;
  }

  .toast-content {
    flex: 1;
    font-size: 0.875rem;
  }

  .toast-close {
    background: none;
    border: none;
    color: currentColor;
    opacity: 0.7;
    cursor: pointer;
    font-size: 1.25rem;
    padding: 0 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
  }

  .toast-close:hover {
    opacity: 1;
  }

  .toast-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.5);
    width: 100%;
    transform-origin: left;
    animation: progress-shrink linear forwards;
  }

  @keyframes progress-shrink {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }

  @media (max-width: 640px) {
    .toast-container {
      max-width: 100%;
    }
  }
</style>
