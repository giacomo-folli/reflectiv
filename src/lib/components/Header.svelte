<script lang="ts">
  export let user = null;
</script>

<header class="bg-gray-800 py-4 px-6 shadow-md">
  <div class="container mx-auto flex justify-between items-center">
    <div class="flex items-center">
      <a href="/" class="flex items-center text-xl font-semibold text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path
            d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
          ></path>
        </svg>
        Reflection Diary
      </a>
    </div>

    <nav>
      <ul class="flex space-x-6">
        <li>
          <a href="/" class="text-gray-300 hover:text-white">Home</a>
        </li>

        {#if user}
          <li>
            <a href="/links" class="text-gray-300 hover:text-white">Links</a>
          </li>
          <li>
            <form action="/logout" method="POST">
              <button type="submit" class="text-gray-300 hover:text-white"
                >Logout</button
              >
            </form>
          </li>
        {:else}
          <li>
            <a href="/login" class="text-gray-300 hover:text-white">Login</a>
          </li>
          <li>
            <a href="/register" class="text-gray-300 hover:text-white"
              >Sign Up</a
            >
          </li>
        {/if}
      </ul>
    </nav>
  </div>
</header>
