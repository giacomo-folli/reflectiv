<script>
  import { enhance } from '$app/forms';
  
  export let data;
  
  let title = '';
  let url = '';
  let error = '';
  let success = '';
  
  // Reset form after submission
  function resetForm() {
    title = '';
    url = '';
  }
  
  $: links = data.links || [];
</script>

<div class="links-page">
  <h1>Your ChatGPT Shared Links</h1>
  <p class="subtitle">Add links to your shared ChatGPT conversations to create more personalized diary questions.</p>
  
  <div class="add-link-form">
    <form 
      method="POST" 
      action="?/addLink"
      use:enhance={() => {
        return async ({ result }) => {
          if (result.type === 'failure') {
            error = result.data?.message || 'Failed to add link. Please try again.';
            success = '';
          } else if (result.type === 'success') {
            success = 'Link added successfully!';
            error = '';
            resetForm();
          }
        };
      }}
    >
      {#if error}
        <div class="error-box">
          {error}
        </div>
      {/if}
      
      {#if success}
        <div class="success-box">
          {success}
        </div>
      {/if}
      
      <div class="form-row">
        <div class="form-group">
          <label for="title">Link Title (optional)</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            placeholder="E.g., Career Planning Discussion"
            bind:value={title}
          />
        </div>
        
        <div class="form-group">
          <label for="url">ChatGPT Shared Link URL</label>
          <input 
            type="url" 
            id="url" 
            name="url" 
            placeholder="https://chat.openai.com/share/..."
            required
            bind:value={url}
          />
        </div>
        
        <div class="form-button">
          <button type="submit" class="btn btn-primary">Add Link</button>
        </div>
      </div>
    </form>
  </div>
  
  <div class="help-box">
    <h3>
      <span class="info-icon">ℹ️</span>
      How to share ChatGPT conversations
    </h3>
    <ol>
      <li>In ChatGPT, click the "Share" button at the top-right of any conversation</li>
      <li>Choose "Copy Link" to copy the URL to your clipboard</li>
      <li>Paste the URL in the form above and add a title (optional)</li>
    </ol>
  </div>
  
  <section class="links-section">
    <h2>Your Current Links</h2>
    
    {#if links.length === 0}
      <div class="empty-state">
        <p>You haven't added any ChatGPT links yet. Add a link to get started.</p>
      </div>
    {:else}
      <div class="links-table">
        <div class="table-header">
          <div class="col-title">Title</div>
          <div class="col-url">URL</div>
          <div class="col-date">Added On</div>
          <div class="col-actions">Actions</div>
        </div>
        
        {#each links as link}
          <div class="table-row">
            <div class="col-title">{link.title || 'Untitled'}</div>
            <div class="col-url">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.url.length > 40 ? link.url.substring(0, 40) + '...' : link.url}
              </a>
            </div>
            <div class="col-date">{link.createdAt}</div>
            <div class="col-actions">
              <form 
                method="POST" 
                action="?/deleteLink"
                use:enhance={() => {
                  return async ({ result }) => {
                    if (result.type === 'failure') {
                      error = result.data?.message || 'Failed to delete link. Please try again.';
                      success = '';
                    }
                  };
                }}
              >
                <input type="hidden" name="id" value={link.id} />
                <button type="submit" class="btn-icon btn-delete">
                  <span class="trash-icon">🗑️</span>
                </button>
              </form>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>
  
  <div class="back-link">
    <a href="/dashboard" class="btn btn-secondary">
      <span class="back-icon">←</span>
      Back to Home
    </a>
  </div>
</div>

<style>
  .links-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: white;
    text-align: center;
  }
  
  .subtitle {
    text-align: center;
    color: #a1a1aa;
    margin-bottom: 2rem;
  }
  
  .add-link-form {
    background-color: #1e293b;
    border-radius: 0.5rem;
    padding: 1.5rem;
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
  
  .success-box {
    background-color: rgba(22, 163, 74, 0.1);
    border: 1px solid rgba(22, 163, 74, 0.5);
    color: #22c55e;
    padding: 0.75rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 2fr auto;
    gap: 1rem;
    align-items: flex-end;
  }
  
  @media (max-width: 768px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }
  
  .form-group {
    margin-bottom: 0.5rem;
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
  }
  
  input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    text-decoration: none;
  }
  
  .btn-primary {
    background-color: #6366f1;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #4f46e5;
  }
  
  .btn-secondary {
    background-color: #4b5563;
    color: white;
  }
  
  .btn-secondary:hover {
    background-color: #374151;
  }
  
  .btn-icon {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.25rem;
    transition: background-color 0.15s ease-in-out;
  }
  
  .btn-delete:hover {
    background-color: rgba(220, 38, 38, 0.1);
  }
  
  .help-box {
    background-color: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin-bottom: 2rem;
  }
  
  .help-box h3 {
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    color: #a5b4fc;
  }
  
  .info-icon {
    margin-right: 0.5rem;
  }
  
  .help-box ol {
    padding-left: 1.5rem;
    margin-bottom: 0;
    color: #d1d5db;
  }
  
  .help-box li {
    margin-bottom: 0.5rem;
  }
  
  .help-box li:last-child {
    margin-bottom: 0;
  }
  
  .links-section {
    margin-bottom: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: white;
  }
  
  .empty-state {
    background-color: #1e293b;
    border-radius: 0.5rem;
    padding: 2rem;
    text-align: center;
    color: #a1a1aa;
  }
  
  .links-table {
    background-color: #1e293b;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .table-header {
    display: grid;
    grid-template-columns: 1.5fr 2fr 1fr 0.5fr;
    padding: 1rem;
    background-color: #374151;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    border-bottom: 1px solid #4b5563;
  }
  
  .table-row {
    display: grid;
    grid-template-columns: 1.5fr 2fr 1fr 0.5fr;
    padding: 1rem;
    border-bottom: 1px solid #2d3748;
    align-items: center;
  }
  
  .table-row:last-child {
    border-bottom: none;
  }
  
  .col-title {
    color: #e5e7eb;
  }
  
  .col-url a {
    color: #a5b4fc;
    text-decoration: none;
    word-break: break-all;
  }
  
  .col-url a:hover {
    text-decoration: underline;
  }
  
  .col-date {
    color: #9ca3af;
    font-size: 0.9rem;
  }
  
  .col-actions {
    text-align: center;
  }
  
  .trash-icon {
    color: #ef4444;
    font-size: 1.2rem;
  }
  
  .back-link {
    display: flex;
    justify-content: center;
  }
  
  .back-icon {
    margin-right: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .table-header, .table-row {
      grid-template-columns: 1fr 1.5fr 1fr 0.5fr;
      font-size: 0.85rem;
    }
  }
  
  @media (max-width: 540px) {
    .table-header .col-url, .table-row .col-url {
      display: none;
    }
    
    .table-header, .table-row {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
  }
</style>