<script lang="ts">
	import { goto } from '$app/navigation';
	import { AuthService } from '$lib/services/auth.service';
	import { locale } from 'svelte-i18n';

	let email: string = '';
	let password: string = '';
	let error: string = '';
	let loading = false;

	const translations = {
		en: {
			title: 'Login',
			subtitle: 'Sign in to your account to create personalized reflection diaries.',
			email: 'Email',
			password: 'Password',
			signIn: 'Sign In',
			noAccount: "Don't have an account?",
			register: 'Register here',
			errorDefault: 'Login failed. Please try again.',
			heroTitle: 'Reflect and Grow',
			heroText:
				'Monthly Reflection Diary helps you track your thoughts, personal growth, and insights throughout each month.',
			feature1: 'Generate personalized reflection questions',
			feature2: 'Create printable monthly diaries',
			feature3: 'Enhance questions with your ChatGPT conversation links'
		},
		it: {
			title: 'Accedi',
			subtitle: 'Accedi al tuo account per creare diari di riflessione personalizzati.',
			email: 'Email',
			password: 'Password',
			signIn: 'Accedi',
			noAccount: 'Non hai un account?',
			register: 'Registrati qui',
			errorDefault: 'Accesso fallito. Riprova.',
			heroTitle: 'Rifletti e Cresci',
			heroText:
				'Il Diario di Riflessione Mensile ti aiuta a tenere traccia dei tuoi pensieri, della crescita personale e delle intuizioni durante ogni mese.',
			feature1: 'Genera domande di riflessione personalizzate',
			feature2: 'Crea diari mensili stampabili',
			feature3: 'Arricchisci le domande con i link alle tue conversazioni ChatGPT'
		}
	};

	// @ts-ignore
	$: t = translations[$locale || 'en'];

	async function handleLogin(event: Event) {
		event.preventDefault();

		if (!email || !password) {
			error = 'Email and password are required';
			return;
		}
		loading = true;

		const service = new AuthService({ fetch });
		await service
			.login(email, password)
			.then(() => goto('/dashboard', { invalidateAll: true }))
			.catch((err) => (error = err?.message));

		loading = false;
	}
</script>

<div class="mx-auto max-w-5xl p-4 sm:p-8">
	<div class="grid min-h-[500px] gap-8 md:grid-cols-2">
		<!-- Form Section -->
		<div class="rounded-lg bg-gray-800 p-8">
			<h1 class="mb-2 text-2xl font-bold text-white">{t.title}</h1>
			<p class="mb-6 text-gray-400">{t.subtitle}</p>

			{#if error}
				<div class="mb-4 rounded-md border border-red-500/50 bg-red-900/20 p-3 text-red-400">
					{error}
				</div>
			{/if}

			<form on:submit={handleLogin} class="mb-6">
				<div class="mb-5">
					<label for="email" class="mb-2 block text-sm text-gray-300">{t.email}</label>
					<input
						type="email"
						id="email"
						name="email"
						bind:value={email}
						required
						autocomplete="email"
						class="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-base text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
					/>
				</div>

				<div class="mb-5">
					<label for="password" class="mb-2 block text-sm text-gray-300">{t.password}</label>
					<input
						type="password"
						id="password"
						name="password"
						bind:value={password}
						required
						autocomplete="current-password"
						class="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-base text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
					/>
				</div>

				<button
					type="submit"
					class="w-full rounded-md bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700 {loading
						? 'pointer-events-none'
						: ''}"
				>
					{#if loading}
						Loading...
					{:else}
						{t.signIn}
					{/if}
				</button>
			</form>

			<p class="text-center text-sm text-gray-400">
				{t.noAccount}
				<a href="/register" class="text-purple-400 underline hover:text-purple-300">{t.register}</a>
			</p>

			<div class="mt-6 flex justify-center gap-2">
				<button
					class={'cursor-pointer rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-xs text-gray-400 transition-all ' +
						($locale === 'en' ? 'border-indigo-500 bg-indigo-600 text-white' : '')}
					on:click={() => locale.set('en')}
				>
					🇬🇧 English
				</button>
				<button
					class={'cursor-pointer rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-xs text-gray-400 transition-all ' +
						($locale === 'it' ? 'border-indigo-500 bg-indigo-600 text-white' : '')}
					on:click={() => locale.set('it')}
				>
					🇮🇹 Italiano
				</button>
			</div>
		</div>

		<!-- Hero Section -->
		<div
			class="hidden items-center justify-center overflow-hidden rounded-lg bg-purple-900 md:flex"
		>
			<div class="p-10 text-white">
				<h2 class="mb-4 text-2xl font-bold">{t.heroTitle}</h2>
				<p class="mb-6 leading-relaxed text-purple-200">{t.heroText}</p>
				<ul class="space-y-3">
					<li class="flex items-start">
						<span class="mr-2 text-purple-400">✓</span>
						<span class="text-purple-100">{t.feature1}</span>
					</li>
					<li class="flex items-start">
						<span class="mr-2 text-purple-400">✓</span>
						<span class="text-purple-100">{t.feature2}</span>
					</li>
					<li class="flex items-start">
						<span class="mr-2 text-purple-400">✓</span>
						<span class="text-purple-100">{t.feature3}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
