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

<div class="max-w-2xl mx-auto my-8 p-8">
  <h1 class="text-2xl font-bold text-center mb-6">Settings</h1>

  <form class="space-y-4">
    <div class="space-y-1">
      <label class="block font-semibold text-gray-700">Name</label>
      <input
        type="text"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        bind:value={name}
      />
    </div>

    <div class="space-y-1">
      <label class="block font-semibold text-gray-700">Email</label>
      <input
        type="email"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        bind:value={email}
      />
    </div>

    <div class="space-y-1">
      <label class="block font-semibold text-gray-700">Password</label>
      <input
        type="password"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        bind:value={newPassword}
      />
    </div>

    <div class="space-y-1">
      <label class="block font-semibold text-gray-700">Confirm Password</label>
      <input
        type="password"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        bind:value={confirmNewPassword}
      />
    </div>

    <button
      type="submit"
      class="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
      on:submit|preventDefault={saveChanges}
    >
      Save Changes
    </button>
  </form>
</div>
