<script>
  import { page } from "$app/stores";
  import PageTransition from "$lib/components/PageTransition.svelte";
  import Transition from "$lib/components/Transition.svelte";
  import Toast from "$lib/components/Toast.svelte";
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";

  export let data;

  $: user = data?.user || undefined;

  let initialLoad = true;
  onMount(() => {
    setTimeout(() => (initialLoad = false), 100);
  });
</script>

<div class="h-full flex flex-col min-h-screen">
  <!-- Toast notifications -->
  <Toast position="top-right" />

  <header class="bg-gray-800 py-4 border-b border-gray-700">
    <Navbar bind:user />
  </header>

  <main class="h-full flex-1 py-8 relative z-10">
    <PageTransition url={$page.url.pathname} immediate={initialLoad}>
      <slot />
    </PageTransition>
  </main>

  <footer class="bg-gray-800 py-3 text-center border-t border-gray-700">
    <div class="container max-w-6xl mx-auto px-4">
      <Transition transition="fadeIn" delay={400} duration={200}>
        <p class="text-gray-400 text-[12px] tracking-wider">
          reflectiv - made with ♥️ & ☕ by
          <a href="https://github.com/giacomo-folli" target="_blank">
            giacomo folli
          </a>
        </p>
      </Transition>
    </div>
  </footer>
</div>

<style>
  /* These styles are required to maintain the page transition functionality */
  :global(.page-transition) {
    will-change: transform, opacity;
  }

  /* Global base styles that can't be handled by Tailwind */
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: #111827;
    color: #f3f4f6;
    margin: 0;
    padding: 0;
    line-height: 1.6;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
