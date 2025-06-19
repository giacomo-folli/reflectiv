<script lang="ts">
    import Sidebar from "$lib/components/Sidebar.svelte";
    import Toast from "$lib/components/Toast.svelte";
    import "../app.css";

    export let data;

    interface NavigationItem {
        url: string;
        label: string;
        icon?: string;
        active: boolean;
    }

    let items: NavigationItem[] = [
        {
            url: "/dashboard",
            label: "Dashboard",
            icon: "📊",
            active: true,
        },
        {
            url: "/links",
            label: "Links",
            icon: "🔗",
            active: false,
        },
        {
            url: "/settings",
            label: "Settings",
            icon: "⚙️",
            active: false,
        },
    ];

    $: user = data?.user || undefined;
</script>

<div class="flex min-h-screen bg-[#f7f8fa]">
    <!-- Sidebar -->
    <Sidebar {user} bind:items />

    <!-- Main Content -->
    <main class="flex-1 flex flex-col p-6 md:p-10">
        <div class="flex-1">
            <slot />
        </div>
    </main>
</div>

<Toast position="top-right" />
