<script>
  import { getDiaryPreview } from '$lib/utils/pdfGenerator.js';
  
  export let month;
  export let year;
  
  $: previewItems = getDiaryPreview(month, year);
</script>

<div class="card bg-gray-800 p-6 rounded-lg shadow-lg">
  <h2 class="text-xl font-semibold mb-4">Preview</h2>
  
  {#if previewItems.length > 0}
    <div class="space-y-4">
      {#each previewItems as item (item.day)}
        <div class="border-l-4 border-indigo-500 pl-4">
          <p class="font-medium text-white">Day {item.day} - {item.dayOfWeek}</p>
          <p class="text-gray-300 text-sm mt-1">{item.question}</p>
        </div>
      {/each}
      
      <div class="mt-4 text-gray-400 text-sm italic">
        <p>Plus {getDiaryPreview(month, year).length - previewItems.length} more days...</p>
      </div>
    </div>
  {:else}
    <p class="text-gray-400">Select a month and year to preview questions</p>
  {/if}
</div>