<script>
  import { onMount } from 'svelte';
</script>

<svelte:head>
  <title>Monthly Reflection Diary</title>
</svelte:head>

<main class="min-h-screen bg-gray-900 text-white">
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Monthly Reflection Diary</h1>
        <p class="text-xl text-gray-300">
          Generate personalized reflection diaries and manage your ChatGPT conversations
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="card p-6 rounded-lg bg-gray-800 shadow-lg">
          <h2 class="text-2xl font-semibold mb-4">Generate Monthly Reflection</h2>
          <p class="mb-6 text-gray-300">
            Create a personalized diary with daily reflection questions based on the month and year.
          </p>
          <a href="/dashboard" class="btn btn-primary block text-center">
            Create Diary
          </a>
        </div>

        <div class="card p-6 rounded-lg bg-gray-800 shadow-lg">
          <h2 class="text-2xl font-semibold mb-4">Manage ChatGPT Links</h2>
          <p class="mb-6 text-gray-300">
            Store and organize links to your valuable ChatGPT conversations.
          </p>
          <a href="/links" class="btn btn-primary block text-center">
            View Links
          </a>
        </div>
      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-400">
          New user? <a href="/register" class="text-indigo-400 hover:text-indigo-300">Register</a> or 
          <a href="/login" class="text-indigo-400 hover:text-indigo-300">Log in</a> to get started
        </p>
      </div>
    </div>
  </div>
</main>

<style>
  /* Additional styles can be added here if needed */
</style>