<script>
  import { page } from '$app/stores';
  import PageTransition from '$lib/components/PageTransition.svelte';
  import Transition from '$lib/components/Transition.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  
  export let data;
  
  $: user = data?.user;
  
  // Only animate after initial page load
  let initialLoad = true;
  
  onMount(() => {
    // Set initialLoad to false after component is mounted
    setTimeout(() => {
      initialLoad = false;
    }, 100);
  });
</script>

<div class="app">
  <!-- Toast notifications -->
  <Toast position="top-right" />
  
  <header>
    <div class="container">
      <Transition transition="flyRight" delay={100} duration={300}>
        <div class="logo">
          <a href="/">
            <span class="book-icon">📕</span>
            Reflection Diary
          </a>
        </div>
      </Transition>
      
      <nav>
        {#if user}
          <Transition transition="fadeIn" delay={200} duration={200}>
            <a href="/" class="nav-link-animated">Home</a>
          </Transition>
          <Transition transition="fadeIn" delay={250} duration={200}>
            <a href="/links" class="nav-link-animated">Links</a>
          </Transition>
          <Transition transition="fadeIn" delay={300} duration={200}>
            <form action="/logout" method="POST">
              <button type="submit" class="nav-link nav-link-animated">Logout</button>
            </form>
          </Transition>
          <Transition transition="fadeIn" delay={350} duration={200}>
            <LanguageSwitcher />
          </Transition>
        {:else}
          <Transition transition="fadeIn" delay={200} duration={200}>
            <a href="/" class="nav-link-animated">Home</a>
          </Transition>
          <Transition transition="fadeIn" delay={250} duration={200}>
            <a href="/login" class="nav-link-animated">Login</a>
          </Transition>
          <Transition transition="fadeIn" delay={300} duration={200}>
            <a href="/register" class="nav-link-animated">Sign Up</a>
          </Transition>
          <Transition transition="fadeIn" delay={350} duration={200}>
            <LanguageSwitcher />
          </Transition>
        {/if}
      </nav>
    </div>
  </header>
  
  <main>
    <PageTransition url={$page.url.pathname} immediate={initialLoad}>
      <slot />
    </PageTransition>
  </main>
  
  <footer>
    <div class="container">
      <Transition transition="fadeIn" delay={400} duration={200}>
        <p>© 2025 Reflection Diary. All rights reserved.</p>
      </Transition>
    </div>
  </footer>
</div>

<style>
  /* Add these new styles for micro-interactions */
  :global(.nav-link-animated) {
    position: relative;
  }
  
  :global(.nav-link-animated::after) {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #6366f1;
    transition: width 0.3s ease;
  }
  
  :global(.nav-link-animated:hover::after) {
    width: 100%;
  }
  
  /* Smooth page transitions */
  :global(main) {
    position: relative;
    z-index: 1;
  }
  
  :global(.page-transition) {
    will-change: transform, opacity;
  }

  /* Original layout styles */
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #111827;
    color: #f3f4f6;
    margin: 0;
    padding: 0;
    line-height: 1.6;
  }
  
  :global(*) {
    box-sizing: border-box;
  }
  
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  header {
    background-color: #1a202c;
    padding: 1rem 0;
    border-bottom: 1px solid #2d3748;
  }
  
  header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo a {
    display: flex;
    align-items: center;
    color: #f3f4f6;
    font-weight: 600;
    text-decoration: none;
    font-size: 1.2rem;
  }
  
  .book-icon {
    margin-right: 0.5rem;
  }
  
  nav {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
  
  nav a, .nav-link {
    color: #a1a1aa;
    text-decoration: none;
    transition: color 0.2s;
    font-size: 0.9rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  nav a:hover, .nav-link:hover {
    color: #f3f4f6;
  }
  
  main {
    flex: 1;
    padding: 2rem 0;
  }
  
  footer {
    background-color: #1a202c;
    padding: 1.5rem 0;
    text-align: center;
    border-top: 1px solid #2d3748;
  }
  
  footer p {
    color: #a1a1aa;
    font-size: 0.9rem;
  }
</style>