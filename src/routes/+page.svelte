<script>
  export let data;
  
  $: user = data?.user;
</script>

<div class="hero">
  <h1>Monthly Reflection Diary Generator</h1>
  <p class="subtitle">Create a personalized monthly diary with AI-generated reflection questions for each day.</p>
  
  <div class="cta-box">
    {#if user}
      <p>You're logged in and ready to create your reflection diary.</p>
      <a href="/dashboard" class="btn primary">Go to Dashboard</a>
    {:else}
      <p class="prompt">Please <a href="/login">login</a> or <a href="/register">sign up</a> to generate your reflection diary.</p>
    {/if}
  </div>
  
  <section class="features">
    <h2>How It Works</h2>
    
    <div class="feature-grid">
      <div class="feature">
        <div class="icon">📅</div>
        <h3>Select a Month</h3>
        <p>Choose which month and year you want to create a reflection diary for.</p>
      </div>
      
      <div class="feature">
        <div class="icon">🧠</div>
        <h3>AI-Generated Questions</h3>
        <p>Our system creates thoughtful questions tailored to the month and season.</p>
      </div>
      
      <div class="feature">
        <div class="icon">📝</div>
        <h3>Print & Reflect</h3>
        <p>Download your PDF, print it, and take time each day to reflect and write.</p>
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
</style>