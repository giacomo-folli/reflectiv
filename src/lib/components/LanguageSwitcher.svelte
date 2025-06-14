<script lang="ts">
  import { locale } from "svelte-i18n";
  import { fade } from "svelte/transition";
  import { setLocale } from "$lib/i18n";
  import Transition from "./Transition.svelte";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  interface Language {
    code: string;
    name: string;
    flag: string;
  }

  export let currentLanguage: Language = {
    code: "en",
    name: "English",
    flag: "🇬🇧",
  };
  export let onLanguageChange: (code: string) => void;

  const languages: Language[] = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
  ];

  let isOpen = false;

  function changeLanguage(langCode: string) {
    setLocale(langCode);
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest(".language-switcher")) {
      isOpen = false;
    }
  }

  onMount(() => {
    if (browser) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  });
</script>

<!-- <svelte:window> tag must be placed at the top level, not inside a block -->
<svelte:window on:click|capture={browser ? handleClickOutside : null} />

<div class="relative inline-block language-switcher">
  <button
    class="flex items-center gap-2 px-2 py-2 text-gray-400 hover:text-gray-100 hover:bg-white/10 rounded-md text-sm transition-colors"
    on:click={() => (isOpen = !isOpen)}
    on:blur={() => setTimeout(() => (isOpen = false), 200)}
  >
    <span class="text-lg">{currentLanguage.flag}</span>
    <span class="hidden sm:inline">{currentLanguage.name}</span>
    <span class="text-xs transition-transform {isOpen ? 'rotate-180' : ''}"
      >▼</span
    >
  </button>

  {#if isOpen}
    <div
      class="absolute top-full right-0 mt-1 bg-gray-800 rounded-md shadow-lg border border-gray-700 min-w-[12rem] z-50"
    >
      {#each languages as language}
        <button
          class="flex items-center w-full px-4 py-3 text-left text-gray-400 hover:bg-white/5 hover:text-gray-100 transition-colors gap-3 {language.code ===
          currentLanguage.code
            ? 'bg-indigo-600/10 text-indigo-500'
            : ''}"
          on:click={() => {
            currentLanguage = language;
            isOpen = false;
            onLanguageChange(language.code);
          }}
        >
          <span class="text-lg">{language.flag}</span>
          <span class="flex-1">{language.name}</span>
          {#if language.code === currentLanguage.code}
            <span class="text-indigo-500">✓</span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>
