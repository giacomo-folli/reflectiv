<script lang="ts">
  import { UserService } from "$lib/client/services/user.service";
  import type { PageData } from "./$types";

  export let data: PageData;

  let email = data.user?.email || "";
  let name = data.user?.name || "";
  let newPassword = "";
  let confirmNewPassword = "";

  async function saveChanges() {
    if (email == data.user?.email && name == data.user?.name) return;
    if (newPassword != confirmNewPassword) {
      alert("The passwords don't match");
    }

    const service = new UserService({ fetch });
    const user = await service.updateUser({
      name: name,
      email: email,
      newPassword: newPassword || undefined,
    });

    email = user.email;
    name = user.name;
  }
</script>

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

    <div class="form-group">
      <label for="newPassword">Confirm Password</label>
      <input type="password" id="newPassword" bind:value={confirmNewPassword} />
    </div>

    <button type="submit">Save changes</button>
  </form>
</div>

<style>
  .settings-form {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
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