<script>
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  export let url = '';
  
  // Whether to transition immediately (for initial page load)
  export let immediate = false;
</script>

{#key url}
  <div class="page-transition" 
    in:fly={{ y: 20, duration: immediate ? 0 : 300, delay: immediate ? 0 : 100, easing: cubicOut }} 
    out:fly={{ y: -20, duration: immediate ? 0 : 200, easing: cubicOut }}>
    <slot />
  </div>
{/key}

<style>
  .page-transition {
    position: relative;
    display: contents;
  }
</style>