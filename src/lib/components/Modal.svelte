<script>
  import { createEventDispatcher } from 'svelte';
  
  export let title = '';
  export let isOpen = false;
  
  const dispatch = createEventDispatcher();
  
  function close() {
    dispatch('close');
  }
  
  // Close modal on ESC key
  function handleKeydown(e) {
    if (e.key === 'Escape' && isOpen) {
      close();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-xl font-semibold text-white">{title}</h2>
        <button on:click={close} class="text-gray-400 hover:text-white" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
{/if}
