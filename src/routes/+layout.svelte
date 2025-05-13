<script>
  import '../app.css';
  
  export let data;
  
  $: user = data.user;
</script>

<header class="bg-gray-800 border-b border-gray-700">
  <div class="container mx-auto px-4 py-4 flex justify-between items-center">
    <a href="/" class="text-xl font-bold text-white">Reflection Diary</a>
    
    <nav>
      <ul class="flex space-x-6">
        {#if user}
          <li><a href="/dashboard" class="text-gray-300 hover:text-white">Dashboard</a></li>
          <li><a href="/links" class="text-gray-300 hover:text-white">My Links</a></li>
          <li>
            <form action="/logout" method="POST">
              <button type="submit" class="text-gray-300 hover:text-white">Log out</button>
            </form>
          </li>
        {:else}
          <li><a href="/login" class="text-gray-300 hover:text-white">Log in</a></li>
          <li><a href="/register" class="text-gray-300 hover:text-white">Register</a></li>
        {/if}
      </ul>
    </nav>
  </div>
</header>

<main>
  <slot />
</main>

<footer class="bg-gray-800 py-8 mt-16">
  <div class="container mx-auto px-4 text-center text-gray-400">
    <p>&copy; 2025 Monthly Reflection Diary. All rights reserved.</p>
  </div>
</footer>