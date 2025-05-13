<script>
  import { locale, dictionary } from 'svelte-i18n';
  import { fade } from 'svelte/transition';
  import { setLocale } from '$lib/i18n';
  import Transition from './Transition.svelte';
  import { browser } from '$app/environment';
  
  // Available languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];
  
  // Current language code
  $: currentLanguage = $locale || 'en';
  
  // Handle language change
  function changeLanguage(langCode) {
    setLocale(langCode);
  }
  
  // Control dropdown state
  let isOpen = false;
  
  // Close dropdown when clicking outside
  function handleClickOutside(event) {
    if (isOpen && !event.target.closest('.language-switcher')) {
      isOpen = false;
    }
  }
  
  // Add click outside listener
  import { onMount, onDestroy } from 'svelte';
  
  onMount(() => {
    if (browser) {
      document.addEventListener('click', handleClickOutside);
    }
  });
  
  onDestroy(() => {
    if (browser) {
      document.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<!-- <svelte:window> tag must be placed at the top level, not inside a block -->
<svelte:window on:click|capture={browser ? handleClickOutside : null} />

<div class="language-switcher">
  <button 
    class="language-toggle" 
    aria-label="Change language" 
    on:click={() => isOpen = !isOpen}
  >
    {languages.find(lang => lang.code === currentLanguage)?.flag || '🌐'} 
    <span class="language-name">{languages.find(lang => lang.code === currentLanguage)?.name || 'Language'}</span>
    <span class="arrow" class:open={isOpen}>▼</span>
  </button>
  
  {#if isOpen}
    <div class="language-dropdown" transition:fade={{ duration: 150 }}>
      {#each languages as language}
        <button 
          class="language-option" 
          class:active={currentLanguage === language.code}
          on:click={() => {
            changeLanguage(language.code);
            isOpen = false;
          }}
        >
          <span class="flag">{language.flag}</span>
          <span class="name">{language.name}</span>
          
          {#if currentLanguage === language.code}
            <Transition transition="fadeIn">
              <span class="check">✓</span>
            </Transition>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<div class="language-switcher">
  <button 
    class="language-toggle" 
    aria-label="Change language" 
    on:click={() => isOpen = !isOpen}
  >
    {languages.find(lang => lang.code === currentLanguage)?.flag || '🌐'} 
    <span class="language-name">{languages.find(lang => lang.code === currentLanguage)?.name || 'Language'}</span>
    <span class="arrow" class:open={isOpen}>▼</span>
  </button>
  
  {#if isOpen}
    <div class="language-dropdown" transition:fade={{ duration: 150 }}>
      {#each languages as language}
        <button 
          class="language-option" 
          class:active={currentLanguage === language.code}
          on:click={() => {
            changeLanguage(language.code);
            isOpen = false;
          }}
        >
          <span class="flag">{language.flag}</span>
          <span class="name">{language.name}</span>
          
          {#if currentLanguage === language.code}
            <Transition transition="fadeIn">
              <span class="check">✓</span>
            </Transition>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .language-switcher {
    position: relative;
    display: inline-block;
  }
  
  .language-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: transparent;
    color: #a1a1aa;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }
  
  .language-toggle:hover {
    color: #f3f4f6;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .arrow {
    font-size: 0.6rem;
    margin-left: 0.25rem;
    transition: transform 0.2s ease;
  }
  
  .arrow.open {
    transform: rotate(180deg);
  }
  
  .language-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.25rem;
    background-color: #1a202c;
    border-radius: 0.375rem;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    z-index: 50;
    border: 1px solid #2d3748;
    min-width: 12rem;
  }
  
  .language-option {
    display: flex;
    align-items: center;
    width: 100%;
    text-align: left;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    transition: all 0.15s ease;
    gap: 0.75rem;
  }
  
  .language-option:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: #f3f4f6;
  }
  
  .language-option.active {
    background-color: rgba(99, 102, 241, 0.1);
    color: #6366f1;
  }
  
  .flag {
    font-size: 1.1rem;
  }
  
  .name {
    flex: 1;
  }
  
  .check {
    color: #6366f1;
  }
  
  @media (max-width: 640px) {
    .language-name {
      display: none;
    }
  }
</style>