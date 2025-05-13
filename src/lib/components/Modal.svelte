<script>
  import { fade, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { createEventDispatcher } from 'svelte';
  
  export let title = '';
  export let open = false;
  export let width = '30rem';
  export let closeOnClickOutside = true;
  export let showCloseButton = true;
  
  const dispatch = createEventDispatcher();
  
  // Close the modal
  function closeModal() {
    dispatch('close');
  }
  
  // Handle clicks on the backdrop
  function handleBackdropClick(e) {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      closeModal();
    }
  }
  
  // Handle ESC key press
  function handleKeydown(e) {
    if (open && e.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div 
    class="modal-backdrop" 
    on:click={handleBackdropClick}
    transition:fade={{ duration: 150 }}
  >
    <div 
      class="modal" 
      style="--modal-width: {width};"
      transition:scale={{ duration: 200, start: 0.95, opacity: 0, easing: cubicOut }}  
    >
      <div class="modal-header">
        {#if title}
          <h2 class="modal-title">{title}</h2>
        {/if}
        
        {#if showCloseButton}
          <button class="close-button" on:click={closeModal} aria-label="Close modal">
            &times;
          </button>
        {/if}
      </div>
      
      <div class="modal-content">
        <slot />
      </div>
      
      {#if $$slots.footer}
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  
  .modal {
    background-color: #1a202c;
    border-radius: 0.5rem;
    width: 100%;
    max-width: var(--modal-width);
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border: 1px solid #2d3748;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #2d3748;
  }
  
  .modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: #f3f4f6;
  }
  
  .close-button {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    padding: 0;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a1a1aa;
    cursor: pointer;
    transition: color 0.2s;
    border-radius: 50%;
    line-height: 1;
  }
  
  .close-button:hover {
    color: #f3f4f6;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .modal-content {
    padding: 1.5rem;
    overflow-y: auto;
    color: #e5e7eb;
  }
  
  .modal-footer {
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    border-top: 1px solid #2d3748;
  }
  
  @media (max-width: 640px) {
    .modal {
      max-width: 100%;
      height: auto;
      max-height: 85vh;
    }
    
    .modal-content {
      padding: 1rem;
    }
  }
</style>