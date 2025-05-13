<script>
  import { enhance } from '$app/forms';
  
  let email = '';
  let password = '';
  let error = '';
</script>

<div class="auth-container">
  <div class="auth-grid">
    <div class="form-container">
      <h1>Login</h1>
      <p class="subtitle">Sign in to your account to create personalized reflection diaries.</p>
      
      {#if error}
        <div class="error-box">
          {error}
        </div>
      {/if}
      
      <form method="POST" use:enhance={() => {
        return async ({ result }) => {
          if (result.type === 'failure') {
            error = result.data?.message || 'Login failed. Please try again.';
          }
        };
      }}>
        <div class="form-group">
          <label for="email">Email</label>
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
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            bind:value={password} 
            required 
            autocomplete="current-password"
          />
        </div>
        
        <button type="submit" class="btn btn-primary">Sign In</button>
      </form>
      
      <p class="auth-link">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
    
    <div class="hero-section">
      <div class="hero-content">
        <h2>Reflect and Grow</h2>
        <p>Monthly Reflection Diary helps you track your thoughts, personal growth, and insights throughout each month.</p>
        <ul>
          <li>Generate personalized reflection questions</li>
          <li>Create printable monthly diaries</li>
          <li>Enhance questions with your ChatGPT conversation links</li>
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
</style>