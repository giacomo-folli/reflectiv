<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let title: string = "";
  export let open: boolean = false;
  export let width: string = "30rem";
  export let closeOnClickOutside: boolean = true;
  export let showCloseButton: boolean = true;

  function closeModal() {
    dispatch("close");
  }

  function handleBackdropClick(e: MouseEvent) {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (open && e.key === "Escape") {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div
    class="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex items-center justify-center p-4"
    role="presentation"
    on:click={handleBackdropClick}
    on:keydown|stopPropagation={handleKeydown}
    transition:fade={{ duration: 150 }}
  >
    <div
      class="bg-white rounded-lg w-full border border-gray-200 flex flex-col overflow-hidden shadow-2xl"
      style="max-width: {width}; max-height: 90vh;"
      transition:scale={{
        duration: 200,
        start: 0.95,
        opacity: 0,
        easing: cubicOut,
      }}
    >
      <div
        class="flex justify-between items-center p-4 sm:px-6 border-b border-gray-100"
      >
        {#if title}
          <h2 class="text-xl font-semibold text-gray-900 m-0">{title}</h2>
        {/if}

        {#if showCloseButton}
          <button
            class="bg-transparent border-none text-4xl leading-none text-gray-400 p-0 flex items-center justify-center transition-colors hover:text-gray-700 hover:bg-gray-100 rounded-full w-6 h-6"
            on:click={closeModal}
            aria-label="Close modal"
          >
            &times;
          </button>
        {/if}
      </div>

      <div class="p-4 sm:p-6 overflow-y-auto text-gray-800 bg-white">
        <slot />
      </div>

      {#if $$slots.footer}
        <div
          class="p-4 sm:px-6 flex justify-end gap-3 border-t border-gray-100"
        >
          <slot name="footer" />
        </div>
      {/if}
    </div>
  </div>
{/if}
