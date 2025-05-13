<script>
  export let type = "button";
  export let variant = "primary"; // primary, secondary, danger
  export let disabled = false;
  export let fullWidth = false;
  export let loading = false;
  export let icon = null;
</script>

<button
  {type}
  {disabled}
  class="flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors 
    {variant === 'primary' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 
    variant === 'secondary' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 
    variant === 'danger' ? 'bg-red-600 hover:bg-red-700 text-white' : ''}
    {disabled ? 'opacity-50 cursor-not-allowed' : ''}
    {fullWidth ? 'w-full' : ''}"
  on:click
>
  {#if loading}
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  {:else if icon}
    <span class="mr-2">{@html icon}</span>
  {/if}
  <slot></slot>
</button>
