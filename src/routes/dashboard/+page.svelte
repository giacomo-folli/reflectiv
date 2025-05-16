<script lang="ts">
  import { DateTime } from "luxon";
  import DiaryReviewDialog from "$lib/components/DiaryReviewDialog.svelte";
  import { generateMockReflectionContent } from "$lib/mock-diary-content";

  export let data;

  // Get current date for defaults
  const currentDate = DateTime.now();

  let selectedMonth = currentDate.month.toString(); // 1-12
  let selectedYear = currentDate.year.toString();

  // Prepare month options
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Prepare year options (current year +/- 2 years)
  const years: any[] = [];
  for (let i = currentDate.year - 2; i <= currentDate.year + 2; i++) {
    years.push({ value: i.toString(), label: i.toString() });
  }

  // States for the interactive flow
  let showPreview = false;
  let showReview = false;
  let showConfirmation = false;
  let isLoading = false;
  let errorMessage = "";
  let diaryContent: any = null;

  // Function to show preview dialog
  function openPreview() {
    showPreview = true;
  }

  function closePreview() {
    showPreview = false;
  }

  // Interactive flow: Step 1 - Generate content
  async function startInteractiveFlow() {
    closePreview(); // Close the preview if it was open
    isLoading = true;
    errorMessage = "";
    
    try {
      const month = parseInt(selectedMonth);
      const year = parseInt(selectedYear);
      
      // In a real implementation, this would be a fetch call to the API
      // const response = await fetch(`/api/diary-content?month=${month}&year=${year}`);
      // if (!response.ok) throw new Error('Failed to generate diary content');
      // const data = await response.json();
      
      // Using mock data for now
      diaryContent = generateMockReflectionContent(month, year);
      
      // Move to the review step
      showReview = true;
    } catch (error) {
      console.error('Error generating content:', error);
      errorMessage = 'Failed to generate diary content. Please try again.';
    } finally {
      isLoading = false;
    }
  }

  // Interactive flow: Step 2 - Review and customize
  function handleContentConfirm(event: CustomEvent) {
    // Get the customized content from the review dialog
    diaryContent = event.detail;
    showReview = false;
    generateFinalPDF();
  }

  function handleReviewCancel() {
    showReview = false;
  }

  // Interactive flow: Step 3 - Generate final PDF
  async function generateFinalPDF() {
    isLoading = true;
    errorMessage = "";
    
    try {
      const month = parseInt(selectedMonth);
      const year = parseInt(selectedYear);
      
      // In a real implementation, this would post the customized content to generate the PDF
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          month,
          year,
          content: diaryContent
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      const data = await response.json();
      
      // Show confirmation
      showConfirmation = true;
      
      // In a real implementation, we would trigger the PDF download
      // For now, we're just showing a confirmation
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      errorMessage = 'Failed to generate PDF. Please try again.';
    } finally {
      isLoading = false;
    }
  }

  // Legacy direct PDF generation (will be removed in future)
  function generatePDF() {
    const month = parseInt(selectedMonth);
    const year = parseInt(selectedYear);

    // Navigate to the PDF generation endpoint
    window.location.href = `/api/generate-pdf?month=${month}&year=${year}&from_review=true`;
  }

  // Close the confirmation dialog
  function closeConfirmation() {
    showConfirmation = false;
  }

  // Get month name from month number
  function getMonthName(month: string) {
    return months.find((m) => m.value === month)?.label || "";
  }
</script>

