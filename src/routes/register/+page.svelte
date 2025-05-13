<script>
  import { enhance } from '$app/forms';
  import { locale } from 'svelte-i18n';
  
  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';
  
  // Define translations for both languages
  const translations = {
    'en': {
      title: 'Create Account',
      subtitle: 'Sign up to create your monthly reflection diaries.',
      name: 'Full Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      createAccount: 'Create Account',
      haveAccount: 'Already have an account?',
      login: 'Log in here',
      errorDefault: 'Registration failed. Please try again.',
      heroTitle: 'Begin Your Reflection Journey',
      heroText: 'Monthly Reflection Diary provides a structured way to document your thoughts and growth throughout each month.',
      feature1: 'Create personalized diary PDFs for any month',
      feature2: 'Thoughtful questions tailored to each month\'s themes',
      feature3: 'Enhance with your ChatGPT conversations',
      feature4: 'Download, print, and fill in at your own pace'
    },
    'it': {
      title: 'Crea Account',
      subtitle: 'Registrati per creare i tuoi diari di riflessione mensili.',
      name: 'Nome Completo',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Conferma Password',
      createAccount: 'Crea Account',
      haveAccount: 'Hai già un account?',
      login: 'Accedi qui',
      errorDefault: 'Registrazione fallita. Riprova.',
      heroTitle: 'Inizia il Tuo Percorso di Riflessione',
      heroText: 'Il Diario di Riflessione Mensile offre un modo strutturato per documentare i tuoi pensieri e la tua crescita durante ogni mese.',
      feature1: 'Crea PDF di diario personalizzati per qualsiasi mese',
      feature2: 'Domande significative adattate ai temi di ogni mese',
      feature3: 'Arricchisci con le tue conversazioni ChatGPT',
      feature4: 'Scarica, stampa e compila al tuo ritmo'
    }
  };
  
  // Get translations based on current locale
  $: t = translations[$locale || 'en'];
  
  /**
   * Handle form submission with enhanced protection against CSRF
   * @param {FormData} formData - Form data
   */
  function handleRegister(formData) {
    // Return the enhanced form submission
    return async ({ result }) => {
      if (result.type === 'failure') {
        error = result.data?.message || t.errorDefault;
      } else if (result.type === 'success') {
        // Will redirect to the dashboard automatically
        console.log('Registration successful');
      }
    };
  }
</script>

<div class="auth-container">
  <div class="auth-grid">
    <div class="form-container">
      <h1>{t.title}</h1>
      <p class="subtitle">{t.subtitle}</p>
      
      {#if error}
        <div class="error-box">
          {error}
        </div>
      {/if}
      
      <form method="POST" use:enhance={handleRegister}>
        <div class="form-group">
          <label for="name">{t.name}</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            bind:value={name} 
            required 
            autocomplete="name"
          />
        </div>
        
        <div class="form-group">
          <label for="email">{t.email}</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            bind:value={email} 
            required 
            autocomplete="email"
          />
        </div>
        
        <div class="form-group">
          <label for="password">{t.password}</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            bind:value={password} 
            required 
            autocomplete="new-password"
          />
        </div>
        
        <div class="form-group">
          <label for="confirm-password">{t.confirmPassword}</label>
          <input 
            type="password" 
            id="confirm-password" 
            name="confirmPassword" 
            bind:value={confirmPassword} 
            required 
            autocomplete="new-password"
          />
        </div>
        
        <button type="submit" class="btn btn-primary">{t.createAccount}</button>
      </form>
      
      <p class="auth-link">
        {t.haveAccount} <a href="/login">{t.login}</a>
      </p>
      
      <div class="language-selector">
        <button class="lang-btn {$locale === 'en' ? 'active' : ''}" on:click={() => locale.set('en')}>
          🇬🇧 English
        </button>
        <button class="lang-btn {$locale === 'it' ? 'active' : ''}" on:click={() => locale.set('it')}>
          🇮🇹 Italiano
        </button>
      </div>
    </div>
    
    <div class="hero-section">
      <div class="hero-content">
        <h2>{t.heroTitle}</h2>
        <p>{t.heroText}</p>
        <ul>
          <li>{t.feature1}</li>
          <li>{t.feature2}</li>
          <li>{t.feature3}</li>
          <li>{t.feature4}</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  .auth-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .auth-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    min-height: 500px;
  }
  
  @media (max-width: 768px) {
    .auth-grid {
      grid-template-columns: 1fr;
    }
    
    .hero-section {
      display: none;
    }
  }
  
  .form-container {
    background-color: #1e293b;
    border-radius: 0.5rem;
    padding: 2rem;
  }
  
  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: white;
  }
  
  .subtitle {
    color: #a1a1aa;
    margin-bottom: 1.5rem;
  }
  
  .error-box {
    background-color: rgba(220, 38, 38, 0.1);
    border: 1px solid rgba(220, 38, 38, 0.5);
    color: #ef4444;
    padding: 0.75rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #d1d5db;
    font-size: 0.9rem;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #4b5563;
    background-color: #374151;
    color: white;
    font-size: 1rem;
  }
  
  input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
  
  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    width: 100%;
  }
  
  .btn-primary {
    background-color: #6366f1;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #4f46e5;
  }
  
  .auth-link {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.95rem;
    color: #a1a1aa;
  }
  
  .auth-link a {
    color: #8b5cf6;
    text-decoration: underline;
  }
  
  .hero-section {
    background-color: #581c87;
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .hero-content {
    padding: 2.5rem;
    color: white;
  }
  
  .hero-section h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  .hero-section p {
    color: #c4b5fd;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
  
  .hero-section ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .hero-section li {
    margin-bottom: 0.75rem;
    position: relative;
    padding-left: 1.5rem;
    color: #ddd6fe;
  }
  
  .hero-section li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #a78bfa;
  }
  
  /* Language selector styling */
  .language-selector {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
  
  .lang-btn {
    background-color: #2d3748;
    color: #a1a1aa;
    border: 1px solid #4a5568;
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-size: 0.8rem;
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