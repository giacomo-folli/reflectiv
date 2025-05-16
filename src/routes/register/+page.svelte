<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { locale } from "svelte-i18n";

  let name: string = "";
  let email: string = "";
  let password: string = "";
  let confirmPassword: string = "";
  let error: string = "";

  const translations = {
    en: {
      title: "Create Account",
      subtitle: "Sign up to create your monthly reflection diaries.",
      name: "Full Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      createAccount: "Create Account",
      haveAccount: "Already have an account?",
      login: "Log in here",
      errorDefault: "Registration failed. Please try again.",
      heroTitle: "Begin Your Reflection Journey",
      heroText:
        "Monthly Reflection Diary provides a structured way to document your thoughts and growth throughout each month.",
      feature1: "Create personalized diary PDFs for any month",
      feature2: "Thoughtful questions tailored to each month's themes",
      feature3: "Enhance with your ChatGPT conversations",
      feature4: "Download, print, and fill in at your own pace",
    },
    it: {
      title: "Crea Account",
      subtitle: "Registrati per creare i tuoi diari di riflessione mensili.",
      name: "Nome Completo",
      email: "Email",
      password: "Password",
      confirmPassword: "Conferma Password",
      createAccount: "Crea Account",
      haveAccount: "Hai già un account?",
      login: "Accedi qui",
      errorDefault: "Registrazione fallita. Riprova.",
      heroTitle: "Inizia il Tuo Percorso di Riflessione",
      heroText:
        "Il Diario di Riflessione Mensile offre un modo strutturato per documentare i tuoi pensieri e la tua crescita durante ogni mese.",
      feature1: "Crea PDF di diario personalizzati per qualsiasi mese",
      feature2: "Domande significative adattate ai temi di ogni mese",
      feature3: "Arricchisci con le tue conversazioni ChatGPT",
      feature4: "Scarica, stampa e compila al tuo ritmo",
    },
  };

  // @ts-ignore
  $: t = translations[$locale || "en"];

  function handleRegister() {
    return async ({ result }: any) => {
      if (result.type === "success") {
        await goto("/dashboard");
      }

      error = result.data?.message || t.errorDefault;
    };
  }
</script>

<div class="max-w-5xl mx-auto p-4 sm:p-8">
  <div class="grid md:grid-cols-2 gap-8 min-h-[500px]">
    <!-- Form Section -->
    <div class="bg-gray-800 rounded-lg p-8">
      <h1 class="text-2xl font-bold text-white mb-2">{t.title}</h1>
      <p class="text-gray-400 mb-6">{t.subtitle}</p>

      {#if error}
        <div class="bg-red-900/20 border border-red-500/50 text-red-400 p-3 rounded-md mb-4">
          {error}
        </div>
      {/if}

      <form method="POST" use:enhance={handleRegister} class="mb-6">
        <div class="mb-5">
          <label for="name" class="block text-gray-300 text-sm mb-2">{t.name}</label>
          <input
            type="text"
            id="name"
            name="name"
            bind:value={name}
            required
            autocomplete="name"
            class="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div class="mb-5">
          <label for="email" class="block text-gray-300 text-sm mb-2">{t.email}</label>
          <input
            type="email"
            id="email"
            name="email"
            bind:value={email}
            required
            autocomplete="email"
            class="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div class="mb-5">
          <label for="password" class="block text-gray-300 text-sm mb-2">{t.password}</label>
          <input
            type="password"
            id="password"
            name="password"
            bind:value={password}
            required
            autocomplete="new-password"
            class="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div class="mb-5">
          <label for="confirm-password" class="block text-gray-300 text-sm mb-2">{t.confirmPassword}</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            bind:value={confirmPassword}
            required
            autocomplete="new-password"
            class="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <button 
          type="submit" 
          class="w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
        >
          {t.createAccount}
        </button>
      </form>

      <p class="text-center text-gray-400 text-sm">
        {t.haveAccount} <a href="/login" class="text-purple-400 hover:text-purple-300 underline">{t.login}</a>
      </p>

      <div class="flex justify-center gap-2 mt-6">
        <button
          class={"bg-gray-700 text-gray-400 border border-gray-600 rounded-md px-3 py-2 cursor-pointer text-xs transition-all " + 
                ($locale === 'en' ? 'bg-indigo-600 text-white border-indigo-500' : '')}
          on:click={() => locale.set("en")}
        >
          🇬🇧 English
        </button>
        <button
          class={"bg-gray-700 text-gray-400 border border-gray-600 rounded-md px-3 py-2 cursor-pointer text-xs transition-all " + 
                ($locale === 'it' ? 'bg-indigo-600 text-white border-indigo-500' : '')}
          on:click={() => locale.set("it")}
        >
          🇮🇹 Italiano
        </button>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="hidden md:flex rounded-lg bg-purple-900 items-center justify-center overflow-hidden">
      <div class="p-10 text-white">
        <h2 class="text-2xl font-bold mb-4">{t.heroTitle}</h2>
        <p class="text-purple-200 mb-6 leading-relaxed">{t.heroText}</p>
        <ul class="space-y-3">
          <li class="flex items-start">
            <span class="text-purple-400 mr-2">✓</span>
            <span class="text-purple-100">{t.feature1}</span>
          </li>
          <li class="flex items-start">
            <span class="text-purple-400 mr-2">✓</span>
            <span class="text-purple-100">{t.feature2}</span>
          </li>
          <li class="flex items-start">
            <span class="text-purple-400 mr-2">✓</span>
            <span class="text-purple-100">{t.feature3}</span>
          </li>
          <li class="flex items-start">
            <span class="text-purple-400 mr-2">✓</span>
            <span class="text-purple-100">{t.feature4}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
