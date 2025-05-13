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
    cors: {
      origin: "*",
    },
    fs: {
      allow: [".."],
    },
    // Allow any host to connect to this server
    allowedHosts: ["*", ".replit.dev", ".repl.co"],
  },
  preview: {
    host: "0.0.0.0",
    port: 5000,
  },
});
