<script lang="ts">
  import { DateTime } from "luxon";

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

  // Function to show preview dialog
  let showPreview = false;

  function openPreview() {
    showPreview = true;
  }

  function closePreview() {
    showPreview = false;
  }

  // Function to generate the PDF
  function generatePDF() {
    const month = parseInt(selectedMonth);
    const year = parseInt(selectedYear);

    // Navigate to the PDF generation endpoint
    window.location.href = `/api/generate-pdf?month=${month}&year=${year}`;
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

      <button on:click={generatePDF} class="btn generate-btn">
        <span class="icon">📄</span>
        Generate PDF
      </button>
    </div>
  </div>
</div>

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
          <li>A beautiful cover page</li>
          <li>
            {DateTime.local(parseInt(selectedYear), parseInt(selectedMonth))
              .daysInMonth} days (or appropriate number for the month)
          </li>
          <li>Unique AI-generated reflection questions for each day</li>
          <li>Space to write your answers</li>
          <li>Clean, printable layout</li>
        </ul>

        <p class="note">
          Note: This is a preview of what will be generated. The actual PDF will
          contain tailored questions based on the month and seasonal themes.
        </p>
      </div>

      <div class="modal-footer">
        <button on:click={closePreview} class="btn secondary">Close</button>
        <button on:click={generatePDF} class="btn primary">Generate PDF</button>
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
</style>
