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
<div class="mb-8">
    <div class="bg-white rounded-xl p-6 shadow-sm">
        <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500 font-medium">Active Diary</span>
            <div
                class="flex items-center gap-2 text-sm text-gray-800 font-medium"
            >
                <span>go to</span>
                <span class="text-lg">→</span>
            </div>
        </div>
    </div>
</div>

<!-- Stats Cards -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    {#each stats as stat}
        <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex justify-between items-center mb-4">
                <span class="text-xl">{stat.icon}</span>
                <div class="opacity-70">
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
            <div class="flex flex-col gap-1">
                <div class="text-sm text-gray-500 font-medium">
                    {stat.label}
                </div>
                <div class="text-3xl font-bold text-gray-800">{stat.value}</div>
            </div>
        </div>
    {/each}
</div>

<!-- Last Diaries -->
<div class="bg-white rounded-xl p-6 shadow-sm mb-8">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-800 m-0">Last Diaries</h2>
        <button
            class="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >See all</button
        >
    </div>
    <div class="flex flex-col gap-4">
        {#each diaryEntries as entry}
            <div
                class="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <div
                    class="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-xl"
                >
                    {entry.icon}
                </div>
                <div class="flex-1">
                    <div class="text-base font-semibold text-gray-800 mb-1">
                        {entry.month}
                    </div>
                    <div class="text-sm text-gray-500">
                        Pages: {entry.pages}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<!-- Message Notification -->
<div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex items-center gap-3 mb-4">
        <div>
            <img
                src="https://i.pravatar.cc/40?img=1"
                alt="Klara Weaver"
                class="w-10 h-10 rounded-full"
            />
        </div>
        <div class="flex-1">
            <div class="text-base font-semibold text-gray-800">
                Klara Weaver
            </div>
            <div class="text-sm text-gray-500">10:50 AM</div>
        </div>
        <button class="text-xl text-gray-500 hover:text-gray-700">×</button>
    </div>
    <div class="text-sm leading-relaxed">
        <p class="text-gray-800 font-semibold mb-2">
            Nulla aute nisl quis nostrud reprehenderit nisl cillum mollitt anim
            amet duis non esse.
        </p>
        <p class="text-gray-500 m-0">
            Eu laborum fugiat magna reprehenderit reprehenderit tempor aliquip
            nisl officia irure qui ad. Labore pariatur ex ut aliqua ad
            exercitation deserunt eu nisl do velit mollit consequat in quis.
            Adipisicing magna 🚀🚀🚀
        </p>
    </div>
</div>
