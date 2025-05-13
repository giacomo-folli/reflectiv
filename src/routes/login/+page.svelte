<script>
  export let form;
</script>

<svelte:head>
  <title>Login - Monthly Reflection Diary</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">Log in</h1>
    
    <div class="card bg-gray-800 rounded-lg shadow-lg p-6">
      <form method="POST" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your.email@example.com"
            required
            class="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {#if form?.errors?.email}
            <p class="text-red-400 text-sm mt-1">{form.errors.email}</p>
          {/if}
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            required
            class="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {#if form?.errors?.password}
            <p class="text-red-400 text-sm mt-1">{form.errors.password}</p>
          {/if}
        </div>
        
        <div>
          <button type="submit" class="btn btn-primary w-full">
            Log in
          </button>
        </div>
        
        {#if form?.error}
          <div class="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md text-sm">
            {form.error}
          </div>
        {/if}
      </form>
      
      <div class="mt-6 text-center text-sm text-gray-400">
        <p>
          Don't have an account?
          <a href="/register" class="text-indigo-400 hover:text-indigo-300">
            Register
          </a>
        </p>
      </div>
    </div>
  </div>
</div>