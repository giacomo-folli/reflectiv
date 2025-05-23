# Monthly Reflection Diary

Welcome to the Monthly Reflection Diary! This application helps you keep track of insightful conversations and learnings by allowing you to store links, such as those from ChatGPT discussions. With these saved links, you can then generate personalized monthly reflection diaries in PDF format, making it easier to consolidate your thoughts, track personal growth, and revisit past insights.

## ✨ Features

- 🔐 Secure User Accounts: Full authentication with registration, login, and logout.
- 🔗 Link Management: Easily save and manage links from ChatGPT or other sources.
- 📄 PDF Diary Generation: Create personalized monthly reflection diaries from your saved links, ready for download.
- 📱 Responsive Design: Access your diary seamlessly on desktops, tablets, and smartphones.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later recommended) for running locally or for some build steps.
- npm (comes with Node.js)
- [Docker](https://www.docker.com/get-started) for running with Docker.
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop) for the recommended Docker setup.

### Method 1: Using Docker (Recommended)

#### Quick Start: Docker Compose

1. Clone the repository:

```bash
git clone <repository-url>
cd monthly-reflection-diary
```

2. Create your environment configuration by copying the example `.env.example` file to a new file named `.env` in the project root:

```bash
cp .env.example .env
```

3. Edit the `.env` file. For more details on available variables, see the '### Environment Configuration' section below. At a minimum, you should set:
   - A strong `SESSION_SECRET` (for production)
   - Your `OPENAI_API_KEY` if using AI features
   - Set `PUBLIC_BASE_URL` to your domain in production

4. Build and start the Docker container:

```bash
# Build and start in detached mode
docker-compose up --build -d

# View logs if needed
docker-compose logs -f
```

The application will be available at `http://localhost:3000`.

#### Advanced: Running with Docker Directly

```bash
# Build the optimized multi-stage Docker image
docker build -t reflection-diary .

# Run the container with appropriate environment variables
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e SESSION_SECRET=your_secret_here \
  -e PUBLIC_BASE_URL=http://localhost:3000 \
  -v reflection_diary_data:/app/data \
  -d reflection-diary
```

### Method 2: Using Node.js Locally

#### Clone the repository

```bash
git clone <repository-url>
cd monthly-reflection-diary
```

#### Install dependencies

```bash
npm install
```

#### Configure Environment Variables
Before running the application, you'll need to set up your environment variables. Copy the example file by running `cp .env.example .env`. Then, customize the `.env` file with your specific settings. Refer to the main '### Environment Configuration' section below for details on the variables.

#### Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

#### Build for production

```bash
npm run build
```

#### Run the production build locally

```bash
npm run preview
```

### Environment Configuration

Regardless of how you run the application, environment variables are key for configuration.

1. Ensure you have a `.env` file in the root of your project. If you haven't created one yet, copy the example environment file:

```bash
cp .env.example .env
```

2. Update the `.env` file with your specific configuration:
   - Set a strong `SESSION_SECRET` for production. This is critical for securing user sessions.
   - Add your `OPENAI_API_KEY` if you're planning to use features that interact with the OpenAI API.
   - For Docker, ensure `PUBLIC_BASE_URL` is set, especially for production deployments.
   - Modify other settings as needed for database paths, ports, etc.

## 🧪 Test Credentials

For local development and testing, you can use these credentials:

- Email: `test@example.com`
- Password: `password123`

## 🛠️ How it Works: A Technical Deep Dive

### Project Structure

Understanding the project's layout will help you navigate the codebase. This SvelteKit project uses a standard structure that clearly separates frontend and backend concerns:

