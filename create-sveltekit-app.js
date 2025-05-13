import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Create a new SvelteKit project
execSync('npm create svelte@latest my-app --template skeleton --types typescript --no-eslint --no-prettier --no-playwright --no-vitest', { stdio: 'inherit' });

// Install dependencies
process.chdir('my-app');
execSync('npm install', { stdio: 'inherit' });

// Install additional dependencies for our project
execSync('npm install jspdf', { stdio: 'inherit' });

// Setup TailwindCSS
execSync('npm install -D tailwindcss postcss autoprefixer', { stdio: 'inherit' });
execSync('npx tailwindcss init -p', { stdio: 'inherit' });

// Configure TailwindCSS
fs.writeFileSync('tailwind.config.js', `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#111827',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1'
        },
        indigo: {
          900: '#312e81',
          800: '#3730a3',
          700: '#4338ca',
          600: '#4f46e5',
          500: '#6366f1',
          400: '#818cf8',
          300: '#a5b4fc'
        }
      }
    }
  },
  plugins: []
};`);

// Create app.css with TailwindCSS directives
const appCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-color: #6366f1;
  --accent-color: #8b5cf6;
  --background-dark: #111827;
  --card-background: #1e293b;
  --text-color: #f3f4f6;
  --text-secondary: #a1a1aa;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--background-dark);
  color: var(--text-color);
}

.card {
  background-color: var(--card-background);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

input, select, textarea {
  background-color: #2d3748;
  border: 1px solid #4a5568;
  color: var(--text-color);
  padding: 0.75rem;
  border-radius: 0.375rem;
  width: 100%;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.btn {
  @apply px-4 py-2 rounded-md text-white font-medium transition-colors;
}

.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-700;
}

.btn-secondary {
  @apply bg-gray-700 hover:bg-gray-800;
}

.btn-danger {
  @apply bg-red-600 hover:bg-red-700;
}

a {
  @apply text-indigo-400 hover:text-indigo-300;
}`;

fs.writeFileSync('src/app.css', appCssContent);

// Update app.html to include TailwindCSS
const appHtmlContent = `<!DOCTYPE html>
<html lang="en">
        <head>
                <meta charset="utf-8" />
                <link rel="icon" href="%sveltekit.assets%/favicon.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Reflection Diary</title>
                %sveltekit.head%
        </head>
        <body data-sveltekit-preload-data="hover" class="bg-gray-900 text-gray-100 min-h-screen">
                <div style="display: contents">%sveltekit.body%</div>
        </body>
</html>`;

fs.writeFileSync('src/app.html', appHtmlContent);

// Create the favicon SVG
if (!fs.existsSync('static')) {
  fs.mkdirSync('static');
}

const faviconContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
</svg>`;

fs.writeFileSync('static/favicon.svg', faviconContent);

// Update vite.config.js to include server host and port
const viteConfigContent = `import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    host: '0.0.0.0',
    port: 5000
  }
});`;

fs.writeFileSync('vite.config.js', viteConfigContent);

console.log('SvelteKit app created and configured successfully!');