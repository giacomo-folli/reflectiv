# Monthly Reflection Diary

A SvelteKit application that allows users to store ChatGPT conversation links and generate personalized monthly reflection diaries in PDF format.

## Features

- User authentication (register, login, logout)
- Store and manage ChatGPT conversation links
- Generate personalized monthly reflection diaries as PDFs
- Responsive design for all devices

## Running the Application

You can run the application either with Node.js directly or using Docker.

## Method 1: Using Node.js Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later recommended)
- npm (comes with Node.js)

### Setup Steps

#### Clone the repository

```bash
git clone <repository-url>
cd monthly-reflection-diary
```

#### Install dependencies

```bash
npm install
```

#### Environment Configuration

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Update the `.env` file with your specific configuration:
   - Set a strong `SESSION_SECRET` for production
   - Add your `OPENAI_API_KEY` if you're using OpenAI API features
   - Modify other settings as needed

#### Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

#### Build for production

```bash
npm run build
```

#### Run the production build locally

```bash
npm run preview
```

## Method 2: Using Docker

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop)

### Run with Docker Compose (Recommended)

1. Clone the repository:

```bash
git clone <repository-url>
cd monthly-reflection-diary
```

2. Create a `.env` file for environment variables:

```bash
cp .env.example .env
```

3. Edit the `.env` file and set at minimum:
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

The application will be available at `http://localhost:5000`.

### Run with Docker directly

```bash
# Build the optimized multi-stage Docker image
docker build -t reflection-diary .

# Run the container with appropriate environment variables
docker run -p 5000:5000 \
  -e NODE_ENV=production \
  -e SESSION_SECRET=your_secret_here \
  -e PUBLIC_BASE_URL=http://localhost:5000 \
  -v reflection_diary_data:/app/data \
  -d reflection-diary
```

### Docker Data Persistence

The application stores data in a Docker volume:

- Data is stored in the named volume `reflection_diary_data`
- The volume persists across container restarts and rebuilds
- Backup the volume for production deployments:

```bash
# Backup the database volume
docker run --rm -v reflection_diary_data:/data -v $(pwd):/backup alpine \
  tar czf /backup/reflection_diary_backup.tar.gz /data

# Restore from a backup
docker run --rm -v reflection_diary_data:/data -v $(pwd):/backup alpine \
  sh -c "rm -rf /data/* && tar xzf /backup/reflection_diary_backup.tar.gz -C /"
```

### Health Checks & Monitoring

The Docker setup includes:

- Automatic health checks at `/health` endpoint
- Container restart policy for fault tolerance
- Resource limits to prevent resource exhaustion
- Log rotation to manage disk space

## Test Credentials

For local development and testing, you can use these credentials:

- Email: `test@example.com`
- Password: `password123`

## Project Structure

- `src/` - Application source code
  - `routes/` - SvelteKit routes (pages and API endpoints)
  - `lib/` - Shared components and utilities
    - `components/` - Reusable Svelte components
    - `server/` - Server-only utilities and database interfaces
    - `utils/` - Shared utility functions
  - `hooks.server.js` - Server-side hooks for authentication and security

## Data Persistence

The application uses SQLite for data persistence:

1. User data, sessions, and links are stored in a SQLite database
2. The database file is located in the `./data` directory by default
3. The location can be configured with the `DATA_DIR` environment variable
4. When using Docker, the database is persisted using a named Docker volume

### Database Management

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

1. Consider upgrading to a more robust database solution like PostgreSQL
2. Implement database migrations for schema changes
3. Enhance the authentication mechanisms with additional security features

## Authentication

Authentication currently uses simple session-based cookies:

- For local development, the test credentials above will work
- In production, implement proper password hashing and user management

## PDF Generation

The app uses jsPDF to generate reflection diary PDFs:

- Each PDF includes daily reflection questions
- Customize the questions in `src/routes/api/generate-pdf/+server.js`

## License

[MIT](LICENSE)