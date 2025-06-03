<script lang="ts">
  let name = "John Doe"; // Placeholder name
  let email = "john.doe@example.com"; // Placeholder email
  let newPassword = "";

  function saveChanges() {
    // Handle saving changes here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("New Password:", newPassword);
    // In a real application, you would send this data to a backend server
  }
</script>

<style>
  .settings-form {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: #0056b3;
  }

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
</style>

<div class="settings-form">
  <h1>Settings</h1>
  <form on:submit|preventDefault={saveChanges}>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" bind:value={name} />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={email} />
    </div>

    <div class="form-group">
      <label for="newPassword">New Password</label>
      <input type="password" id="newPassword" bind:value={newPassword} />
    </div>

    <button type="submit">Save changes</button>
  </form>
</div>
