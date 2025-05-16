<script>
  import { page } from "$app/stores";
  import PageTransition from "$lib/components/PageTransition.svelte";
  import Transition from "$lib/components/Transition.svelte";
  import Toast from "$lib/components/Toast.svelte";
  import LanguageSwitcher from "$lib/components/LanguageSwitcher.svelte";
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  import "../app.css";

  export let data;

  $: user = data?.user;

  let initialLoad = true;

  onMount(() => {
    setTimeout(() => (initialLoad = false), 100);
  });
</script>

<div class="flex flex-col min-h-screen">
  <!-- Toast notifications -->
  <Toast position="top-right" />

  <header class="bg-gray-800 py-4 border-b border-gray-700">
    <div
      class="container max-w-6xl mx-auto px-4 flex justify-between items-center"
    >
      <Transition transition="flyRight" delay={100} duration={300}>
        <div>
          <a
            href="/"
            class="flex items-center text-gray-100 font-semibold text-xl no-underline"
          >
            <span class="mr-2">📕</span>
            Reflection Diary
          </a>
        </div>
      </Transition>

      <nav class="flex gap-6 items-center">
        {#if user}
          <Transition transition="fadeIn" delay={200} duration={200}>
            <a
              href="/"
              class="text-gray-400 hover:text-white text-sm transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-indigo-500 after:bottom-[-2px] after:left-0 after:transition-all hover:after:w-full"
              >Home</a
            >
          </Transition>
          <Transition transition="fadeIn" delay={250} duration={200}>
            <a
              href="/links"
              class="text-gray-400 hover:text-white text-sm transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-indigo-500 after:bottom-[-2px] after:left-0 after:transition-all hover:after:w-full"
              >Links</a
            >
          </Transition>
          <Transition transition="fadeIn" delay={300} duration={200}>
            <form action="/logout" method="POST">
              <button
                type="submit"
                class="text-gray-400 hover:text-white text-sm transition-colors bg-transparent border-0 p-0 cursor-pointer relative after:absolute after:w-0 after:h-0.5 after:bg-indigo-500 after:bottom-[-2px] after:left-0 after:transition-all hover:after:w-full"
                >Logout</button
              >
            </form>
          </Transition>
          <Transition transition="fadeIn" delay={350} duration={200}>
            <LanguageSwitcher />
          </Transition>
        {:else}
          <Transition transition="fadeIn" delay={200} duration={200}>
            <a
              href="/"
              class="text-gray-400 hover:text-white text-sm transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-indigo-500 after:bottom-[-2px] after:left-0 after:transition-all hover:after:w-full"
              >Home</a
            >
          </Transition>
          <Transition transition="fadeIn" delay={250} duration={200}>
            <a
              href="/login"
              class="text-gray-400 hover:text-white text-sm transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-indigo-500 after:bottom-[-2px] after:left-0 after:transition-all hover:after:w-full"
              >Login</a
            >
          </Transition>
          <Transition transition="fadeIn" delay={300} duration={200}>
            <a
              href="/register"
              class="text-gray-400 hover:text-white text-sm transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-indigo-500 after:bottom-[-2px] after:left-0 after:transition-all hover:after:w-full"
              >Sign Up</a
            >
          </Transition>
          <Transition transition="fadeIn" delay={350} duration={200}>
            <LanguageSwitcher />
          </Transition>
        {/if}
      </nav>
    </div>
  </header>

  <main class="flex-1 py-8 relative z-10">
    <PageTransition url={$page.url.pathname} immediate={initialLoad}>
      <slot />
    </PageTransition>
  </main>

  <footer class="bg-gray-800 py-6 text-center border-t border-gray-700">
    <div class="container max-w-6xl mx-auto px-4">
      <Transition transition="fadeIn" delay={400} duration={200}>
        <p class="text-gray-400 text-sm">
          © 2025 Reflection Diary. All rights reserved.
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
