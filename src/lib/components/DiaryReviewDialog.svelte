<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { DateTime } from 'luxon';
  
  export let month: number;
  export let year: number;
  export let diaryContent: {
    questions: string[];
    monthlyMantra: string;
    weeklyFocus: string[];
  };
  
  const dispatch = createEventDispatcher();
  
  // For pagination of questions
  let currentPage = 0;
  const questionsPerPage = 10;
  
  $: totalPages = Math.ceil(diaryContent.questions.length / questionsPerPage);
  $: displayQuestions = diaryContent.questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );
  
  function nextPage() {
    if (currentPage < totalPages - 1) {
      currentPage++;
    }
  }
  
  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
    }
  }
  
  function updateQuestion(index: number, newValue: string) {
    const actualIndex = currentPage * questionsPerPage + index;
    diaryContent.questions[actualIndex] = newValue;
  }
  
  function updateMantra(newValue: string) {
    diaryContent.monthlyMantra = newValue;
  }
  
  function updateWeeklyFocus(index: number, newValue: string) {
    diaryContent.weeklyFocus[index] = newValue;
  }
  
  function confirm() {
    dispatch('confirm', diaryContent);
  }
  
  function cancel() {
    dispatch('cancel');
  }
  
  // Get month name
  const monthName = DateTime.local(year, month).toFormat('MMMM');
</script>

<div class="flex flex-col h-full text-gray-200 p-6">
  <div class="flex justify-between items-start pb-6 border-b border-gray-700 mb-6">
    <div class="flex-1">
      <h2 class="text-2xl font-semibold text-white m-0 mb-2">Review Your {monthName} {year} Reflection Diary</h2>
      <p class="text-gray-400 m-0 text-sm">Customize your diary content before generating the final PDF</p>
    </div>
    <button 
      on:click={cancel} 
      class="bg-transparent border-none text-gray-400 text-3xl leading-none cursor-pointer p-1 rounded hover:text-white hover:bg-white/10 transition-colors ml-4"
      aria-label="Close"
    >×</button>
  </div>
  
  <div class="flex-1 overflow-y-auto pr-4">
    <section class="mb-10 bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
      <h3 class="text-lg font-medium text-white m-0 mb-2">Monthly Mantra</h3>
      <p class="text-gray-400 text-sm m-0 mb-4">This mantra will appear on the cover page of your diary</p>
      <textarea 
        bind:value={diaryContent.monthlyMantra}
        on:input={() => updateMantra(diaryContent.monthlyMantra)}
        rows="2"
        class="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white font-inherit text-base resize-vertical focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25"
      ></textarea>
    </section>
    
    <section class="mb-10 bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
      <h3 class="text-lg font-medium text-white m-0 mb-2">Weekly Focus Areas</h3>
      <p class="text-gray-400 text-sm m-0 mb-4">These focus areas will help guide your reflections each week</p>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {#each diaryContent.weeklyFocus as focus, i}
          <div class="flex flex-col">
            <label for="focus-{i}" class="text-sm text-gray-300 mb-1">Week {i+1}</label>
            <input 
              id="focus-{i}" 
              type="text" 
              bind:value={diaryContent.weeklyFocus[i]}
              on:input={(e) => updateWeeklyFocus(i, e.currentTarget.value)}
              class="bg-gray-800 border border-gray-700 rounded-md p-3 text-white font-inherit text-base w-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25"
            />
          </div>
        {/each}
      </div>
    </section>
    
    <section class="mb-10 bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
      <div class="flex justify-between items-center flex-wrap gap-4 mb-3">
        <h3 class="text-lg font-medium text-white m-0">Daily Reflection Questions</h3>
        <div class="flex flex-col items-end gap-1">
          <span class="text-sm text-gray-400">Page {currentPage + 1} of {totalPages}</span>
          <div class="flex gap-2">
            <button 
              on:click={prevPage} 
              disabled={currentPage === 0} 
              class="bg-gray-700 border-none py-1.5 px-3 rounded text-sm text-gray-200 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
            >
              ← Previous
            </button>
            <button 
              on:click={nextPage} 
              disabled={currentPage === totalPages - 1} 
              class="bg-gray-700 border-none py-1.5 px-3 rounded text-sm text-gray-200 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
      
      <p class="text-gray-400 text-sm m-0 mb-4">Customize these questions that will appear on each day of your diary</p>
      
      <div class="grid gap-2">
        {#each displayQuestions as question, i}
          <div class="flex flex-col bg-gray-800/70 py-1 rounded-md">
            <label for="question-{i}" class="text-base text-gray-300 mb-2 font-medium">Day {currentPage * questionsPerPage + i + 1}</label>
            <textarea 
              id="question-{i}" 
              rows="1"
              bind:value={displayQuestions[i]}
              on:input={(e) => updateQuestion(i, e.currentTarget.value)}
              class="bg-gray-800 border border-gray-700 rounded-md p-3 text-white font-inherit text-base w-full resize-vertical focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25"
            ></textarea>
          </div>
        {/each}
      </div>
    </section>
  </div>
  
  <div class="flex justify-end gap-3 pt-6 border-t border-gray-700 mt-6">
    <button 
      on:click={cancel} 
      class="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium bg-gray-600 hover:bg-gray-700 text-white transition-all"
    >
      Cancel
    </button>
    <button 
      on:click={confirm} 
      class="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium bg-indigo-500 hover:bg-indigo-600 text-white transition-all hover:-translate-y-0.5"
    >
      Generate PDF
    </button>
  </div>
</div>