<script>
  // Button variant: primary, secondary, outline, ghost, danger
  export let variant = 'primary';
  
  // Button size: sm, md, lg
  export let size = 'md';
  
  // Button type
  export let type = 'button';
  
  // Is the button disabled?
  export let disabled = false;
  
  // Is the button currently in a loading state?
  export let loading = false;
  
  // Optional icon component (slot)
  export let icon = false;
  
  // Handle click event
  function handleClick(e) {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    
    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // Calculate button classes based on props
  $: buttonClass = `btn btn-${variant} btn-${size} ${loading ? 'loading' : ''} ${icon ? 'with-icon' : ''}`;
</script>

<button 
  {type} 
  class={buttonClass} 
  on:click={handleClick} 
  {disabled}
  {...$$restProps}
>
  {#if loading}
    <span class="spinner"></span>
  {/if}
  
  {#if icon && !loading}
    <span class="icon">
      <slot name="icon"></slot>
    </span>
  {/if}
  
  <slot></slot>
</button>

<style>
  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    font-weight: 500;
    border-radius: 0.375rem;
    overflow: hidden;
    cursor: pointer;
    border: none;
    transition: all 0.15s ease;
    font-family: inherit;
  }
  
  .btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.4);
  }
  
  .btn-sm {
    height: 2rem;
    font-size: 0.875rem;
    padding: 0 0.75rem;
  }
  
  .btn-md {
    height: 2.5rem;
    font-size: 0.975rem;
    padding: 0 1rem;
  }
  
  .btn-lg {
    height: 3rem;
    font-size: 1.125rem;
    padding: 0 1.25rem;
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
  }
  
  /* Disabled state */
  .btn[disabled] {
    opacity: 0.65;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  /* Loading state */
  .btn.loading {
    position: relative;
    color: transparent !important;
  }
  
  .btn.loading .spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 2px solid white;
    width: 1rem;
    height: 1rem;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
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
  .btn.with-icon {
    padding-left: 0.75rem;
  }
  
  .icon {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
  }
</style>