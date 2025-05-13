<script>
  import { _ } from 'svelte-i18n';
  import { locale } from 'svelte-i18n';
  import { browser } from '$app/environment';
  
  export let data;
  
  $: user = data?.user;
  
  // Demo content translations
  const translations = {
    'en': {
      title: 'Monthly Reflection Diary Generator',
      subtitle: 'Create a personalized monthly diary with AI-generated reflection questions for each day.',
      loggedInMessage: "You're logged in and ready to create your reflection diary.",
      dashboardButton: 'Go to Dashboard',
      loginPrompt: 'Please login or sign up to generate your reflection diary.'
    },
    'it': {
      title: 'Generatore di Diario di Riflessione Mensile',
      subtitle: 'Crea un diario mensile personalizzato con domande di riflessione generate dall\'IA per ogni giorno.',
      loggedInMessage: "Hai effettuato l'accesso e sei pronto per creare il tuo diario di riflessione.",
      dashboardButton: 'Vai alla Dashboard',
      loginPrompt: 'Accedi o registrati per generare il tuo diario di riflessione.'
    }
  };
  
  // Get translation based on current locale
  $: currentTranslations = translations[$locale || 'en'];
</script>

<div class="hero">
  <h1>{currentTranslations.title}</h1>
  <p class="subtitle">{currentTranslations.subtitle}</p>
  
  <div class="language-demo">
    <button class="lang-btn {$locale === 'en' ? 'active' : ''}" on:click={() => locale.set('en')}>
      🇬🇧 English
    </button>
    <button class="lang-btn {$locale === 'it' ? 'active' : ''}" on:click={() => locale.set('it')}>
      🇮🇹 Italiano
    </button>
  </div>
  
  <div class="cta-box">
    {#if user}
      <p>{currentTranslations.loggedInMessage}</p>
      <a href="/dashboard" class="btn primary">{currentTranslations.dashboardButton}</a>
    {:else}
      <p class="prompt">
        {#if $locale === 'en'}
          Please <a href="/login">login</a> or <a href="/register">sign up</a> to generate your reflection diary.
        {:else}
          <a href="/login">Accedi</a> o <a href="/register">registrati</a> per generare il tuo diario di riflessione.
        {/if}
      </p>
    {/if}
  </div>
  
  <section class="features">
    <h2>{$locale === 'en' ? 'How It Works' : 'Come Funziona'}</h2>
    
    <div class="feature-grid">
      <div class="feature">
        <div class="icon">📅</div>
        <h3>{$locale === 'en' ? 'Select a Month' : 'Seleziona un Mese'}</h3>
        <p>
          {$locale === 'en' 
            ? 'Choose which month and year you want to create a reflection diary for.' 
            : 'Scegli per quale mese e anno desideri creare un diario di riflessione.'}
        </p>
      </div>
      
      <div class="feature">
        <div class="icon">🧠</div>
        <h3>{$locale === 'en' ? 'AI-Generated Questions' : 'Domande Generate dall\'IA'}</h3>
        <p>
          {$locale === 'en'
            ? 'Our system creates thoughtful questions tailored to the month and season.'
            : 'Il nostro sistema crea domande significative adattate al mese e alla stagione.'}
        </p>
      </div>
      
      <div class="feature">
        <div class="icon">📝</div>
        <h3>{$locale === 'en' ? 'Print & Reflect' : 'Stampa e Rifletti'}</h3>
        <p>
          {$locale === 'en'
            ? 'Download your PDF, print it, and take time each day to reflect and write.'
            : 'Scarica il tuo PDF, stampalo e prenditi del tempo ogni giorno per riflettere e scrivere.'}
        </p>
      </div>
    </div>
  </section>
</div>

<style>
  .hero {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1rem;
    text-align: center;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: white;
  }
  
  .subtitle {
    font-size: 1.2rem;
    color: #a1a1aa;
    margin-bottom: 2.5rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .cta-box {
    background-color: rgba(30, 41, 59, 0.5);
    border: 1px solid #2d3748;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 4rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .prompt {
    color: #d1d5db;
  }
  
  .prompt a {
    color: #8b5cf6;
    text-decoration: underline;
  }
  
  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #6366f1;
    color: white;
    border-radius: 0.375rem;
    text-decoration: none;
    font-weight: 500;
    margin-top: 1rem;
    transition: background-color 0.15s ease-in-out;
  }
  
  .btn:hover {
    background-color: #4f46e5;
  }
  
  .features {
    margin-top: 3rem;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: white;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    text-align: center;
  }
  
  .feature {
    padding: 1.5rem;
  }
  
  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: #f3f4f6;
  }
  
  .feature p {
    color: #a1a1aa;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  /* Language selector styling */
  .language-demo {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .lang-btn {
    background-color: #2d3748;
    color: #a1a1aa;
    border: 1px solid #4a5568;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease-in-out;
  }
  
  .lang-btn:hover {
    background-color: #4a5568;
    color: #f3f4f6;
  }
  
  .lang-btn.active {
    background-color: #6366f1;
    color: white;
    border-color: #4f46e5;
  }
</style>