<div class="dashboard">
  <h1>Monthly Reflection Diary Generator</h1>
  <p class="subtitle">
    Create a personalized monthly diary with AI-generated reflection questions
    for each day.
  </p>

  <div class="cta-links">
    <a href="/links" class="add-links-btn">
      <span class="icon">🔗</span>
      Add ChatGPT Links for Better Personalization
    </a>
  </div>

  <div class="generator-form">
    <div class="form-grid">
      <div class="form-group">
        <label for="month">Month</label>
        <select id="month" bind:value={selectedMonth}>
          {#each months as month}
            <option value={month.value}>{month.label}</option>
          {/each}
        </select>
      </div>

      <div class="form-group">
        <label for="year">Year</label>
        <select id="year" bind:value={selectedYear}>
          {#each years as year}
            <option value={year.value}>{year.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="action-buttons">
      <button on:click={openPreview} class="btn preview-btn">
        <span class="icon">👁️</span>
        Preview
      </button>

      <button on:click={startInteractiveFlow} class="btn generate-btn">
        <span class="icon">✨</span>
        Generate Content
      </button>
    </div>
    
    <!-- Show loading indicator -->
    {#if isLoading}
      <div class="loading-indicator">
        <div class="spinner"></div>
        <p>Generating your personalized content...</p>
      </div>
    {/if}
    
    <!-- Show error message if applicable -->
    {#if errorMessage}
      <div class="error-message">
        <p>{errorMessage}</p>
      </div>
    {/if}
  </div>
</div>

<!-- Preview Modal -->
{#if showPreview}
  <div class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h2>Diary Preview</h2>
        <button on:click={closePreview} class="close-btn">&times;</button>
      </div>

      <div class="modal-content">
        <h3>{getMonthName(selectedMonth)} {selectedYear}</h3>

        <p>Your diary will include:</p>

        <ul class="feature-list">
          <li>A beautiful cover page with a personalized monthly mantra</li>
          <li>Weekly focus areas to guide your month</li>
          <li>
            {DateTime.local(parseInt(selectedYear), parseInt(selectedMonth))
              .daysInMonth} daily pages with reflection questions
          </li>
          <li>Space to write your answers</li>
          <li>Clean, printable layout</li>
        </ul>

        <div class="flow-explanation">
          <h4>How it works:</h4>
          <ol>
            <li><strong>Generate Content:</strong> AI creates questions, a monthly mantra, and weekly focus areas</li>
            <li><strong>Review & Customize:</strong> Edit any content to match your preferences</li>
            <li><strong>Generate PDF:</strong> Create your personalized reflection diary</li>
          </ol>
        </div>

        <p class="note">
          The interactive PDF generation allows you to customize all content before creating your diary.
        </p>
      </div>

      <div class="modal-footer">
        <button on:click={closePreview} class="btn secondary">Close</button>
        <button on:click={startInteractiveFlow} class="btn primary">Start Generation</button>
      </div>
    </div>
  </div>
{/if}

<!-- Review Dialog -->
{#if showReview && diaryContent}
  <div class="modal-overlay">
    <div class="modal review-dialog-modal">
      <DiaryReviewDialog 
        month={parseInt(selectedMonth)} 
        year={parseInt(selectedYear)}
        diaryContent={diaryContent}
        on:confirm={handleContentConfirm}
        on:cancel={handleReviewCancel}
      />
    </div>
  </div>
{/if}

<!-- Confirmation Dialog -->
{#if showConfirmation}
  <div class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h2>PDF Generated Successfully!</h2>
        <button on:click={closeConfirmation} class="close-btn">&times;</button>
      </div>

      <div class="modal-content">
        <div class="success-icon">✅</div>
        <h3>Your {getMonthName(selectedMonth)} {selectedYear} Reflection Diary is ready</h3>
        
        <p>Your personalized diary has been created with:</p>
        <ul class="success-list">
          <li>Your customized monthly mantra</li>
          <li>Your personalized weekly focus areas</li>
          <li>{diaryContent.questions.length} daily reflection questions</li>
          <li>Beautiful formatting for easy printing</li>
        </ul>
        
        <div class="download-instructions">
          <p>Click the button below to download your PDF.</p>
          <p class="note">In a real implementation, the PDF would automatically download at this point.</p>
        </div>
      </div>

      <div class="modal-footer">
        <button on:click={closeConfirmation} class="btn secondary">Close</button>
        <button class="btn primary">
          <span class="icon">📥</span>
          Download PDF
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .dashboard {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
  }

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.75rem;
    color: white;
  }

  .subtitle {
    color: #a1a1aa;
    margin-bottom: 2rem;
  }

  .cta-links {
    margin-bottom: 2rem;
  }

  .add-links-btn {
    display: inline-flex;
    align-items: center;
    background-color: rgba(91, 33, 182, 0.2);
    border: 1px solid rgba(139, 92, 246, 0.3);
    color: #a78bfa;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    text-decoration: none;
    font-size: 0.9rem;
    transition:
      background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out;
  }

  .add-links-btn:hover {
    background-color: rgba(91, 33, 182, 0.3);
    border-color: rgba(139, 92, 246, 0.4);
  }

  .icon {
    margin-right: 0.5rem;
  }

  .generator-form {
    background-color: #1e293b;
    border-radius: 0.5rem;
    padding: 2rem;
    position: relative;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 600px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
  }

  .form-group {
    text-align: left;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #d1d5db;
    font-size: 0.9rem;
  }

  select {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #4b5563;
    background-color: #374151;
    color: white;
    font-size: 1rem;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    color: white;
  }

  .preview-btn {
    background-color: #374151;
  }

  .preview-btn:hover {
    background-color: #4b5563;
  }

  .generate-btn {
    background-color: #6366f1;
  }

  .generate-btn:hover {
    background-color: #4f46e5;
  }

  .loading-indicator {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #a1a1aa;
  }

  .spinner {
    width: 40px;
    height: 40px;
    margin-bottom: 1rem;
    border-radius: 50%;
    border: 3px solid rgba(99, 102, 241, 0.3);
    border-top-color: #6366f1;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .error-message {
    margin-top: 1.5rem;
    padding: 1rem;
    background-color: rgba(239, 68, 68, 0.1);
    border-left: 4px solid #ef4444;
    color: #fca5a5;
    text-align: left;
    border-radius: 0.25rem;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    padding: 1rem;
  }

  .modal {
    background-color: #1e293b;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 600px;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    max-height: calc(100vh - 2rem);
    display: flex;
    flex-direction: column;
  }

  .review-dialog-modal {
    max-width: 800px;
  }

  .modal-header {
    padding: 1.25rem;
    border-bottom: 1px solid #2d3748;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-header h2 {
    font-size: 1.25rem;
    margin: 0;
    color: white;
  }

  .close-btn {
    background: none;
    border: none;
    color: #a1a1aa;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
  }

  .close-btn:hover {
    color: white;
  }

  .modal-content {
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
  }

  .modal-content h3 {
    margin-top: 0;
    margin-bottom: 1.25rem;
    color: white;
    font-size: 1.5rem;
  }

  .feature-list {
    text-align: left;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .feature-list li {
    margin-bottom: 0.5rem;
    color: #d1d5db;
    position: relative;
  }

  .feature-list li::marker {
    color: #8b5cf6;
  }

  .flow-explanation {
    background-color: rgba(99, 102, 241, 0.05);
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1.5rem;
    text-align: left;
  }

  .flow-explanation h4 {
    color: #a5b4fc;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .flow-explanation ol {
    padding-left: 1.5rem;
    margin: 0;
  }

  .flow-explanation li {
    color: #d1d5db;
    margin-bottom: 0.5rem;
  }

  .flow-explanation strong {
    color: #a5b4fc;
  }

  .note {
    background-color: rgba(99, 102, 241, 0.1);
    border-left: 4px solid #6366f1;
    padding: 1rem;
    border-radius: 0.25rem;
    color: #a5b4fc;
    font-size: 0.9rem;
    text-align: left;
  }

  .modal-footer {
    padding: 1.25rem;
    border-top: 1px solid #2d3748;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }

  .modal-footer .btn {
    padding: 0.5rem 1rem;
  }

  .primary {
    background-color: #6366f1;
  }

  .primary:hover {
    background-color: #4f46e5;
  }

  .secondary {
    background-color: #4b5563;
  }

  .secondary:hover {
    background-color: #374151;
  }

  .success-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #22c55e;
  }

  .success-list {
    text-align: left;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .success-list li {
    margin-bottom: 0.5rem;
    color: #d1d5db;
  }

  .success-list li::marker {
    color: #22c55e;
  }

  .download-instructions {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
</style>
