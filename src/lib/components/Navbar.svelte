<script lang="ts">
  import type { User } from "$lib/types/user.types";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";
  import Transition from "./Transition.svelte";

  export let user: User | undefined = undefined;
</script>

<div class="container max-w-6xl mx-auto px-4 flex justify-between items-center">
  <Transition transition="flyRight" delay={100} duration={300}>
    <div>
      <a
        href={user ? "/dashboard" : "/"}
        class="flex items-center text-gray-100 font-semibold text-xl no-underline"
      >
        <span class="mr-2">📕</span>
        Reflection Diary
      </a>
    </div>
  </Transition>

  <nav class="flex gap-6 items-center">
    {#if user}
      <Transition transition="fadeIn" delay={250} duration={200}>
        <a
          href="/links"
          class="text-gray-400 hover:text-white text-sm transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-indigo-500 after:bottom-[-2px] after:left-0 after:transition-all hover:after:w-full"
          >Links</a
        >
      </Transition>
      <Transition transition="fadeIn" delay={300} duration={200}>
        <form action="/logout" method="POST">
          <button
            type="submit"
            class="text-gray-400 hover:text-white text-sm transition-colors bg-transparent border-0 p-0 cursor-pointer relative after:absolute after:w-0 after:h-0.5 after:bg-indigo-500 after:bottom-[-2px] after:left-0 after:transition-all hover:after:w-full"
            >Logout</button
          >
        </form>
      </Transition>
      <Transition transition="fadeIn" delay={350} duration={200}>
        <LanguageSwitcher />
      </Transition>
    {:else}
      <Transition transition="fadeIn" delay={200} duration={200}>
        <a
          href="/"
          class="text-gray-400 hover:text-white text-sm transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-indigo-500 after:bottom-[-2px] after:left-0 after:transition-all hover:after:w-full"
          >Home</a
        >
      </Transition>
      <Transition transition="fadeIn" delay={250} duration={200}>
        <a
          href="/login"
          class="text-gray-400 hover:text-white text-sm transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-indigo-500 after:bottom-[-2px] after:left-0 after:transition-all hover:after:w-full"
          >Login</a
        >
      </Transition>
      <Transition transition="fadeIn" delay={300} duration={200}>
        <a
          href="/register"
          class="text-gray-400 hover:text-white text-sm transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-indigo-500 after:bottom-[-2px] after:left-0 after:transition-all hover:after:w-full"
          >Sign Up</a
        >
      </Transition>
      <Transition transition="fadeIn" delay={350} duration={200}>
        <LanguageSwitcher />
      </Transition>
    {/if}
  </nav>
</div>
