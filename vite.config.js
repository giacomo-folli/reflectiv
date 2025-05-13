import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
        plugins: [sveltekit()],
        server: {
                host: "0.0.0.0",
                port: 5000,
                strictPort: true,
                hmr: {
                        clientPort: 443,
                },
                cors: true,
                allowedHosts: ["b496a14b-df97-44b8-9964-0adf50be16d8-00-6x9036rxcwlo.riker.replit.dev", ".replit.dev"]
        },
        preview: {
                host: "0.0.0.0",
                port: 5000,
        },
});
