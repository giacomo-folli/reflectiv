<script>
  export let data;
  export let form;

  const { user, links } = data;
  
  let title = '';
  let url = '';
  
  // Reset form after submission
  $: if (form?.success) {
    title = '';
    url = '';
  }
</script>

<svelte:head>
  <title>Manage ChatGPT Links - Monthly Reflection Diary</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Manage ChatGPT Links</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2">
        <div class="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-semibold mb-4">Your Saved Links</h2>
          
          {#if links.length === 0}
            <div class="text-center py-8 text-gray-400">
              <p>You don't have any links saved yet. Add your first ChatGPT link!</p>
            </div>
          {:else}
            <div class="space-y-4">
              {#each links as link}
                <div class="bg-gray-700 rounded-lg p-4">
                  <h3 class="font-medium text-lg">{link.title}</h3>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-indigo-300 text-sm break-all">
                    {link.url}
                  </a>
                  <div class="mt-2 flex justify-between items-center">
                    <span class="text-gray-400 text-xs">
                      Added on {new Date(link.createdAt).toLocaleDateString()}
                    </span>
                    <form action="?/deleteLink" method="POST">
                      <input type="hidden" name="linkId" value={link.id} />
                      <button type="submit" class="text-red-400 hover:text-red-300 text-sm">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
      
      <div class="md:col-span-1">
        <div class="bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4">
          <h2 class="text-xl font-semibold mb-4">Add New Link</h2>
          
          <form action="?/addLink" method="POST">
            <div class="mb-4">
              <label for="title" class="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input 
                type="text"
                id="title"
                name="title"
                bind:value={title}
                placeholder="E.g., AI Research Discussion"
                class="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {#if form?.errors?.title}
                <p class="text-red-400 text-sm mt-1">{form.errors.title}</p>
              {/if}
            </div>
            
            <div class="mb-6">
              <label for="url" class="block text-sm font-medium text-gray-300 mb-2">ChatGPT Link</label>
              <input 
                type="url"
                id="url"
                name="url"
                bind:value={url}
                placeholder="https://chat.openai.com/share/..."
                class="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {#if form?.errors?.url}
                <p class="text-red-400 text-sm mt-1">{form.errors.url}</p>
              {/if}
            </div>
            
            <button type="submit" class="btn btn-primary w-full">
              Save Link
            </button>
            
            {#if form?.success}
              <p class="text-green-400 text-sm mt-2 text-center">Link added successfully!</p>
            {/if}
          </form>
          
          <div class="mt-6 text-sm text-gray-400">
            <p>Save links to your valuable ChatGPT conversations for easy access later.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>