- **`src/`**: Contains all the core application code.
  - **`app.html`**: The main HTML template for all pages.
  - **`hooks.client.ts`**: Client-side hooks.
  - **`hooks.server.ts`**: Server-side hooks (e.g., for authentication, request handling).
  - **`lib/`**: Libraries, utilities, and components.
    - **`components/`**: Reusable Svelte components (frontend). These are building blocks for the UI.
    - **`client/`**: Client-specific code (this code only runs in the user's browser).
      - **`utils/`**: Utilities that are only used in the browser (e.g., PDF generation, toast notifications, Svelte transitions).
      - **`types/`**: TypeScript type definitions for client-specific data structures.
    - **`server/`**: Backend-specific code. This code only runs on the server and is never exposed to the client.
      - **`auth.ts`**: Authentication logic (password hashing, session management).
      - **`db.ts`**: Database interaction logic (SQLite setup, queries).
      - _(Potentially `utils/` or other subdirectories for server-specific utilities)_
    - **`types/`**: Shared TypeScript type definitions used by both client and server (e.g., API types, core domain types like User, Link).
    - **`utils/`**: Utility functions that can be used by both client-side and server-side code (e.g., date formatting, validation).
    - **`i18n/`**: Internationalization setup and locale files.
  - **`routes/`**: Defines the application's pages and API endpoints. SvelteKit uses a file-system based router, so the structure of this directory dictates your app's URLs.
    - **`+page.svelte`**: Svelte components for pages (frontend).
    - **`+page.server.ts`**: Server-side load functions for pages (backend logic for fetching data).
    - **`+layout.svelte`**: Svelte components for layouts (frontend).
    - **`+layout.server.ts`**: Server-side load functions for layouts (backend).
    - **`api/`**: Defines API endpoints.
      - **`[endpoint]/+server.ts`**: Server-side handlers for API routes (backend).
- **`static/`**: Static assets (e.g., images, fonts) that are served directly.
- **`scripts/`**: Standalone Node.js scripts for development and operational tasks (e.g., `db-tools.js` for database management). These are not part of the client bundle.
- **`.env` / `.env.example`**: Environment variable configuration.
- **`svelte.config.js`**: SvelteKit configuration.
- **`vite.config.js`**: Vite bundler configuration.

### Data Persistence

The application uses SQLite for data persistence:

1. User data, sessions, and links are stored in a SQLite database.
2. The database file is located in the `./data` directory by default.
3. The location can be configured with the `DATA_DIR` environment variable.
4. When using Docker, the database is persisted using a named Docker volume (see Docker Specifics section).

#### Database Management

The application includes a database management tool for common tasks:

```bash
# View database information and user accounts
node scripts/db-tools.js info

# Export database contents as JSON
node scripts/db-tools.js export

# Reset the database (removes all data)
node scripts/db-tools.js reset
```

For production environments with higher traffic, you might want to:

1. Consider upgrading to a more robust database solution like PostgreSQL.
2. Implement database migrations for schema changes.
3. Enhance the authentication mechanisms with additional security features.

### Authentication

Authentication currently uses simple session-based cookies:

- For local development, the test credentials above will work.
- In production, implement proper password hashing and user management. (Note: The `auth.ts` file includes password hashing.)

### PDF Generation

The app uses jsPDF to generate reflection diary PDFs:

- Each PDF includes daily reflection questions.
- Customize the questions in `src/routes/api/generate-pdf/+server.js`.

### Docker Specifics

#### Docker Data Persistence

The application stores data in a Docker volume when run with Docker:

- Data is stored in the named volume `reflection_diary_data`.
- The volume persists across container restarts and rebuilds.
- Backup the volume for production deployments:

```bash
# Backup the database volume
docker run --rm -v reflection_diary_data:/data -v $(pwd):/backup alpine \
  tar czf /backup/reflection_diary_backup.tar.gz /data

# Restore from a backup
docker run --rm -v reflection_diary_data:/data -v $(pwd):/backup alpine \
  sh -c "rm -rf /data/* && tar xzf /backup/reflection_diary_backup.tar.gz -C /"
```

#### Health Checks & Monitoring

The Docker setup includes:

- Automatic health checks at `/health` endpoint.
- Container restart policy for fault tolerance.
- Resource limits to prevent resource exhaustion.
- Log rotation to manage disk space.

## 🤝 Contributing

We warmly welcome contributions to the Monthly Reflection Diary! Whether you're looking to fix a bug, propose an exciting new feature, or help improve our documentation, your input is highly valued and appreciated.

Here are some ways you can contribute:

-   **🐛 Report Bugs:** If you encounter a bug while using the application, please head over to GitHub Issues and open an issue. Kindly provide as much detail as possible, including steps to reproduce, expected behavior, and actual behavior.
-   **💡 Suggest Enhancements:** Have a great idea for a new feature or an improvement to an existing one? We'd love to hear it! Please open an issue on GitHub to describe your suggestion.
-   **🧑‍💻 Submit Pull Requests:** For direct contributions like bug fixes or implementing new features, feel free to submit a pull request. If you're planning a larger change, we encourage you to open an issue first to discuss the proposed changes and ensure it aligns with the project's direction.

Please use GitHub Issues for tracking all bugs and feature requests. For submitting code changes, please use GitHub Pull Requests. We look forward to collaborating with you and seeing your contributions!

## 📜 License

[MIT](LICENSE)