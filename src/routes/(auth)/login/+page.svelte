<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { locale } from "svelte-i18n";

  let email: string = "";
  let password: string = "";
  let error: string = "";

  const translations = {
    en: {
      title: "Login",
      subtitle:
        "Sign in to your account to create personalized reflection diaries.",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      noAccount: "Don't have an account?",
      register: "Register here",
      errorDefault: "Login failed. Please try again.",
      heroTitle: "Reflect and Grow",
      heroText:
        "Monthly Reflection Diary helps you track your thoughts, personal growth, and insights throughout each month.",
      feature1: "Generate personalized reflection questions",
      feature2: "Create printable monthly diaries",
      feature3: "Enhance questions with your ChatGPT conversation links",
    },
    it: {
      title: "Accedi",
      subtitle:
        "Accedi al tuo account per creare diari di riflessione personalizzati.",
      email: "Email",
      password: "Password",
      signIn: "Accedi",
      noAccount: "Non hai un account?",
      register: "Registrati qui",
      errorDefault: "Accesso fallito. Riprova.",
      heroTitle: "Rifletti e Cresci",
      heroText:
        "Il Diario di Riflessione Mensile ti aiuta a tenere traccia dei tuoi pensieri, della crescita personale e delle intuizioni durante ogni mese.",
      feature1: "Genera domande di riflessione personalizzate",
      feature2: "Crea diari mensili stampabili",
      feature3:
        "Arricchisci le domande con i link alle tue conversazioni ChatGPT",
    },
  };

  // @ts-ignore
  $: t = translations[$locale || "en"];

  function handleLogin() {
    return async ({ result }: any) => {
      if (result.type == "success") {
        await goto("/dashboard", { invalidateAll: true });
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

      <form method="POST" use:enhance={handleLogin} class="mb-6">
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
            autocomplete="current-password"
            class="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <button 
          type="submit" 
          class="w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
        >
          {t.signIn}
        </button>
      </form>

      <p class="text-center text-gray-400 text-sm">
        {t.noAccount} <a href="/register" class="text-purple-400 hover:text-purple-300 underline">{t.register}</a>
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
        </ul>
      </div>
    </div>
  </div>
</div>
