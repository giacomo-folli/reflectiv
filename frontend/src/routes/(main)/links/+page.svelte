<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import { LinkService } from '$lib/services/link.service';

	export let data: PageData;

	let title: string = '';
	let url: string = '';
	let error: string = '';
	let success: string = '';

	let infoOpen: boolean = false;

	async function handleCreateLink() {
		const service = new LinkService({ fetch });
		await service.create(url, title);

		title = '';
		url = '';

		return { success: true };
	}

	async function handleDeleteLink(id: number) {
		const service = new LinkService({ fetch });
		await service.delete(Number(id));

		return { success: true };
	}

	$: links = data.links;

	let modalOpen = false;
</script>

<div class="mx-auto max-w-4xl px-4 py-4">
	<section class="mb-8">
		<div class="flex justify-between">
			<h2 class="mb-4 text-2xl font-bold text-white">Your Current Links</h2>

			<button on:click={() => (modalOpen = true)}>Add</button>
		</div>

		{#if links.length === 0}
			<div class="rounded-lg bg-gray-800 p-8 text-center text-gray-400">
				<p>You haven't added any ChatGPT links yet. Add a link to get started.</p>
			</div>
		{:else}
			<div class="overflow-hidden rounded-lg bg-gray-800">
				<div
					class="grid grid-cols-[1.5fr_2.5fr_0.5fr_0.5fr] border-b border-gray-600 bg-gray-700 p-4 text-sm font-semibold md:grid-cols-[1.5fr_2.5fr_0.5fr_0.5fr]"
				>
					<div class="text-white">Title</div>
					<div class="hidden text-white sm:block">URL</div>
					<div class="text-white">Added On</div>
					<div class="text-center text-white">Actions</div>
				</div>

				{#each links as link}
					<div
						class="grid grid-cols-[1.5fr_2.5fr_0.5fr_0.5fr] items-center border-b border-gray-700 p-4 md:grid-cols-[1.5fr_2.5fr_0.5fr_0.5fr]"
					>
						<div class="text-gray-200">{link.title || 'Untitled'}</div>
						<div class="hidden sm:block">
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								class="line-clamp-1 w-full break-all pr-4 text-indigo-300 hover:underline"
							>
								{link.url}
							</a>
						</div>
						<div class="text-sm text-gray-400">
							{new Date(link.createdAt).toLocaleDateString()}
						</div>
						<div class="text-center">
							<div>
								<input type="hidden" name="id" value={link.id} />
								<button
									on:click={() => handleDeleteLink(link.id)}
									class="rounded border-0 bg-transparent p-2 transition-colors hover:bg-red-900/10"
								>
									<span class="text-xl text-red-500">Delete</span>
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<div class="flex justify-center">
		<a
			href="/dashboard"
			class="inline-flex items-center justify-center rounded-md bg-gray-600 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-500"
		>
			<span class="mr-2">←</span>
			Back to Home
		</a>
	</div>
</div>

<!-- Modal for adding a new link -->
{#if modalOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
		<div class="relative mb-6 w-full max-w-2xl rounded-lg bg-gray-800 p-6 shadow-lg">
			<button
				class="absolute right-4 top-4 text-2xl text-gray-400 hover:text-white"
				on:click={() => (modalOpen = false)}
				aria-label="Close"
			>
				&times;
			</button>
			<div>
				{#if error}
					<div class="mb-4 rounded-md border border-red-500/50 bg-red-900/20 p-3 text-red-400">
						{error}
					</div>
				{/if}

				{#if success}
					<div
						class="mb-4 rounded-md border border-green-500/50 bg-green-900/20 p-3 text-green-400"
					>
						{success}
					</div>
				{/if}

				<div class="grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_2fr_auto]">
					<div class="mb-2 md:mb-0">
						<label for="title" class="mb-2 block text-sm text-gray-300">Link Title (optional)</label
						>
						<input
							type="text"
							id="title"
							name="title"
							placeholder="E.g., Career Planning Discussion"
							bind:value={title}
							class="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
						/>
					</div>

					<div class="mb-2 md:mb-0">
						<label for="url" class="mb-2 block text-sm text-gray-300">ChatGPT Shared Link URL</label
						>
						<input
							type="url"
							id="url"
							name="url"
							placeholder="https://chat.openai.com/share/..."
							required
							bind:value={url}
							class="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
						/>
					</div>

					<div>
						<button
							on:click={handleCreateLink}
							class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
						>
							Add Link
						</button>
					</div>
				</div>
			</div>

			<button
				on:click={() => (infoOpen = !infoOpen)}
				class="mt-6 w-full rounded-lg border border-indigo-500/30 bg-indigo-900/10 p-4 text-sm"
			>
				<h3 class="flex items-center font-medium text-indigo-300">
					<span class="mr-2">ℹ️</span> How to share ChatGPT conversations
				</h3>
				{#if infoOpen}
					<ol transition:slide class="mt-4 space-y-2 pl-6 text-gray-300">
						<li>In ChatGPT, click the "Share" button at the top-right of any conversation</li>
						<li>Choose "Copy Link" to copy the URL to your clipboard</li>
						<li>Paste the URL in the form above and add a title (optional)</li>
					</ol>
				{/if}
			</button>
		</div>
	</div>
{/if}
