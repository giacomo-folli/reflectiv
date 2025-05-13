import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";


export default defineConfig({
    plugins: [sveltekit()],
    server: {
        host: "0.0.0.0",
        port: 3000,
        strictPort: true,
        cors: {
            origin: "*"
        },
        allowedHosts: ["*", ".replit.dev", ".repl.co"]
    },
    preview: {
        host: "0.0.0.0",
        port: 3000,
    },
});
