<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { AuthService } from '$lib/services/auth.service';
	import type { User } from '$lib/services/user.service';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import Transition from './Transition.svelte';

	export let user: User | undefined = undefined;

	async function handleLogout() {
		const service = new AuthService({ fetch });
		await service.logout();
		await invalidateAll();
	}
</script>

<div class="container mx-auto flex max-w-6xl items-center justify-between px-4">
	<Transition transition="flyRight" delay={100} duration={300}>
		<div>
			<a
				href={user ? '/dashboard' : '/'}
				class="flex items-center text-xl font-semibold text-gray-100 no-underline"
			>
				<span class="mr-2">📕</span>
				Reflection Diary
			</a>
		</div>
	</Transition>

	<nav class="flex items-center gap-6">
		{#if user}
			<Transition transition="fadeIn" delay={250} duration={200}>
				<a
					href="/links"
					class="relative text-sm text-gray-400 transition-colors after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-indigo-500 after:transition-all hover:text-white hover:after:w-full"
					>Links</a
				>
			</Transition>
			<Transition transition="fadeIn" delay={250} duration={200}>
				<a
					href="/settings"
					class="relative text-sm text-gray-400 transition-colors after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-indigo-500 after:transition-all hover:text-white hover:after:w-full"
					>Settings</a
				>
			</Transition>
			<Transition transition="fadeIn" delay={300} duration={200}>
				<button
					on:click={handleLogout}
					class="relative cursor-pointer border-0 bg-transparent p-0 text-sm text-gray-400 transition-colors after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-indigo-500 after:transition-all hover:text-white hover:after:w-full"
					>Logout
				</button>
			</Transition>
			<Transition transition="fadeIn" delay={350} duration={200}>
				<LanguageSwitcher />
			</Transition>
		{:else}
			<Transition transition="fadeIn" delay={200} duration={200}>
				<a
					href="/"
					class="relative text-sm text-gray-400 transition-colors after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-indigo-500 after:transition-all hover:text-white hover:after:w-full"
					>Home</a
				>
			</Transition>
			<Transition transition="fadeIn" delay={250} duration={200}>
				<a
					href="/login"
					class="relative text-sm text-gray-400 transition-colors after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-indigo-500 after:transition-all hover:text-white hover:after:w-full"
					>Login</a
				>
			</Transition>
			<Transition transition="fadeIn" delay={300} duration={200}>
				<a
					href="/register"
					class="relative text-sm text-gray-400 transition-colors after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-indigo-500 after:transition-all hover:text-white hover:after:w-full"
					>Sign Up</a
				>
			</Transition>
			<Transition transition="fadeIn" delay={350} duration={200}>
				<LanguageSwitcher />
			</Transition>
		{/if}
	</nav>
</div>
