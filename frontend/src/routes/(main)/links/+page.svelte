<script lang="ts">
  import { enhance } from "$app/forms";
  import { DateTime } from "luxon";
  import { slide } from "svelte/transition";

  export let data;

  let title: string = "";
  let url: string = "";
  let error: string = "";
  let success: string = "";

  let infoOpen: boolean = false;

  // Reset form after submission
  function resetForm() {
    title = "";
    url = "";
  }

  $: links = [];
</script>

<div class="max-w-4xl mx-auto px-4 py-4">
  <h1 class="text-3xl font-bold text-white text-center mb-2">
    Your ChatGPT Shared Links
  </h1>
  <p class="text-center text-gray-400 mb-8">
    Add links to your shared ChatGPT conversations to create more personalized
    diary questions.
  </p>

  <div class="bg-gray-800 rounded-lg p-6 mb-6">
    <form
      method="POST"
      action="?/addLink"
      use:enhance={() =>
        async ({ result }) => {
          if (result.type === "failure") {
            error =
              result.data?.message?.toString() ||
              "Failed to add link. Please try again.";
            success = "";
          } else if (result.type === "success") {
            success = "Link added successfully!";
            error = "";
            resetForm();
          }
        }}
    >
      {#if error}
        <div
          class="bg-red-900/20 border border-red-500/50 text-red-400 p-3 rounded-md mb-4"
        >
          {error}
        </div>
      {/if}

      {#if success}
        <div
          class="bg-green-900/20 border border-green-500/50 text-green-400 p-3 rounded-md mb-4"
        >
          {success}
        </div>
      {/if}

      <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-end">
        <div class="mb-2 md:mb-0">
          <label for="title" class="block text-gray-300 text-sm mb-2"
            >Link Title (optional)</label
          >
          <input
            type="text"
            id="title"
            name="title"
            placeholder="E.g., Career Planning Discussion"
            bind:value={title}
            class="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div class="mb-2 md:mb-0">
          <label for="url" class="block text-gray-300 text-sm mb-2"
            >ChatGPT Shared Link URL</label
          >
          <input
            type="url"
            id="url"
            name="url"
            placeholder="https://chat.openai.com/share/..."
            required
            bind:value={url}
            class="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <button
            type="submit"
            class="inline-flex items-center justify-center py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
          >
            Add Link
          </button>
        </div>
      </div>
    </form>
  </div>

  <button
    on:click={() => (infoOpen = !infoOpen)}
    class="w-full bg-indigo-900/10 border border-indigo-500/30 rounded-lg p-4 mb-6 text-sm"
  >
    <h3 class="flex items-center text-indigo-300 font-medium">
      <span class="mr-2">ℹ️</span> How to share ChatGPT conversations
    </h3>
    {#if infoOpen}
      <ol transition:slide class="pl-6 text-gray-300 space-y-2 mt-4">
        <li>
          In ChatGPT, click the "Share" button at the top-right of any
          conversation
        </li>
        <li>Choose "Copy Link" to copy the URL to your clipboard</li>
        <li>Paste the URL in the form above and add a title (optional)</li>
      </ol>
    {/if}
  </button>

  <section class="mb-8">
    <h2 class="text-2xl font-bold text-white mb-4">Your Current Links</h2>

    {#if links.length === 0}
      <div class="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
        <p>
          You haven't added any ChatGPT links yet. Add a link to get started.
        </p>
      </div>
    {:else}
      <div class="bg-gray-800 rounded-lg overflow-hidden">
        <div
          class="grid grid-cols-[1.5fr_2.5fr_0.5fr_0.5fr] md:grid-cols-[1.5fr_2.5fr_0.5fr_0.5fr] p-4 bg-gray-700 font-semibold text-sm border-b border-gray-600"
        >
          <div class="text-white">Title</div>
          <div class="text-white hidden sm:block">URL</div>
          <div class="text-white">Added On</div>
          <div class="text-white text-center">Actions</div>
        </div>

        {#each links as link}
          <div
            class="grid grid-cols-[1.5fr_2.5fr_0.5fr_0.5fr] md:grid-cols-[1.5fr_2.5fr_0.5fr_0.5fr] p-4 border-b border-gray-700 items-center"
          >
            <div class="text-gray-200">{link.title || "Untitled"}</div>
            <div class="hidden sm:block">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="w-full text-indigo-300 hover:underline break-all line-clamp-1 pr-4"
              >
                {link.url}
              </a>
            </div>
            <div class="text-gray-400 text-sm">
              {new Date(link.createdAt).toLocaleDateString()}
            </div>
            <div class="text-center">
              <form
                method="POST"
                action="?/deleteLink"
                use:enhance={() =>
                  async ({ result }) => {
                    if (result.type === "failure") {
                      error =
                        result.data?.message?.toString() ||
                        "Failed to delete link. Please try again.";
                      success = "";
                    }
                  }}
              >
                <input type="hidden" name="id" value={link.id} />
                <button
                  type="submit"
                  class="bg-transparent border-0 p-2 rounded hover:bg-red-900/10 transition-colors"
                >
                  <span class="text-red-500 text-xl">🗑️</span>
                </button>
              </form>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <div class="flex justify-center">
    <a
      href="/dashboard"
      class="inline-flex items-center justify-center py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-md transition-colors"
    >
      <span class="mr-2">←</span>
      Back to Home
    </a>
  </div>
</div>
