<script lang="ts">
  import { DateTime } from "luxon";
  import DiaryReviewDialog from "$lib/components/DiaryReviewDialog.svelte";
  import { PdfService } from "$lib/services/pdf.service";

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
  let showReview = false;
  let isLoading = false;
  let errorMessage = "";
  let diaryContent: any = null;

  async function generateAndDownloadPdf() {
    isLoading = true;
    errorMessage = "";

    try {
      // const month = parseInt(selectedMonth);
      // const year = parseInt(selectedYear);

      const service = new PdfService({ fetch });
      const links = await service.getUserLinks();
      const content = await service.getDiariyContent({ links });

      console.log("RESPONES", content);

      await service.generateDiary({
        questions: content.questions,
        mantra: content.mantra,
        themes: content.themes,
      });
    } catch (error) {
      console.error("Error generating content:", error);
      errorMessage = "Failed to generate diary content. Please try again.";
    } finally {
      isLoading = false;
    }
  }

  // Get the customized content from the review dialog
  function handleContentConfirm(event: CustomEvent) {
    diaryContent = event.detail;
    showReview = false;
  }

  function getMonthName(month: string) {
    return months.find((m) => m.value === month)?.label || "";
  }
</script>

<div
  class="h-full max-w-3xl flex flex-col justify-center items-center mx-auto px-4 py-4 text-center"
>
  <div class="w-full h-full">
    <h1 class="text-3xl font-bold mb-3 text-white">
      Monthly Reflection Diary Generator
    </h1>
    <p class="text-gray-400 mb-8">
      Create a personalized monthly diary with AI-generated reflection questions
      for each day.
    </p>

    {#if !isLoading}
      <div>
        <button
          on:click={generateAndDownloadPdf}
          class="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
        >
          <span class="mr-2">✨</span>
          Generate Content
        </button>
      </div>
    {:else}
      <div
        class="flex items-center justify-center text-white bg-indigo-600 py-3 px-4 rounded-md"
      >
        <div
          class="w-10 h-8 rounded-full border-3 border-indigo-600/30 animate-spin"
        >
          ✨
        </div>
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
          on:cancel={() => (showReview = false)}
        />
      </div>
    </div>
  {/if}
</div>

<!-- Confirmation Dialog -->
<!-- {#if showConfirmation}
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
{/if} -->
