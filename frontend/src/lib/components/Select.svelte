<script lang="ts">
  export let label: string;
  export let value: string;
  export let options: {
    value: string;
    label: string;
  }[] = [];
</script>

<div class="text-left">
  <label for={label.toLowerCase()} class="block text-gray-300 text-sm mb-2"
    >{label}</label
  >
  <select
    id={label.toLowerCase()}
    bind:value
    class="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
  >
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</div>
