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

    $: user = data?.user || {
        name: "POMO store 2",
        email: "amoore1999@hotmail.com",
    };
</script>

<div class="flex min-h-screen bg-[#f7f8fa]">
    <!-- Sidebar -->
    <aside
        class="w-[270px] bg-white border-r border-gray-200 flex flex-col rounded-2xl m-3 ml-0 shadow-sm"
    >
        <div class="p-6 pb-4 border-b border-gray-100">
            <div class="flex items-center gap-2">
                <span class="text-xl">
                    <img src="/favicon.svg" alt="logo" class="w-6 h-6" />
                </span>
                <span class="text-lg font-semibold text-gray-800"
                    >reflectiv</span
                >
            </div>
        </div>

        <nav class="flex-1 py-6">
            <div class="mb-8">
                <h3
                    class="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-6 mb-3"
                >
                    Management
                </h3>
                <ul class="space-y-1">
                    {#each navigationItems as item}
                        <li>
                            <button
                                class="flex items-center gap-3 w-full px-6 py-3 text-left text-sm font-medium transition-colors rounded-lg {item.active
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}"
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
                    class="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-6 mb-3"
                >
                    Personal
                </h3>
                <ul class="space-y-1">
                    {#each personalItems as item}
                        <li>
                            <button
                                class="flex items-center gap-3 w-full px-6 py-3 text-left text-sm font-medium transition-colors rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                on:click={() => handleNavigation(item)}
                                on:mouseover={() => preloadData(item.url)}
                                on:focus={() => preloadData(item.url)}
                            >
                                <span class="text-base">{item.icon}</span>
                                <span class="flex-1">{item.label}</span>
                                {#if item.label == "Messages"}
                                    <span
                                        class="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[24px] text-center ml-2"
                                        >99+</span
                                    >
                                {/if}
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
        </nav>

        <div class="p-6 border-t border-gray-100 mt-auto">
            <div class="flex items-center gap-3">
                <img
                    src="https://i.pravatar.cc/40?img=1"
                    alt="User"
                    class="w-10 h-10 rounded-full border border-gray-200"
                />
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
    <main class="flex-1 flex flex-col p-6 md:p-10">
        <div class="flex-1">
            <slot />
        </div>
    </main>
</div>

<Toast position="top-right" />
