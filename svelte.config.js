import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(),
        // Disable CSRF protection for development
        csrf: {
            checkOrigin: false
        }
    }
};

export default config;