<script lang="ts">
  import { enhance } from '$app/forms';
  import { locale } from 'svelte-i18n';
  
  let email = '';
  let password = '';
  let error = '';
  
  // Define translations for both languages
  const translations = {
    'en': {
      title: 'Login',
      subtitle: 'Sign in to your account to create personalized reflection diaries.',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign In',
      noAccount: 'Don\'t have an account?',
      register: 'Register here',
      errorDefault: 'Login failed. Please try again.',
      heroTitle: 'Reflect and Grow',
      heroText: 'Monthly Reflection Diary helps you track your thoughts, personal growth, and insights throughout each month.',
      feature1: 'Generate personalized reflection questions',
      feature2: 'Create printable monthly diaries',
      feature3: 'Enhance questions with your ChatGPT conversation links'
    },
    'it': {
      title: 'Accedi',
      subtitle: 'Accedi al tuo account per creare diari di riflessione personalizzati.',
      email: 'Email',
      password: 'Password',
      signIn: 'Accedi',
      noAccount: 'Non hai un account?',
      register: 'Registrati qui',
      errorDefault: 'Accesso fallito. Riprova.',
      heroTitle: 'Rifletti e Cresci',
      heroText: 'Il Diario di Riflessione Mensile ti aiuta a tenere traccia dei tuoi pensieri, della crescita personale e delle intuizioni durante ogni mese.',
      feature1: 'Genera domande di riflessione personalizzate',
      feature2: 'Crea diari mensili stampabili',
      feature3: 'Arricchisci le domande con i link alle tue conversazioni ChatGPT'
    }
  };
  
  // Get translations based on current locale
  $: t = translations[$locale || 'en'];
  
  /**
   * Handle form submission with enhanced protection against CSRF
   * @param {FormData} formData - Form data
   */
  function handleLogin(formData) {
    // Return the enhanced form submission
    return async ({ result }) => {
      if (result.type === 'failure') {
        error = result.data?.message || t.errorDefault;
      } else if (result.type === 'success') {
        // Will redirect to the dashboard automatically
        console.log('Login successful');
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
      
      <form method="POST" use:enhance={handleLogin}>
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
            autocomplete="current-password"
          />
        </div>
        
        <button type="submit" class="btn btn-primary">{t.signIn}</button>
      </form>
      
      <p class="auth-link">
        {t.noAccount} <a href="/register">{t.register}</a>
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
    background-color: #2e1065;
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