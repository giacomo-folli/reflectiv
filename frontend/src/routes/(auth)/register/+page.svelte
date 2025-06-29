<script lang="ts">
	import { goto } from '$app/navigation';
	import { AuthService } from '$lib/services/auth.service';
	import { locale } from 'svelte-i18n';

	let fullName: string = $state('');
	let email: string = $state('');
	let password: string = $state('');
	let confirmPassword: string = $state('');
	let error: string = $state('');

	const translations = {
		en: {
			title: 'Create Account',
			subtitle: 'Sign up to create your monthly reflection diaries.',
			name: 'Full Name',
			email: 'Email',
			password: 'Password',
			confirmPassword: 'Confirm Password',
			createAccount: 'Create Account',
			haveAccount: 'Already have an account?',
			login: 'Log in here',
			errorDefault: 'Registration failed. Please try again.',
			heroTitle: 'Begin Your Reflection Journey',
			heroText:
				'Monthly Reflection Diary provides a structured way to document your thoughts and growth throughout each month.',
			feature1: 'Create personalized diary PDFs for any month',
			feature2: "Thoughtful questions tailored to each month's themes",
			feature3: 'Enhance with your ChatGPT conversations',
			feature4: 'Download, print, and fill in at your own pace'
		},
		it: {
			title: 'Crea Account',
			subtitle: 'Registrati per creare i tuoi diari di riflessione mensili.',
			name: 'Nome Completo',
			email: 'Email',
			password: 'Password',
			confirmPassword: 'Conferma Password',
			createAccount: 'Crea Account',
			haveAccount: 'Hai già un account?',
			login: 'Accedi qui',
			errorDefault: 'Registrazione fallita. Riprova.',
			heroTitle: 'Inizia il Tuo Percorso di Riflessione',
			heroText:
				'Il Diario di Riflessione Mensile offre un modo strutturato per documentare i tuoi pensieri e la tua crescita durante ogni mese.',
			feature1: 'Crea PDF di diario personalizzati per qualsiasi mese',
			feature2: 'Domande significative adattate ai temi di ogni mese',
			feature3: 'Arricchisci con le tue conversazioni ChatGPT',
			feature4: 'Scarica, stampa e compila al tuo ritmo'
		}
	};

	// @ts-ignore
	let t = $derived(translations[$locale || 'en']);

	let loading = false;
	async function handleRegister() {
		try {
			if (!fullName || !email || !password || !confirmPassword) return;
			if (password !== confirmPassword) return;

			const service = new AuthService({ fetch });
			await service.register({ fullName, email, password }).then(() => goto('/login'));
		} catch (error: unknown) {
			const err = error instanceof Error ? error.message : 'Registration failed. Please try again.';
			console.error(err);
		}
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

			<div class="mb-6">
				<div class="mb-5">
					<label for="name" class="mb-2 block text-sm text-gray-300">{t.name}</label>
					<input
						type="text"
						id="name"
						name="name"
						bind:value={fullName}
						required
						autocomplete="name"
						class="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-base text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
					/>
				</div>

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
						autocomplete="new-password"
						class="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-base text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
					/>
				</div>

				<div class="mb-5">
					<label for="confirm-password" class="mb-2 block text-sm text-gray-300"
						>{t.confirmPassword}</label
					>
					<input
						type="password"
						id="confirm-password"
						name="confirmPassword"
						bind:value={confirmPassword}
						required
						autocomplete="new-password"
						class="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-base text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
					/>
				</div>

				<button
					onclick={() => handleRegister()}
					class="w-full rounded-md bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700 {loading
						? 'pointer-events-none'
						: ''}"
				>
					{#if loading}
						Loading...
					{:else}
						{t.createAccount}
					{/if}
				</button>
			</div>

			<p class="text-center text-sm text-gray-400">
				{t.haveAccount}
				<a href="/login" class="text-purple-400 underline hover:text-purple-300">{t.login}</a>
			</p>

			<div class="mt-6 flex justify-center gap-2">
				<button
					class={'cursor-pointer rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-xs text-gray-400 transition-all ' +
						($locale === 'en' ? 'border-indigo-500 bg-indigo-600 text-white' : '')}
					onclick={() => locale.set('en')}
				>
					🇬🇧 English
				</button>
				<button
					class={'cursor-pointer rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-xs text-gray-400 transition-all ' +
						($locale === 'it' ? 'border-indigo-500 bg-indigo-600 text-white' : '')}
					onclick={() => locale.set('it')}
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
					<li class="flex items-start">
						<span class="mr-2 text-purple-400">✓</span>
						<span class="text-purple-100">{t.feature4}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
