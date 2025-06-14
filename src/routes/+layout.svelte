<script lang="ts">
    import { goto, preloadData } from "$app/navigation";
    import "../app.css";
    import { onMount } from "svelte";

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

<div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <span class="logo-icon">📝</span>
                <span class="logo-text">reflectiv</span>
            </div>
        </div>

        <nav class="sidebar-nav">
            <div class="nav-section">
                <h3 class="nav-section-title">Management</h3>
                <ul class="nav-list">
                    {#each navigationItems as item}
                        <li class="nav-item">
                            <button
                                class="nav-link {item.active ? 'active' : ''}"
                                on:click={() => handleNavigation(item)}
                                on:mouseover={() => preloadData(item.url)}
                                on:focus={() => preloadData(item.url)}
                            >
                                <span class="nav-icon">{item.icon}</span>
                                <span class="nav-text">{item.label}</span>
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>

            <div class="nav-section">
                <h3 class="nav-section-title">Personal</h3>
                <ul class="nav-list">
                    {#each personalItems as item}
                        <li class="nav-item">
                            <button
                                class="nav-link"
                                on:click={() => handleNavigation(item)}
                                on:mouseover={() => preloadData(item.url)}
                                on:focus={() => preloadData(item.url)}
                            >
                                <span class="nav-icon">{item.icon}</span>
                                <span class="nav-text">{item.label}</span>
                                {#if item.label == "Messages"}
                                    <span class="nav-badge">+99</span>
                                {/if}
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
        </nav>

        <div class="sidebar-footer">
            <div class="user-profile">
                <div class="user-avatar">
                    <img src="/icons/user.png" alt="User" />
                </div>
                <div class="user-info">
                    <div class="user-name">{user?.name}</div>
                    <div class="user-email">{user?.email}</div>
                </div>
            </div>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
        <!-- <header class="main-header">
            <div class="header-content">
                <h1 class="page-title">Dashboard</h1>
                <p class="page-subtitle">
                    Eu laborum fugiat magna reprehenderit reprehenderit tempor
                </p>
            </div>
            <button class="new-diary-btn">
                <span class="btn-icon">📝</span>
                New Diary
            </button>
        </header> -->

        <div class="dashboard-content">
            <slot />
        </div>
    </main>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        background-color: #f8fafc;
    }

    .app-container {
        display: flex;
        height: 100vh;
    }

    /* Sidebar Styles */
    .sidebar {
        width: 280px;
        background: white;
        border-right: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
    }

    .sidebar-header {
        padding: 20px 24px;
        border-bottom: 1px solid #e2e8f0;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .logo-icon {
        font-size: 20px;
    }

    .logo-text {
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
    }

    .sidebar-nav {
        flex: 1;
        padding: 24px 0;
    }

    .nav-section {
        margin-bottom: 32px;
    }

    .nav-section-title {
        font-size: 12px;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0 0 12px 24px;
    }

    .nav-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .nav-item {
        margin: 0;
    }

    .nav-link {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 12px 24px;
        background: none;
        border: none;
        text-align: left;
        cursor: pointer;
        color: #64748b;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
        position: relative;
    }

    .nav-link:hover {
        background-color: #f1f5f9;
        color: #1e293b;
    }

    .nav-link.active {
        background-color: #6366f1;
        color: white;
        border-radius: 8px;
        margin: 0 12px;
    }

    .nav-icon {
        font-size: 16px;
    }

    .nav-text {
        flex: 1;
    }

    .nav-badge {
        background-color: #ef4444;
        color: white;
        font-size: 11px;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 10px;
        min-width: 20px;
        text-align: center;
    }

    .sidebar-footer {
        padding: 24px;
        border-top: 1px solid #e2e8f0;
    }

    .user-profile {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
    }

    .user-avatar img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .user-info {
        flex: 1;
    }

    .user-name {
        font-size: 14px;
        font-weight: 600;
        color: #1e293b;
    }

    .user-email {
        font-size: 12px;
        color: #64748b;
    }

    .made-with {
        font-size: 12px;
        color: #64748b;
        text-align: center;
    }

    .heart {
        color: #6366f1;
    }

    /* Main Content Styles */
    .main-content {
        flex: 1;
        overflow-y: auto;
    }

    .main-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 32px 40px;
        background: white;
        border-bottom: 1px solid #e2e8f0;
    }

    .header-content h1 {
        font-size: 32px;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 8px 0;
    }

    .page-subtitle {
        font-size: 14px;
        color: #64748b;
        margin: 0;
    }

    .new-diary-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .new-diary-btn:hover {
        background: #5856eb;
    }

    .dashboard-content {
        padding: 32px 40px;
    }

    .active-diary-section {
        margin-bottom: 32px;
    }

    .active-diary-card {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .active-diary-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .active-diary-label {
        font-size: 14px;
        color: #64748b;
        font-weight: 500;
    }

    .active-diary-action {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #1e293b;
        font-weight: 500;
    }

    .arrow {
        font-size: 18px;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        margin-bottom: 32px;
    }

    .stat-card {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .stat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .stat-icon {
        font-size: 20px;
    }

    .stat-chart {
        opacity: 0.7;
    }

    .stat-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .stat-label {
        font-size: 14px;
        color: #64748b;
        font-weight: 500;
    }

    .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: #1e293b;
    }

    .last-diaries-section {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        margin-bottom: 32px;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .section-title {
        font-size: 20px;
        font-weight: 600;
        color: #1e293b;
        margin: 0;
    }

    .see-all-btn {
        background: none;
        border: none;
        color: #6366f1;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
    }

    .diaries-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .diary-entry {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        border-radius: 8px;
        transition: background-color 0.2s;
    }

    .diary-entry:hover {
        background-color: #f8fafc;
    }

    .diary-icon {
        font-size: 20px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f1f5f9;
        border-radius: 8px;
    }

    .diary-info {
        flex: 1;
    }

    .diary-month {
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 4px;
    }

    .diary-pages {
        font-size: 14px;
        color: #64748b;
    }

    .message-notification {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .message-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
    }

    .message-avatar img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .message-info {
        flex: 1;
    }

    .message-name {
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
    }

    .message-time {
        font-size: 14px;
        color: #64748b;
    }

    .message-close {
        background: none;
        border: none;
        font-size: 20px;
        color: #64748b;
        cursor: pointer;
    }

    .message-content {
        font-size: 14px;
        line-height: 1.5;
    }

    .message-preview {
        color: #1e293b;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .message-full {
        color: #64748b;
        margin: 0;
    }
</style>
