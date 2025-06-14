<script lang="ts">
    const diaryEntries = [
        { month: "February 24", pages: 30, icon: "🏠" },
        { month: "January 24", pages: 30, icon: "🌙" },
        { month: "December 23", pages: 30, icon: "☕" },
        { month: "November 23", pages: 30, icon: "👑" },
        { month: "October 23", pages: 30, icon: "🔗" },
    ];

    const stats = [
        { label: "Total Diaries", value: "18", icon: "📖" },
        { label: "Total Pages", value: "580", icon: "👥" },
        { label: "Total Links", value: "10", icon: "🔗" },
    ];
</script>

<!-- Active Diary Section -->
<div class="active-diary-section">
    <div class="active-diary-card">
        <div class="active-diary-content">
            <span class="active-diary-label">Active Diary</span>
            <div class="active-diary-action">
                <span class="go-to-text">go to</span>
                <span class="arrow">→</span>
            </div>
        </div>
    </div>
</div>

<!-- Stats Cards -->
<div class="stats-grid">
    {#each stats as stat}
        <div class="stat-card">
            <div class="stat-header">
                <span class="stat-icon">{stat.icon}</span>
                <div class="stat-chart">
                    <svg width="60" height="30" viewBox="0 0 60 30">
                        <path
                            d="M5,25 Q15,15 25,20 T45,10 T55,15"
                            stroke="#6366f1"
                            stroke-width="2"
                            fill="none"
                        />
                    </svg>
                </div>
            </div>
            <div class="stat-content">
                <div class="stat-label">{stat.label}</div>
                <div class="stat-value">{stat.value}</div>
            </div>
        </div>
    {/each}
</div>

<!-- Last Diaries -->
<div class="last-diaries-section">
    <div class="section-header">
        <h2 class="section-title">Last Diaries</h2>
        <button class="see-all-btn">See all</button>
    </div>
    <div class="diaries-list">
        {#each diaryEntries as entry}
            <div class="diary-entry">
                <div class="diary-icon">{entry.icon}</div>
                <div class="diary-info">
                    <div class="diary-month">{entry.month}</div>
                    <div class="diary-pages">
                        Pages: {entry.pages}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<!-- Message Notification -->
<div class="message-notification">
    <div class="message-header">
        <div class="message-avatar">
            <img src="https://i.pravatar.cc/40?img=1" alt="Klara Weaver" />
        </div>
        <div class="message-info">
            <div class="message-name">Klara Weaver</div>
            <div class="message-time">10:50 AM</div>
        </div>
        <button class="message-close">×</button>
    </div>
    <div class="message-content">
        <p class="message-preview">
            Nulla aute nisl quis nostrud reprehenderit nisl cillum mollitt anim
            amet duis non esse.
        </p>
        <p class="message-full">
            Eu laborum fugiat magna reprehenderit reprehenderit tempor aliquip
            nisl officia irure qui ad. Labore pariatur ex ut aliqua ad
            exercitation deserunt eu nisl do velit mollit consequat in quis.
            Adipisicing magna 🚀🚀🚀
        </p>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        background-color: #f8fafc;
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
