<script lang="ts">
    import { goto, preloadData } from "$app/navigation";
    import type { User } from "$lib/server/schema";

    interface NavigationItem {
        url: string;
        label: string;
        icon?: string;
        active: boolean;
    }

    export let items: NavigationItem[] = [];
    export let user: User | undefined = undefined;

    function handleNavigation(item: NavigationItem) {
        items.map((i) => (i.active = false));

        item.active = true;
        items = items;
        console.log(items);

        goto(item.url);
    }
</script>

<!-- Sidebar -->
<aside
    class="w-[270px] bg-white border-r border-gray-200 flex flex-col rounded-2xl m-3 ml-0 shadow-sm"
>
    <div class="p-6 pb-4 border-b border-gray-100">
        <div class="flex items-center gap-2">
            <span class="text-xl">
                <img src="/favicon.svg" alt="logo" class="w-6 h-6" />
            </span>
            <span class="text-lg font-semibold text-gray-800">reflectiv</span>
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
                {#each items as item}
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
