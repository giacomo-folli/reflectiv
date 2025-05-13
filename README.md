# Monthly Reflection Diary

A SvelteKit application that allows users to store ChatGPT conversation links and generate personalized monthly reflection diaries in PDF format.

## Features

- User authentication (register, login, logout)
- Store and manage ChatGPT conversation links
- Generate personalized monthly reflection diaries as PDFs
- Responsive design for all devices

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later recommended)
- npm (comes with Node.js)

## Local Development Setup

### Clone the repository

```bash
git clone <repository-url>
cd monthly-reflection-diary
```

### Install dependencies

```bash
npm install
```

### Environment Configuration

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Update the `.env` file with your specific configuration:
   - Set a strong `SESSION_SECRET` for production
   - Add your `OPENAI_API_KEY` if you're using OpenAI API features
   - Modify other settings as needed

### Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

### Build for production

```bash
npm run build
```

### Run the production build locally

```bash
npm run preview
```

## Project Structure

- `src/` - Application source code
  - `routes/` - SvelteKit routes (pages and API endpoints)
  - `lib/` - Shared components and utilities
    - `components/` - Reusable Svelte components
    - `server/` - Server-only utilities and database interfaces
    - `utils/` - Shared utility functions
  - `hooks.server.js` - Server-side hooks for authentication and security

## Data Persistence

The current version uses in-memory storage for demonstration purposes. In a production environment, you should:

1. Replace the in-memory data stores in `src/lib/server/db.js` with a proper database solution
2. Update the authentication mechanisms for production security

## Authentication

Authentication currently uses simple session-based cookies:

- For local development, any credentials will work
- In production, implement proper password hashing and user management

## PDF Generation

The app uses jsPDF to generate reflection diary PDFs:

- Each PDF includes daily reflection questions
- Customize the questions in `src/routes/api/generate-pdf/+server.js`

## License

[MIT](LICENSE)