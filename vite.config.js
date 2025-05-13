import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
        plugins: [sveltekit()],
        server: {
                host: '0.0.0.0',
                port: 5000,
                strictPort: true,
                hmr: {
                        clientPort: 443
                },
                cors: true
        },
        preview: {
                host: '0.0.0.0',
                port: 5000
        }
});