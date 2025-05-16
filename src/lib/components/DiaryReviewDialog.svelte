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

<div class="review-dialog">
  <div class="dialog-header">
    <h2>Review Your {monthName} {year} Reflection Diary</h2>
    <p class="subtitle">Customize your diary content before generating the final PDF</p>
  </div>
  
  <div class="dialog-content">
    <section class="mantra-section">
      <h3>Monthly Mantra</h3>
      <p class="section-desc">This mantra will appear on the cover page of your diary</p>
      <textarea 
        bind:value={diaryContent.monthlyMantra}
        on:input={() => updateMantra(diaryContent.monthlyMantra)}
        rows="2"
      ></textarea>
    </section>
    
    <section class="weekly-focus-section">
      <h3>Weekly Focus Areas</h3>
      <p class="section-desc">These focus areas will help guide your reflections each week</p>
      
      <div class="weekly-focus-grid">
        {#each diaryContent.weeklyFocus as focus, i}
          <div class="focus-item">
            <label for="focus-{i}">Week {i+1}</label>
            <input 
              id="focus-{i}" 
              type="text" 
              bind:value={diaryContent.weeklyFocus[i]}
              on:input={(e) => updateWeeklyFocus(i, e.currentTarget.value)}
            />
          </div>
        {/each}
      </div>
    </section>
    
    <section class="questions-section">
      <div class="questions-header">
        <h3>Daily Reflection Questions</h3>
        <div class="pagination">
          <span>Page {currentPage + 1} of {totalPages}</span>
          <div class="pagination-controls">
            <button on:click={prevPage} disabled={currentPage === 0} class="pagination-btn">
              ← Previous
            </button>
            <button on:click={nextPage} disabled={currentPage === totalPages - 1} class="pagination-btn">
              Next →
            </button>
          </div>
        </div>
      </div>
      
      <p class="section-desc">Customize these questions that will appear on each day of your diary</p>
      
      <div class="questions-list">
        {#each displayQuestions as question, i}
          <div class="question-item">
            <label for="question-{i}">Day {currentPage * questionsPerPage + i + 1}</label>
            <textarea 
              id="question-{i}" 
              rows="2"
              bind:value={displayQuestions[i]}
              on:input={(e) => updateQuestion(i, e.currentTarget.value)}
            ></textarea>
          </div>
        {/each}
      </div>
    </section>
  </div>
  
  <div class="dialog-footer">
    <button on:click={cancel} class="btn secondary">Cancel</button>
    <button on:click={confirm} class="btn primary">Generate PDF</button>
  </div>
</div>

<style>
  .review-dialog {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #e2e8f0;
  }
  
  .dialog-header {
    padding-bottom: 1rem;
    border-bottom: 1px solid #334155;
    margin-bottom: 1.5rem;
  }
  
  .dialog-header h2 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
    color: white;
  }
  
  .subtitle {
    color: #94a3b8;
    margin: 0;
    font-size: 0.9rem;
  }
  
  .dialog-content {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
  }
  
  section {
    margin-bottom: 2rem;
  }
  
  h3 {
    font-size: 1.1rem;
    margin: 0 0 0.5rem 0;
    color: white;
  }
  
  .section-desc {
    color: #94a3b8;
    font-size: 0.85rem;
    margin: 0 0 1rem 0;
  }
  
  textarea, input {
    width: 100%;
    background-color: #1e293b;
    border: 1px solid #334155;
    border-radius: 0.375rem;
    padding: 0.75rem;
    color: white;
    font-family: inherit;
    font-size: 0.9rem;
    resize: vertical;
  }
  
  textarea:focus, input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.25);
  }
  
  .weekly-focus-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 640px) {
    .weekly-focus-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .focus-item {
    display: flex;
    flex-direction: column;
  }
  
  .focus-item label {
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
    color: #cbd5e1;
  }
  
  .questions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .pagination {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
    font-size: 0.85rem;
    color: #94a3b8;
  }
  
  .pagination-controls {
    display: flex;
    gap: 0.5rem;
  }
  
  .pagination-btn {
    background-color: #334155;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    color: #e2e8f0;
    cursor: pointer;
  }
  
  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .pagination-btn:not(:disabled):hover {
    background-color: #475569;
  }
  
  .questions-list {
    display: grid;
    gap: 1rem;
  }
  
  .question-item {
    display: flex;
    flex-direction: column;
  }
  
  .question-item label {
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
    color: #cbd5e1;
  }
  
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding-top: 1.25rem;
    border-top: 1px solid #334155;
    margin-top: 1.5rem;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    color: white;
  }
  
  .primary {
    background-color: #6366f1;
  }
  
  .primary:hover {
    background-color: #4f46e5;
  }
  
  .secondary {
    background-color: #475569;
  }
  
  .secondary:hover {
    background-color: #334155;
  }
</style>