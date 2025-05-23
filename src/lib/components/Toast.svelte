<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import toastStore, { removeToast } from "$lib/client/utils/toastStore";

  export let position: string = "top-right";

  const icons = { info: "📣", success: "✅", warning: "⚠️", error: "❌" };

  $: positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0"
  }[position] || "top-0 right-0";

  $: typeClasses = {
    info: "bg-blue-800",
    success: "bg-green-800",
    warning: "bg-amber-700",
    error: "bg-red-700"
  };
</script>

<div class={`fixed z-50 flex flex-col gap-3 max-w-96 w-full p-4 pointer-events-none ${positionClasses}`}>
  {#each $toastStore as toast (toast.id)}
    <div
      class={`flex items-center p-3 rounded-md shadow-lg overflow-hidden pointer-events-auto ${typeClasses[toast.type]} text-white relative`}
      in:fly={{ y: position.includes("top") ? -20 : 20, duration: 300 }}
      out:fade={{ duration: 200 }}
    >
      <div class="mr-3">
        {icons[toast.type]}
      </div>
      <div class="flex-1 text-sm">
        {toast.message}
      </div>
      <button 
        class="bg-transparent border-none text-white/70 cursor-pointer text-xl p-0 flex items-center justify-center transition-opacity hover:opacity-100 hover:bg-white/10 rounded-full w-6 h-6" 
        on:click={() => removeToast(toast.id)}
      >
        &times;
      </button>

      <!-- Progress bar -->
      {#if toast.duration > 0}
        <div
          class="absolute bottom-0 left-0 h-0.5 bg-white/50 origin-left"
          style={`animation: toast-progress-shrink ${toast.duration}ms linear forwards;`}
        />
      {/if}
    </div>
  {/each}
</div>

<style global>
  @keyframes toast-progress-shrink {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }

  @media (max-width: 640px) {
    .max-w-96 {
      max-width: 100%;
    }
  }
</style>