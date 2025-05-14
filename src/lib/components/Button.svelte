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
    ripple.classList.add("ripple");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    // Remove ripple after animation completes
    setTimeout(() => ripple.remove(), 600);

    dispatch("click", e);
  }

  // Calculate button classes based on props
  $: buttonClass = `btn btn-${variant} btn-${size} ${loading ? "loading" : ""} ${icon ? "with-icon" : ""} ${rightIcon ? "with-right-icon" : ""} ${fullWidth ? "full-width" : ""}`;
</script>

<button
  {type}
  class={buttonClass}
  on:click={handleClick}
  {disabled}
  {...$$restProps}
>
  {#if loading}
    <Spinner
      size={size === "sm" ? 16 : size === "lg" ? 24 : 20}
      color="currentColor"
      immediate={true}
    />
  {:else if icon}
    <span class="icon">
      <slot name="icon"></slot>
    </span>
  {/if}

  <span class="label">
    <slot></slot>
  </span>

  {#if rightIcon && !loading}
    <span class="right-icon">
      <slot name="right-icon"></slot>
    </span>
  {/if}
</button>

<style>
  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    border-radius: 0.375rem;
    overflow: hidden;
    cursor: pointer;
    border: none;
    transition: all 0.15s ease;
    font-family: inherit;
    white-space: nowrap;
  }

  .btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.4);
  }

  .btn-sm {
    height: 2rem;
    font-size: 0.875rem;
    padding: 0 0.75rem;
    min-width: 4rem;
  }

  .btn-md {
    height: 2.5rem;
    font-size: 0.975rem;
    padding: 0 1rem;
    min-width: 5rem;
  }

  .btn-lg {
    height: 3rem;
    font-size: 1.125rem;
    padding: 0 1.25rem;
    min-width: 6rem;
  }

  /* Button variants */
  .btn-primary {
    background-color: #6366f1;
    color: white;
  }

  .btn-primary:hover {
    background-color: #4f46e5;
  }

  .btn-primary:active {
    background-color: #4338ca;
    transform: translateY(1px);
  }

  .btn-secondary {
    background-color: #4b5563;
    color: white;
  }

  .btn-secondary:hover {
    background-color: #374151;
  }

  .btn-secondary:active {
    background-color: #1f2937;
    transform: translateY(1px);
  }

  .btn-outline {
    background-color: transparent;
    border: 1px solid #6366f1;
    color: #6366f1;
  }

  .btn-outline:hover {
    background-color: rgba(99, 102, 241, 0.1);
  }

  .btn-outline:active {
    background-color: rgba(99, 102, 241, 0.2);
    transform: translateY(1px);
  }

  .btn-ghost {
    background-color: transparent;
    color: #6366f1;
  }

  .btn-ghost:hover {
    background-color: rgba(99, 102, 241, 0.1);
  }

  .btn-ghost:active {
    background-color: rgba(99, 102, 241, 0.2);
    transform: translateY(1px);
  }

  .btn-danger {
    background-color: #ef4444;
    color: white;
  }

  .btn-danger:hover {
    background-color: #dc2626;
  }

  .btn-danger:active {
    background-color: #b91c1c;
    transform: translateY(1px);
  }

  /* Full width button */
  .full-width {
    width: 100%;
  }

  /* Disabled state */
  .btn[disabled] {
    opacity: 0.65;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Loading state */
  .btn.loading {
    color: transparent !important;
  }

  .btn.loading .label {
    visibility: hidden;
  }

  /* Ripple effect */
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  /* Icon styling */
  .icon {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
  }

  .right-icon {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
  }

  .with-icon {
    padding-left: 0.75rem;
  }

  .with-right-icon {
    padding-right: 0.75rem;
  }
</style>
