import type { TransitionConfig } from 'svelte/transition';

export interface TransitionParams {
    delay?: number;
    duration?: number;
    easing?: (t: number) => number;
    intensity?: number;
    y?: number;
}

export type TransitionFn = (node: HTMLElement, params: TransitionParams) => TransitionConfig;
