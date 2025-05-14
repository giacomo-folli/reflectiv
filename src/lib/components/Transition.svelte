<script lang="ts">
  import * as transitions from "$lib/utils/transitionUtils";
  import type { TransitionParams, TransitionFn } from "$lib/types/transitions";

  export let transition: keyof typeof transitions = "fadeIn";
  export let duration: number | undefined = undefined;
  export let delay = 0;
  export let easing: ((t: number) => number) | undefined = undefined;
  export let intensity: number | undefined = undefined;
  export let y: number | undefined = undefined;

  $: params = { delay, duration, easing, intensity, y } as TransitionParams;

  const transitionFn = (node: HTMLElement) => {
    const trans = transitions[transition] as TransitionFn;
    let currentConfig = trans(node, params);

    return {
      ...currentConfig,
      update(updatedParams: TransitionParams) {
        const newParams = { ...params, ...updatedParams };
        currentConfig = trans(node, newParams);

        if (currentConfig.tick) {
          currentConfig.tick(1, 0);
        }
      },
    };
  };
</script>

<div use:transitionFn>
  <slot />
</div>

<style>
  div {
    display: contents;
  }
</style>
