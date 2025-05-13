<script>
  export let data;
  
  $: user = data?.user;
</script>

<div class="app">
  <header>
    <div class="container">
      <div class="logo">
        <a href="/">
          <span class="book-icon">📕</span>
          Reflection Diary
        </a>
      </div>
      
      <nav>
        {#if user}
          <a href="/">Home</a>
          <a href="/links">Links</a>
          <form action="/logout" method="POST">
            <button type="submit" class="nav-link">Logout</button>
          </form>
        {:else}
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Sign Up</a>
        {/if}
      </nav>
    </div>
  </header>
  
  <main>
    <slot />
  </main>
  
  <footer>
    <div class="container">
      <p>© 2025 Reflection Diary. All rights reserved.</p>
    </div>
  </footer>
</div>

<style>
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