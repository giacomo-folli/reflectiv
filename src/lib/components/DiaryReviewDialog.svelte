<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { DateTime } from "luxon";

  export let month: number;
  export let year: number;
  export let diaryContent: {
    questions: string[];
    monthlyMantra: string;
    weeklyFocus: string[];
  };

  const dispatch = createEventDispatcher();

  // Multi-step wizard
  let currentStep = 0;
  const totalSteps = 3;

  // For pagination of questions
  let currentPage = 0;
  const questionsPerPage = 7;

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

  function nextStep() {
    if (currentStep < totalSteps - 1) {
      currentStep++;
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
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
    dispatch("confirm", diaryContent);
  }

  function cancel() {
    dispatch("cancel");
  }

  // Get month name
  const monthName = DateTime.local(year, month).toFormat("MMMM");

  // Get step title and description
  $: stepInfo = getStepInfo(currentStep);

  function getStepInfo(step: number) {
    switch (step) {
      case 0:
        return {
          title: "Monthly Mantra",
          description: "Create a meaningful mantra for your month",
        };
      case 1:
        return {
          title: "Weekly Focus Areas",
          description: "Define focus areas for each week",
        };
      case 2:
        return {
          title: "Daily Reflection Questions",
          description: "Customize questions for each day",
        };
      default:
        return { title: "", description: "" };
    }
  }
</script>

<div class="flex flex-col h-full text-gray-200 p-6 max-w-4xl mx-auto">
  <div
    class="flex justify-between items-start pb-6 border-b border-gray-700 mb-6"
  >
    <div class="flex-1">
      <h2 class="text-2xl font-semibold text-white m-0 mb-2">
        Review Your {monthName}
        {year} Reflection Diary
      </h2>
      <p class="text-gray-400 m-0 text-sm">
        Step {currentStep + 1} of {totalSteps}: {stepInfo.title}
      </p>
    </div>
    <button
      on:click={cancel}
      class="bg-transparent border-none text-gray-400 text-3xl leading-none cursor-pointer p-1 rounded hover:text-white hover:bg-white/10 transition-colors ml-4"
      aria-label="Close">×</button
    >
  </div>

  <!-- Step progress indicators -->
  <div class="mb-8">
    <div class="flex items-baseline justify-between mb-2">
      {#each Array(totalSteps) as _, i}
        <div
          class="flex flex-col items-center cursor-pointer"
          on:click={() => (currentStep = i)}
          on:keydown={(e) => e.key === "Enter" && (currentStep = i)}
          tabindex="0"
          role="button"
        >
          <div
            class="w-5 h-5 rounded-full flex items-center justify-center text-white font-medium text-sm mb-1
            {i < currentStep
              ? 'bg-indigo-700'
              : i === currentStep
                ? 'bg-indigo-500'
                : 'bg-gray-700'}"
          >
            {i < currentStep ? "✓" : i + 1}
          </div>
          <span
            class="text-xs text-center max-w-[80px]
            {i === currentStep
              ? 'text-indigo-300 font-medium'
              : 'text-gray-400'}"
          >
            {i === 0 ? "Mantra" : i === 1 ? "Focus Areas" : "Questions"}
          </span>
        </div>

        {#if i < totalSteps - 1}
          <div class="flex-1 flex items-center px-2">
            <div
              class="h-0.5 w-full {i < currentStep
                ? 'bg-indigo-700'
                : 'bg-gray-700'}"
            ></div>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  <div class="flex-1 overflow-y-auto pr-2">
    <!-- Step 1: Monthly Mantra -->
    {#if currentStep === 0}
      <section class="mb-6 bg-gray-800/50 rounded-lg p-5">
        <h3 class="text-lg font-medium text-white m-0 mb-2">Monthly Mantra</h3>
        <p class="text-gray-400 text-sm m-0 mb-3">
          This mantra will appear on the cover page of your diary
        </p>
        <textarea
          bind:value={diaryContent.monthlyMantra}
          on:input={() => updateMantra(diaryContent.monthlyMantra)}
          rows="3"
          placeholder="Enter a meaningful mantra for your month..."
          class="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white text-base resize-vertical focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25"
        ></textarea>
      </section>
    {/if}

    <!-- Step 2: Weekly Focus Areas -->
    {#if currentStep === 1}
      <section
        class="mb-6 bg-gray-800/50 rounded-lg p-5 border border-gray-700/50"
      >
        <h3 class="text-lg font-medium text-white m-0 mb-2">
          Weekly Focus Areas
        </h3>
        <p class="text-gray-400 text-sm m-0 mb-3">
          These focus areas will help guide your reflections each week
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {#each diaryContent.weeklyFocus as focus, i}
            <div class="flex flex-col">
              <label for="focus-{i}" class="text-sm text-gray-300 mb-1"
                >Week {i + 1}</label
              >
              <input
                id="focus-{i}"
                type="text"
                bind:value={diaryContent.weeklyFocus[i]}
                on:input={(e) => updateWeeklyFocus(i, e.currentTarget.value)}
                class="bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white text-sm w-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25"
              />
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Step 3: Daily Reflection Questions -->
    {#if currentStep === 2}
      <section
        class="mb-6 bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
      >
        <div class="flex justify-between items-center flex-wrap gap-2 mb-2">
          <h3 class="text-base font-medium text-white m-0">
            Daily Reflection Questions
          </h3>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400"
              >Page {currentPage + 1} of {totalPages}</span
            >
            <div class="flex gap-1">
              <button
                on:click={prevPage}
                disabled={currentPage === 0}
                class="bg-gray-700 border-none py-1 px-2 rounded text-xs text-gray-200 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
              >
                ← Prev
              </button>
              <button
                on:click={nextPage}
                disabled={currentPage === totalPages - 1}
                class="bg-gray-700 border-none py-1 px-2 rounded text-xs text-gray-200 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        <p class="text-gray-400 text-xs m-0 mb-3">
          Customize these questions that will appear on each day of your diary
        </p>

        <div class="grid gap-2 max-h-[350px] overflow-y-auto pr-1">
          {#each displayQuestions as question, i}
            <div
              class="w-full flex bg-gray-800/70 px-3 rounded-md gap-2 items-center"
            >
              <label
                for="question-{i}"
                class="min-w-fit text-sm text-gray-300 mb-1 font-medium"
                >Day {currentPage * questionsPerPage + i + 1}</label
              >
              <textarea
                id="question-{i}"
                rows="1"
                bind:value={displayQuestions[i]}
                on:input={(e) => updateQuestion(i, e.currentTarget.value)}
                class="bg-gray-800 border border-gray-700 rounded-md py-1 px-2 text-white text-sm w-full resize-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25"
              ></textarea>
            </div>
          {/each}
        </div>
      </section>
    {/if}
  </div>

  <div class="flex justify-between gap-3 pt-6 border-t border-gray-700 mt-6">
    <div>
      {#if currentStep > 0}
        <button
          on:click={prevStep}
          class="inline-flex items-center justify-center px-5 py-2.5 rounded-md font-medium bg-gray-700 hover:bg-gray-600 text-white transition-all"
        >
          ← Previous Step
        </button>
      {:else}
        <button
          on:click={cancel}
          class="inline-flex items-center justify-center px-5 py-2.5 rounded-md font-medium bg-gray-600 hover:bg-gray-700 text-white transition-all"
        >
          Cancel
        </button>
      {/if}
    </div>

    <div>
      {#if currentStep < totalSteps - 1}
        <button
          on:click={nextStep}
          class="inline-flex items-center justify-center px-5 py-2.5 rounded-md font-medium bg-indigo-500 hover:bg-indigo-600 text-white transition-all"
        >
          Next Step →
        </button>
      {:else}
        <button
          on:click={confirm}
          class="inline-flex items-center justify-center px-5 py-2.5 rounded-md font-medium bg-indigo-500 hover:bg-indigo-600 text-white transition-all"
        >
          Generate PDF
        </button>
      {/if}
    </div>
  </div>
</div>
