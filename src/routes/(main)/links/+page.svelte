<script lang="ts">
  import { enhance } from "$app/forms";
  import { DateTime } from "luxon";
  import { slide } from "svelte/transition";
  import Modal from "$lib/components/Modal.svelte";
  import type { Link } from "$lib/server/schema";

  export let data;

  let title: string = "";
  let url: string = "";
  let error: string = "";
  let success: string = "";

  let infoOpen: boolean = false;
  let addModalOpen = false;

  // Reset form after submission
  function resetForm() {
    title = "";
    url = "";
  }

  let links: Link[] = data.links || [];
  $: links;

  function isLink(obj: any): obj is Link {
    return (
      obj &&
      typeof obj.id === "string" &&
      typeof obj.url === "string" &&
      typeof obj.createdAt === "string" &&
      typeof obj.userId === "string"
    );
  }
</script>

<div class="max-w-6xl mx-auto px-4 py-4">
  <section class="mb-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-gray-900">Your Links</h2>
      <button
        class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors shadow-sm"
        on:click={() => (addModalOpen = true)}
      >
        + Add
      </button>
    </div>

    {#if links.length === 0}
      <div
        class="bg-white border border-gray-100 rounded-lg p-8 text-center text-gray-400 shadow-sm"
      >
        <p>
          You haven't added any ChatGPT links yet. Click "Add" to get started.
        </p>
      </div>
    {:else}
      <div
        class="bg-white border border-gray-100 rounded-lg overflow-x-auto shadow-sm"
      >
        <table class="min-w-full divide-y divide-gray-100">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >Title</th
              >
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell"
                >URL</th
              >
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >Added On</th
              >
              <th
                class="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >Actions</th
              >
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            {#each links as link}
              <tr class="hover:bg-indigo-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-gray-800"
                  >{link.title || "Untitled"}</td
                >
                <td class="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-indigo-700 hover:underline break-all line-clamp-1 pr-4"
                  >
                    {link.url}
                  </a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                  {new Date(link.createdAt).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
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
                        } else if (result.type === "success") {
                          const id = link.id;
                          links = links.filter((l) => l.id !== id);
                        }
                      }}
                  >
                    <input type="hidden" name="id" value={link.id} />
                    <button
                      type="submit"
                      class="bg-transparent border-0 p-2 rounded hover:bg-red-100 transition-colors"
                    >
                      <span class="text-red-600 text-xl">🗑️</span>
                    </button>
                  </form>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </section>

  <!-- Add Link Modal -->
  <Modal
    bind:open={addModalOpen}
    title="Add ChatGPT Link"
    width="32rem"
    on:close={() => (addModalOpen = false)}
  >
    <!-- Info Section -->
    <button
      on:click={() => (infoOpen = !infoOpen)}
      class="w-full bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6 text-sm text-gray-700 hover:bg-indigo-100 transition-colors"
    >
      <h3 class="flex items-center text-indigo-700 font-medium">
        <span class="mr-2">ℹ️</span> How to share ChatGPT conversations
      </h3>
      {#if infoOpen}
        <ol transition:slide class="pl-6 text-gray-700 space-y-2 mt-4">
          <li>
            In ChatGPT, click the "Share" button at the top-right of any
            conversation.
          </li>
          <li>Choose "Copy Link" to copy the URL to your clipboard.</li>
          <li>Paste the URL in the form above and add a title (optional).</li>
        </ol>
      {/if}
    </button>

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
            if (isLink(result.data?.link)) {
              links = [result.data.link, ...links];
            }
            resetForm();
            addModalOpen = false;
          }
        }}
    >
      {#if error}
        <div
          class="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4"
        >
          {error}
        </div>
      {/if}
      {#if success}
        <div
          class="bg-green-50 border border-green-200 text-green-700 p-3 rounded-md mb-4"
        >
          {success}
        </div>
      {/if}
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm mb-2"
          >Link Title (optional)</label
        >
        <input
          type="text"
          id="title"
          name="title"
          placeholder="E.g., Career Planning Discussion"
          bind:value={title}
          class="w-full p-3 rounded-md border border-gray-200 bg-white text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <div class="mb-4">
        <label for="url" class="block text-gray-700 text-sm mb-2"
          >ChatGPT Shared Link URL</label
        >
        <input
          type="url"
          id="url"
          name="url"
          placeholder="https://chat.openai.com/share/..."
          required
          bind:value={url}
          class="w-full p-3 rounded-md border border-gray-200 bg-white text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex items-center justify-center py-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors shadow-sm"
        >
          Add Link
        </button>
      </div>
    </form>
  </Modal>

  <div class="flex justify-center mt-8">
    <a
      href="/dashboard"
      class="inline-flex items-center justify-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-colors border border-gray-200"
    >
      <span class="mr-2">←</span>
      Back to Home
    </a>
  </div>
</div>
