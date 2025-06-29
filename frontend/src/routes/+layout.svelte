<script lang="ts">
	// import Toast from '$lib/components/Toast.svelte';
	import Transition from '$lib/components/Transition.svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';

	export let data;

	let initialLoad = true;
	onMount(() => {
		setTimeout(() => (initialLoad = false), 100);
	});
</script>

<div class="flex h-full min-h-screen flex-col">
	<!-- <Toast position="top-right" /> -->

	<header class="border-b border-gray-700 bg-gray-800 py-4">
		<Navbar user={data.user} />
	</header>

	<main class="relative z-10 h-full flex-1 py-8">
		<slot />
	</main>

	<footer class="border-t border-gray-700 bg-gray-800 py-3 text-center">
		<div class="container mx-auto max-w-6xl px-4">
			<Transition transition="fadeIn" delay={400} duration={200}>
				<p class="text-[12px] tracking-wider text-gray-400">
					reflectiv - made with ♥️ & ☕ by
					<a href="https://github.com/giacomo-folli" target="_blank"> giacomo folli </a>
				</p>
			</Transition>
		</div>
	</footer>
</div>

<style>
	/* These styles are required to maintain the page transition functionality */
	:global(.page-transition) {
		will-change: transform, opacity;
	}

	/* Global base styles that can't be handled by Tailwind */
	:global(body) {
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
		background-color: #111827;
		color: #f3f4f6;
		margin: 0;
		padding: 0;
		line-height: 1.6;
	}

	:global(*) {
		box-sizing: border-box;
	}
</style>
