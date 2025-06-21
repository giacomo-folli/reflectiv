<script>
  import {
    staggerChildren,
    fadeIn,
    textReveal,
} from "$lib/client/utils/transitionUtils";
  import { onMount } from "svelte";
import { getDiaryPreview } from "$lib/client/utils/pdfGenerator";

  export let month;
  export let year;
  export let previewDays = 3;
  export let delay = 0;

  $: diary = getDiaryPreview(month, year);
  $: previewItems = diary.slice(0, previewDays);

  let visible = false;

  onMount(() => {
    setTimeout(() => (visible = true), delay);
  });
</script>

<div class="diary-preview">
  <div class="diary-cover">
    <div class="diary-title">
      <h3>
        {new Date(year, month - 1).toLocaleString("default", { month: "long" })}
        {year}
      </h3>
      <p class="subtitle">Reflection Journal</p>
    </div>
  </div>

  {#if visible}
    <div
      class="diary-pages"
      use:staggerChildren={{
        staggerTime: 100,
        transition: fadeIn,
        duration: 300,
      }}
    >
      {#each previewItems as item, i}
        <div class="diary-page">
          <div class="day-header">
            <span class="day-number">{item.day}</span>
            <span class="day-name">
              {new Date(year, month - 1, item.day).toLocaleString("default", {
                weekday: "long",
              })}
            </span>
          </div>

          <div class="question" use:textReveal={{ delay: 150 * (i + 1) }}>
            {item.question}
          </div>

          <div class="answer-lines">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .diary-preview {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .diary-cover {
    background: linear-gradient(135deg, #6366f1 0%, #3730a3 100%);
    color: white;
    padding: 2rem;
    text-align: center;
    position: relative;
  }

  .diary-cover::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.7;
  }

  .diary-title {
    position: relative;
    z-index: 2;
  }

  .diary-title h3 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem;
    font-weight: 600;
  }

  .subtitle {
    font-size: 1rem;
    margin: 0;
    opacity: 0.9;
  }

  .diary-pages {
    background-color: #f9fafb;
    color: #1f2937;
  }

  .diary-page {
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .diary-page:last-child {
    border-bottom: none;
  }

  .day-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .day-number {
    font-size: 1.5rem;
    font-weight: 700;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #6366f1;
    color: white;
    border-radius: 50%;
    margin-right: 0.75rem;
  }

  .day-name {
    font-size: 1.1rem;
    font-weight: 500;
    color: #4b5563;
  }

  .question {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #374151;
  }

  .answer-lines {
    margin-top: 1rem;
  }

  .line {
    height: 1px;
    background-color: #d1d5db;
    margin: 0.75rem 0;
  }

  /* Dark mode styles */
  @media (prefers-color-scheme: dark) {
    .diary-pages {
      background-color: #2a2a2a;
      color: #e5e7eb;
    }

    .diary-page {
      border-bottom: 1px solid #3f3f46;
    }

    .day-name {
      color: #a1a1aa;
    }

    .question {
      color: #d1d5db;
    }

    .line {
      background-color: #4b5563;
    }
  }
</style>
