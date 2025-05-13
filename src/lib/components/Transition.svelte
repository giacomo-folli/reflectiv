<script>
  import * as transitions from '$lib/utils/transitionUtils';
  
  export let transition = 'fadeIn';
  export let duration = undefined; // Make explicit it's optional
  export let delay = 0;
  export let easing = undefined; // Make explicit it's optional
  export let intensity = undefined;
  export let y = undefined;
  
  // Get the right transition function based on the name
  const getTransition = (name) => {
    if (typeof transitions[name] === 'function') {
      return transitions[name];
    }
    
    // Default to fadeIn if transition not found
    return transitions.fadeIn;
  };
  
  // Build params to pass to the transition
  $: params = { delay };
  $: if (duration !== undefined) params.duration = duration;
  $: if (easing !== undefined) params.easing = easing;
  $: if (intensity !== undefined) params.intensity = intensity;
  $: if (y !== undefined) params.y = y;
  
  // Get the transition function
  $: transitionFn = getTransition(transition);
</script>

<div use:transitionFn={params}>
  <slot />
</div>

<style>
  div {
    display: contents;
  }
</style>