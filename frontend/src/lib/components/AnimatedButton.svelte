<script lang="ts">
  export let variant: "primary" = "primary";
  export let size: "md" | "sm" | "lg" = "md";
  export let type: "button" = "button";
  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let icon: boolean = false;

  function handleClick(e: MouseEvent) {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    // Create ripple effect
    const button = e.currentTarget as HTMLButtonElement;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.classList.add("absolute", "rounded-full", "bg-white/40", "pointer-events-none", "transform", "scale-0", "animate-ripple");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);
  }

  // Calculate button classes based on props
  $: variantClasses = {
    primary: "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white",
    outline: "bg-transparent border border-indigo-500 text-indigo-500 hover:bg-indigo-500/10 active:bg-indigo-500/20",
    ghost: "bg-transparent text-indigo-500 hover:bg-indigo-500/10 active:bg-indigo-500/20",
    danger: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white"
  }[variant] || "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white";

  $: sizeClasses = {
    sm: "h-8 text-sm px-3",
    md: "h-10 text-base px-4",
    lg: "h-12 text-lg px-5"
  }[size] || "h-10 text-base px-4";

  $: buttonClasses = `
    relative inline-flex items-center justify-center font-medium rounded-md 
    overflow-hidden cursor-pointer border-none transition-all duration-150 
    focus:outline-none focus:ring-2 focus:ring-indigo-500/40 
    ${variantClasses} 
    ${sizeClasses} 
    ${loading ? "text-transparent" : ""} 
    ${icon ? "pl-3" : ""} 
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
      <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
    </div>
  {/if}

  {#if icon && !loading}
    <span class="flex items-center mr-2">
      <slot name="icon"></slot>
    </span>
  {/if}

  <span class={loading ? "invisible" : ""}>
    <slot></slot>
  </span>
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