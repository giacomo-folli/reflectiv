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
      console.error("Error generating content:", error);
      errorMessage = "Failed to generate diary content. Please try again.";
    } finally {
      isLoading = false;
    }
  }

  // TO REMOVE
  // TO REMOVE
  // TO REMOVE
  // TO REMOVE
  // TO REMOVE
  startInteractiveFlow();

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

      // Send customized content to generate the PDF
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          month,
          year,
          content: diaryContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Show confirmation without waiting for the PDF to download
      showConfirmation = true;

      // The actual download will happen when the user clicks the Download button in the confirmation dialog
    } catch (error) {
      console.error("Error generating PDF:", error);
      errorMessage = "Failed to generate PDF. Please try again.";
    } finally {
      isLoading = false;
    }
  }

  // Direct PDF download using the customized content
  function generatePDF() {
    const month = parseInt(selectedMonth);
    const year = parseInt(selectedYear);

    // Use the customized content to generate and download the PDF
    // The GET endpoint will receive the data from the POST request we already made
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

<div class="max-w-3xl mx-auto px-4 py-4 text-center">
  <h1 class="text-3xl font-bold mb-3 text-white">
    Monthly Reflection Diary Generator
  </h1>
  <p class="text-gray-400 mb-8">
    Create a personalized monthly diary with AI-generated reflection questions
    for each day.
  </p>

  <div class="mb-8">
    <a
      href="/links"
      class="inline-flex items-center bg-purple-900/20 border border-purple-400/30 text-purple-300 py-3 px-6 rounded-md text-sm hover:bg-purple-900/30 hover:border-purple-400/40 transition-colors"
    >
      <span class="mr-2">🔗</span>
      Add ChatGPT Links for Better Personalization
    </a>
  </div>

  <div class="bg-gray-800 rounded-lg p-8 relative">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      <div class="text-left">
        <label for="month" class="block text-gray-300 text-sm mb-2">Month</label
        >
        <select
          id="month"
          bind:value={selectedMonth}
          class="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
        >
          {#each months as month}
            <option value={month.value}>{month.label}</option>
          {/each}
        </select>
      </div>

      <div class="text-left">
        <label for="year" class="block text-gray-300 text-sm mb-2">Year</label>
        <select
          id="year"
          bind:value={selectedYear}
          class="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
        >
          {#each years as year}
            <option value={year.value}>{year.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        on:click={openPreview}
        class="flex items-center justify-center py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md transition-colors"
      >
        <span class="mr-2">👁️</span>
        Preview
      </button>

      <button
        on:click={startInteractiveFlow}
        class="flex items-center justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
      >
        <span class="mr-2">✨</span>
        Generate Content
      </button>
    </div>

    <!-- Show loading indicator -->
    {#if isLoading}
      <div class="mt-6 flex flex-col items-center text-gray-400">
        <div
          class="w-10 h-10 mb-4 rounded-full border-3 border-indigo-600/30 border-t-indigo-600 animate-spin"
        ></div>
        <p>Generating your personalized content...</p>
      </div>
    {/if}

    <!-- Show error message if applicable -->
    {#if errorMessage}
      <div
        class="mt-6 p-4 bg-red-900/10 border-l-4 border-red-500 text-red-400 text-left rounded"
      >
        <p>{errorMessage}</p>
      </div>
    {/if}
  </div>
</div>

<!-- Preview Modal -->
{#if showPreview}
  <div
    class="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
  >
    <div
      class="bg-gray-800 rounded-lg w-full max-w-xl shadow-xl flex flex-col max-h-[calc(100vh-2rem)]"
    >
      <div
        class="px-5 py-4 border-b border-gray-700 flex justify-between items-center"
      >
        <h2 class="text-xl font-medium text-white m-0">Diary Preview</h2>
        <button
          on:click={closePreview}
          class="bg-transparent border-0 text-gray-400 text-2xl hover:text-white"
          >&times;</button
        >
      </div>

      <div class="p-6 overflow-y-auto flex-1">
        <h3 class="text-2xl font-bold text-white mb-5">
          {getMonthName(selectedMonth)}
          {selectedYear}
        </h3>

        <p class="text-gray-300 mb-4">Your diary will include:</p>

        <ul class="text-left pl-6 mb-6 space-y-2">
          <li class="text-gray-300 marker:text-purple-400">
            A beautiful cover page with a personalized monthly mantra
          </li>
          <li class="text-gray-300 marker:text-purple-400">
            Weekly focus areas to guide your month
          </li>
          <li class="text-gray-300 marker:text-purple-400">
            {DateTime.local(parseInt(selectedYear), parseInt(selectedMonth))
              .daysInMonth} daily pages with reflection questions
          </li>
          <li class="text-gray-300 marker:text-purple-400">
            Space to write your answers
          </li>
          <li class="text-gray-300 marker:text-purple-400">
            Clean, printable layout
          </li>
        </ul>

        <div class="bg-indigo-900/5 p-4 rounded-md mb-6 text-left">
          <h4 class="text-indigo-300 font-medium mb-2">How it works:</h4>
          <ol class="pl-6 m-0">
            <li class="text-gray-300 mb-2">
              <strong class="text-indigo-300">Generate Content:</strong> AI creates
              questions, a monthly mantra, and weekly focus areas
            </li>
            <li class="text-gray-300 mb-2">
              <strong class="text-indigo-300">Review & Customize:</strong> Edit any
              content to match your preferences
            </li>
            <li class="text-gray-300">
              <strong class="text-indigo-300">Generate PDF:</strong> Create your
              personalized reflection diary
            </li>
          </ol>
        </div>

        <p
          class="bg-indigo-900/10 border-l-4 border-indigo-600 p-4 rounded text-indigo-300 text-sm text-left"
        >
          The interactive PDF generation allows you to customize all content
          before creating your diary.
        </p>
      </div>

      <div class="px-5 py-4 border-t border-gray-700 flex justify-end gap-3">
        <button
          on:click={closePreview}
          class="py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-md"
        >
          Close
        </button>
        <button
          on:click={startInteractiveFlow}
          class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
        >
          Start Generation
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Review Dialog -->
{#if showReview && diaryContent}
  <div
    class="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
  >
    <div class="bg-gray-800 rounded-lg w-full max-w-3xl shadow-xl">
      <DiaryReviewDialog
        month={parseInt(selectedMonth)}
        year={parseInt(selectedYear)}
        {diaryContent}
        on:confirm={handleContentConfirm}
        on:cancel={handleReviewCancel}
      />
    </div>
  </div>
{/if}

<!-- Confirmation Dialog -->
{#if showConfirmation}
  <div
    class="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
  >
    <div
      class="bg-gray-800 rounded-lg w-full max-w-xl shadow-xl flex flex-col max-h-[calc(100vh-2rem)]"
    >
      <div
        class="px-5 py-4 border-b border-gray-700 flex justify-between items-center"
      >
        <h2 class="text-xl font-medium text-white m-0">
          PDF Generated Successfully!
        </h2>
        <button
          on:click={closeConfirmation}
          class="bg-transparent border-0 text-gray-400 text-2xl hover:text-white"
          >&times;</button
        >
      </div>

      <div class="w-full text-center p-6 overflow-y-auto flex-1">
        <div class="text-5xl mb-4 text-green-500">✅</div>
        <h3 class="text-2xl font-bold text-white mb-5">Your diary is ready</h3>

        <div class="mt-6 mb-2">
          <p class="text-gray-300 mb-2">
            Click the button below to download your PDF.
          </p>
        </div>
      </div>

      <div class="px-5 py-4 border-t border-gray-700 flex justify-end gap-3">
        <button
          on:click={closeConfirmation}
          class="py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-md"
        >
          Close
        </button>
        <button
          on:click={generatePDF}
          class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md flex items-center"
        >
          <span class="mr-2">📥</span>
          Download PDF
        </button>
      </div>
    </div>
  </div>
{/if}
