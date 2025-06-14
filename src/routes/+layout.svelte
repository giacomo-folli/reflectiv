<script lang="ts">
    import { goto, preloadData } from "$app/navigation";
    import Toast from "$lib/components/Toast.svelte";
    import "../app.css";

    export let data;

    let activeSection = "Dashboard";

    interface NavigationItem {
        url: string;
        label: string;
        icon?: string;
        active: boolean;
    }

    const navigationItems: NavigationItem[] = [
        { url: "/dashboard", label: "Dashboard", icon: "📊", active: true },
        { url: "/generated", label: "Generated", icon: "📝", active: false },
        { url: "/links", label: "Links", icon: "🔗", active: false },
    ];

    const personalItems: NavigationItem[] = [
        {
            url: "/messages",
            label: "Messages",
            icon: "💬",
            active: false,
        },
        { url: "/checkin", label: "Check in", icon: "🔔", active: false },
        { url: "/settings", label: "Settings", icon: "⚙️", active: false },
    ];

    function handleNavigation(item: NavigationItem) {
        activeSection = item.label;
        goto(item.url);
    }

    $: user = data?.user || undefined;
</script>

<div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-[280px] bg-white border-r border-gray-200 flex flex-col">
        <div class="p-5 border-b border-gray-200">
            <div class="flex items-center gap-2">
                <span class="text-xl">
                    <img src="/favicon.svg" alt="logo" />
                </span>
                <span class="text-lg font-semibold text-gray-800"
                    >reflectiv</span
                >
            </div>
        </div>

        <nav class="flex-1 py-6">
            <div class="mb-8">
                <h3
                    class="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-6 mb-3"
                >
                    Management
                </h3>
                <ul class="space-y-1">
                    {#each navigationItems as item}
                        <li>
                            <button
                                class="flex items-center gap-3 w-full px-6 py-3 text-left text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors {item.active
                                    ? 'bg-indigo-600 text-white rounded-lg mx-3'
                                    : ''}"
                                on:click={() => handleNavigation(item)}
                                on:mouseover={() => preloadData(item.url)}
                                on:focus={() => preloadData(item.url)}
                            >
                                <span class="text-base">{item.icon}</span>
                                <span class="flex-1">{item.label}</span>
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>

            <div class="mb-8">
                <h3
                    class="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-6 mb-3"
                >
                    Personal
                </h3>
                <ul class="space-y-1">
                    {#each personalItems as item}
                        <li>
                            <button
                                class="flex items-center gap-3 w-full px-6 py-3 text-left text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors"
                                on:click={() => handleNavigation(item)}
                                on:mouseover={() => preloadData(item.url)}
                                on:focus={() => preloadData(item.url)}
                            >
                                <span class="text-base">{item.icon}</span>
                                <span class="flex-1">{item.label}</span>
                                {#if item.label == "Messages"}
                                    <span
                                        class="bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                                        >+99</span
                                    >
                                {/if}
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
        </nav>

        <div class="p-6 border-t border-gray-200">
            <div class="flex items-center gap-3 mb-4">
                <div>
                    <img
                        src="/icons/user.png"
                        alt="User"
                        class="w-10 h-10 rounded-full"
                    />
                </div>
                <div class="flex-1">
                    <div class="text-sm font-semibold text-gray-800">
                        {user?.name}
                    </div>
                    <div class="text-xs text-gray-500">{user?.email}</div>
                </div>
            </div>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
        <div class="p-8">
            <slot />
        </div>
    </main>
</div>

<Toast position="top-right" />
