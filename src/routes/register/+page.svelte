<script>
  export let form;
</script>

<svelte:head>
  <title>Register - Monthly Reflection Diary</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">Create an Account</h1>
    
    <div class="card bg-gray-800 rounded-lg shadow-lg p-6">
      <form method="POST" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            required
            class="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {#if form?.errors?.name}
            <p class="text-red-400 text-sm mt-1">{form.errors.name}</p>
          {/if}
        </div>
        
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
          <p class="text-xs text-gray-400 mt-1">
            Must be at least 8 characters and contain at least one number
          </p>
          {#if form?.errors?.password}
            <p class="text-red-400 text-sm mt-1">{form.errors.password}</p>
          {/if}
        </div>
        
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            required
            class="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {#if form?.errors?.confirmPassword}
            <p class="text-red-400 text-sm mt-1">{form.errors.confirmPassword}</p>
          {/if}
        </div>
        
        <div>
          <button type="submit" class="btn btn-primary w-full">
            Register
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
          Already have an account?
          <a href="/login" class="text-indigo-400 hover:text-indigo-300">
            Log in
          </a>
        </p>
      </div>
    </div>
  </div>
</div>