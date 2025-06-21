<script lang="ts">
  import Spinner from "./Spinner.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let variant: "primary" = "primary";
  export let size: "md" | "sm" | "lg" = "md";
  export let type: "button" = "button";
  export let fullWidth = false;
  export let disabled = false;
  export let loading = false;
  export let icon = false;
  export let rightIcon = false;

  function handleClick(e: MouseEvent) {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    // Create ripple effect
    const button = e.currentTarget as HTMLElement;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.classList.add("absolute", "rounded-full", "bg-white/40", "pointer-events-none", "transform", "scale-0", "animate-ripple");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    // Remove ripple after animation completes
    setTimeout(() => ripple.remove(), 600);

    dispatch("click", e);
  }

  // Calculate button classes based on props
  $: variantClasses = {
    primary: "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700",
    secondary: "bg-gray-600 hover:bg-gray-700 active:bg-gray-800",
    outline: "bg-transparent border border-indigo-500 text-indigo-500 hover:bg-indigo-500/10 active:bg-indigo-500/20",
    ghost: "bg-transparent text-indigo-500 hover:bg-indigo-500/10 active:bg-indigo-500/20",
    danger: "bg-red-500 hover:bg-red-600 active:bg-red-700"
  }[variant] || "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700";

  $: sizeClasses = {
    sm: "h-8 text-sm px-3 min-w-16",
    md: "h-10 text-base px-4 min-w-20",
    lg: "h-12 text-lg px-5 min-w-24"
  }[size] || "h-10 text-base px-4 min-w-20";

  $: buttonClasses = `
    relative inline-flex items-center justify-center font-medium rounded-md 
    overflow-hidden cursor-pointer border-none transition-all duration-150 
    focus:outline-none focus:ring-2 focus:ring-indigo-500/40 
    ${variantClasses} 
    ${sizeClasses} 
    ${loading ? "text-transparent" : ""} 
    ${icon ? "pl-3" : ""} 
    ${rightIcon ? "pr-3" : ""} 
    ${fullWidth ? "w-full" : ""} 
    ${disabled ? "opacity-65 cursor-not-allowed pointer-events-none" : ""}
    active:translate-y-px
  `.trim().replace(/\s+/g, ' ');
</script>

<button
  {type}
  class={buttonClasses}
  on:click={handleClick}
  {disabled}
  {...$$restProps}
>
  {#if loading}
    <div class="absolute inset-0 flex items-center justify-center">
      <Spinner
        size={size === "sm" ? 16 : size === "lg" ? 24 : 20}
        color="currentColor"
        immediate={true}
      />
    </div>
  {:else if icon}
    <span class="flex items-center mr-2">
      <slot name="icon"></slot>
    </span>
  {/if}

  <span class={loading ? "invisible" : ""}>
    <slot></slot>
  </span>

  {#if rightIcon && !loading}
    <span class="flex items-center ml-2">
      <slot name="right-icon"></slot>
    </span>
  {/if}
</button>

<style global>
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .animate-ripple {
    animation: ripple 0.6s linear;
  }
</style>