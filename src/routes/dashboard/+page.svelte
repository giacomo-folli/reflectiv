<script>
  import { getMonthOptions, getYearOptions, getCurrentMonthYear } from '$lib/utils/dateUtils.js';
  import DiaryPreview from '$lib/components/DiaryPreview.svelte';
  
  export let data;
  
  const { user } = data;
  const months = getMonthOptions();
  const years = getYearOptions();
  const currentDate = getCurrentMonthYear();
  
  let selectedMonth = currentDate.month;
  let selectedYear = currentDate.year;
  
  function handleDownload() {
    window.location.href = `/api/generate-pdf?month=${selectedMonth}&year=${selectedYear}`;
  }
</script>

<svelte:head>
  <title>Dashboard - Monthly Reflection Diary</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    
    <div class="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Generate Monthly Reflection Diary</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div class="mb-6">
            <label for="month" class="block text-sm font-medium text-gray-300 mb-2">Month</label>
            <select 
              id="month" 
              bind:value={selectedMonth} 
              class="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {#each months as month}
                <option value={month.value}>{month.label}</option>
              {/each}
            </select>
          </div>
          
          <div class="mb-6">
            <label for="year" class="block text-sm font-medium text-gray-300 mb-2">Year</label>
            <select 
              id="year" 
              bind:value={selectedYear} 
              class="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {#each years as year}
                <option value={year.value}>{year.label}</option>
              {/each}
            </select>
          </div>
          
          <button 
            on:click={handleDownload}
            class="btn btn-primary w-full"
          >
            Download PDF
          </button>
        </div>
        
        <DiaryPreview {selectedMonth} {selectedYear} />
      </div>
    </div>
    
    <div class="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Your Stats</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-gray-700 p-4 rounded-lg">
          <h3 class="text-lg font-medium mb-2">Saved ChatGPT Links</h3>
          <p class="text-3xl font-bold text-indigo-400">{data.linkCount || 0}</p>
        </div>
        
        <div class="bg-gray-700 p-4 rounded-lg">
          <h3 class="text-lg font-medium mb-2">Generated PDFs</h3>
          <p class="text-3xl font-bold text-indigo-400">{data.pdfCount || 0}</p>
        </div>
      </div>
      
      <div class="mt-6">
        <a href="/links" class="text-indigo-400 hover:text-indigo-300">
          Manage your ChatGPT links →
        </a>
      </div>
    </div>
  </div>
</div>