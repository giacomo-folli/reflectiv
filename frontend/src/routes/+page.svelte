<script lang="ts">
  import { _ } from "svelte-i18n";
  import { locale } from "svelte-i18n";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: user = data?.user;

  // Demo content translations
  const translations = {
    en: {
      title: "Monthly Reflection Diary Generator",
      subtitle:
        "Create a personalized monthly diary with AI-generated reflection questions for each day.",
      loggedInMessage:
        "You're logged in and ready to create your reflection diary.",
      dashboardButton: "Go to Dashboard",
      loginPrompt: "Please login or sign up to generate your reflection diary.",
    },
    it: {
      title: "Generatore di Diario di Riflessione Mensile",
      subtitle:
        "Crea un diario mensile personalizzato con domande di riflessione generate dall'IA per ogni giorno.",
      loggedInMessage:
        "Hai effettuato l'accesso e sei pronto per creare il tuo diario di riflessione.",
      dashboardButton: "Vai alla Dashboard",
      loginPrompt:
        "Accedi o registrati per generare il tuo diario di riflessione.",
    },
  };

  // Get translation based on current locale
  // @ts-ignore
  $: currentTranslations = translations[$locale || "en"];
</script>

<div class="max-w-4xl mx-auto p-4 sm:p-8 text-center">
  <h1 class="text-4xl font-bold mb-4 text-white">
    {currentTranslations.title}
  </h1>
  <p class="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
    {currentTranslations.subtitle}
  </p>

  <div class="flex justify-center gap-4 mb-8">
    <button
      class={"bg-gray-800 text-gray-400 border border-gray-600 rounded-md px-4 py-2 cursor-pointer text-sm transition-all " +
        ($locale === "en" ? "bg-indigo-600 text-white border-indigo-500" : "")}
      on:click={() => locale.set("en")}
    >
      🇬🇧 English
    </button>
    <button
      class={"bg-gray-800 text-gray-400 border border-gray-600 rounded-md px-4 py-2 cursor-pointer text-sm transition-all " +
        ($locale === "it" ? "bg-indigo-600 text-white border-indigo-500" : "")}
      on:click={() => locale.set("it")}
    >
      🇮🇹 Italiano
    </button>
  </div>

  <div
    class="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-16 max-w-2xl mx-auto"
  >
    {#if user}
      <p class="text-white">{currentTranslations.loggedInMessage}</p>
      <a
        href="/dashboard"
        class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md font-medium mt-4 hover:bg-indigo-700 transition-colors"
      >
        {currentTranslations.dashboardButton}
      </a>
    {:else}
      <p class="text-gray-300">
        {#if $locale === "en"}
          Please <a
            href="/login"
            class="text-purple-400 underline hover:text-purple-300">login</a
          >
          or
          <a
            href="/register"
            class="text-purple-400 underline hover:text-purple-300">sign up</a
          > to generate your reflection diary.
        {:else}
          <a
            href="/login"
            class="text-purple-400 underline hover:text-purple-300">Accedi</a
          >
          o
          <a
            href="/register"
            class="text-purple-400 underline hover:text-purple-300"
            >registrati</a
          > per generare il tuo diario di riflessione.
        {/if}
      </p>
    {/if}
  </div>

  <section class="mt-12">
    <h2 class="text-3xl font-bold mb-8 text-white">
      {$locale === "en" ? "How It Works" : "Come Funziona"}
    </h2>

    <div class="mx-auto grid grid-cols-1 gap-4 text-center">
      <div class="px-6 flex justify-start items-center gap-4">
        <div class="text-5xl h-20 flex items-center">🧠</div>
        <div class="text-left">
          <h3 class="text-xl font-medium text-gray-100 min-w-fit">
            {$locale === "en"
              ? "AI-Generated Questions"
              : "Domande Generate dall'IA"}
          </h3>
          <p class="text-gray-400 text-base leading-relaxed">
            {$locale === "en"
              ? "Our system creates thoughtful questions tailored to the month and season."
              : "Il nostro sistema crea domande significative adattate al mese e alla stagione."}
          </p>
        </div>
      </div>

      <div class="px-6 flex justify-start items-center gap-4">
        <div class="text-5xl h-20 flex items-center">🔐</div>
        <div class="text-left">
          <h3 class="text-xl font-medium text-gray-100 min-w-fit">
            {$locale === "en"
              ? "Your Data Is Private and Secure"
              : "I Tuoi Dati Sono Al Sicuro"}
          </h3>
          <p class="text-gray-400 text-base leading-relaxed">
            {$locale === "en"
              ? "This app doesn't collect any personal information. You own your data. "
              : "Questa applicazione non raccoglie nessuna informazione su di te. Tu solo possiedi i tuoi dati."}
          </p>
        </div>
      </div>

      <div class="px-6 flex justify-start items-center gap-4">
        <div class="text-5xl h-20 flex items-center">📝</div>
        <div class="text-left">
          <h3 class="text-xl font-medium text-gray-100 min-w-fit">
            {$locale === "en" ? "Print & Reflect" : "Stampa e Rifletti"}
          </h3>
          <p class="text-gray-400 text-base leading-relaxed">
            {$locale === "en"
              ? "Download your PDF, print it, and take time each day to reflect and write."
              : "Scarica il tuo PDF, stampalo e prenditi del tempo ogni giorno per riflettere e scrivere."}
          </p>
        </div>
      </div>
    </div>
  </section>
</div>
