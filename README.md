# Reflectiv - Monorepo

This project has been refactored into a monorepo structure with separate frontend and backend applications.

## Project Structure

```
reflectiv/
├── frontend/          # SvelteKit frontend application
├── backend/           # AdonisJS backend API
├── package.json       # Root monorepo configuration
└── README.md
```

## Frontend (SvelteKit)

The frontend is a SvelteKit application that provides the user interface.

### Features
- User authentication (login/register)
- Dashboard for managing reflection diaries
- Link management for ChatGPT conversations
- PDF generation for diaries
- Multi-language support (English/Italian)

### Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

## Backend (AdonisJS)

The backend is an AdonisJS API that handles all server-side logic.

### Features
- User authentication and session management
- Database operations (SQLite with Drizzle ORM)
- AI service integration (OpenAI, Gemini, Claude, Local LLM)
- PDF generation
- ChatGPT conversation extraction

### Setup
```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:3333` by default.

## Environment Variables

### Backend (.env)
```env
# AdonisJS
HOST=0.0.0.0
PORT=3333
APP_KEY=your-app-key
APP_NAME=Reflectiv
NODE_ENV=development

# Database
DATA_DIR=./data

# AI Services
AI_SERVICE_PROVIDER=openai
OPENAI_API_KEY=your-openai-key
OPENAI_BASE_URI=https://api.openai.com/v1
GEMINI_API_KEY=your-gemini-key
GEMINI_BASE_URI=https://generativelanguage.googleapis.com/v1beta/
CLAUDE_API_KEY=your-claude-key
CLAUDE_BASE_URI=https://api.anthropic.com/v1
LOCAL_LLM_BASE_URI=http://localhost:11434
LOCAL_LLM_MODEL=llama2
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3333
```

## Development

### Running Both Applications
From the root directory:
```bash
npm install
npm run dev
```

This will start both the frontend and backend concurrently.

### Database Migrations
```bash
cd backend
npm run db:generate  # Generate new migrations
npm run db:migrate   # Run migrations
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### API
- `POST /api/diary-content` - Generate diary content from ChatGPT links
- `GET /api/links` - Get user's links
- `POST /api/links` - Create new link
- `POST /api/generate-pdf` - Generate PDF diary

### Health
- `GET /health` - Health check endpoint

## Architecture

### Frontend-Backend Communication
- The frontend communicates with the backend via HTTP API calls
- Authentication is handled via HTTP-only cookies
- CORS is configured for local development
- All API calls include credentials for session management

### Database
- SQLite database with Drizzle ORM
- Migrations are automatically run on startup
- Database file is stored in `backend/data/`

### AI Services
- Configurable AI provider (OpenAI, Gemini, Claude, Local LLM)
- Extracts content from ChatGPT conversation links
- Generates personalized reflection questions and themes

## Deployment

### Frontend
The frontend can be built and deployed as a static site:
```bash
cd frontend
npm run build
```

### Backend
The backend can be deployed as a Node.js application:
```bash
cd backend
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License

This project is licensed under the MIT License.

<p align="center">
   <img alt="Logo" width="150px" src="https://raw.githubusercontent.com/giacomo-folli/reflectiv/refs/heads/main/static/generated-icon.png" />
</p>

<h1 align="center">reflectiv</h1>

<p align="center">
<a href="https://github.com/giacomo-folli/reflectiv/actions/workflows/build-and-push.yml">
  <img src="https://github.com/giacomo-folli/reflectiv/actions/workflows/build-and-push.yml/badge.svg" alt="CI">
</a>
<a href="https://raw.githubusercontent.com/giacomo-folli/reflectiv/refs/heads/master/LICENSE"><img src="https://img.shields.io/github/license/giacomo-folli/reflectiv?color=428f7e&logo=open%20source%20initiative&logoColor=white" alt="License"></a>
<a href="https://hub.docker.com/r/giacomofolli/reflectiv"><img src="https://img.shields.io/docker/image-size/giacomofolli/reflectiv" alt="Docker Image Size"></a>
<a href="https://hub.docker.com/r/giacomofolli/reflectiv"><img src="https://img.shields.io/docker/pulls/giacomofolli/reflectiv" alt="Docker pulls"></a>
<a href="https://hub.docker.com/r/giacomofolli/reflectiv"><img src="https://img.shields.io/docker/v/giacomofolli/reflectiv?sort=semver" alt="Docker version"></a>
</p>

---

<h4 align="center">reflectiv is an open source app to help you generate monthly PDF reflection diaries with AI from chatGPT chats.</h4>

<p align="center">
  <a href="#%EF%B8%8F-disclaimer">Disclaimer</a> •
  <a href="#-wiki">Wiki</a> •
  <!-- <a href="#-prerequisites">Prerequisites</a> • -->
  <a href="#%EF%B8%8F-installation">Installation</a> •
  <a href="#%EF%B8%8F-sponsors">Sponsors</a>
</p>

<!-- <p align="center">
  <a href="https://www.buymeacoffee.com/ingelbrecht" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;" ></a>
</p> -->

### Key Features

- AI-Powered journaling prompts generation
- Support for both cloud-based APIs and local LLMs via Ollama
- Self-Hosted by design
- Simple PDF export

## ⚠️ Disclaimer

This project is a personal reflection tool, **not a substitute for professional help**. If you're struggling, please consider reaching out to a counselor, therapist, or a trusted friend. You're not alone.

## 📚 Wiki

Read [the wiki](https://github.com/giacomo-folli/reflectiv/wiki) before opening new issues. The question you have might be answered over there.

<!-- ## 🪄 Prerequisites

You'll need a `Strava client ID` and `Strava client Secret`

- Navigate to your [Strava API settings page](https://www.strava.com/settings/api).
- Copy the `client ID` and `client secret`, you'll need these during the [installation](#%EF%B8%8F-installation)
- Make sure the `Authorization App Domain` is set to the url you will host your app on. By default this should be `http://localhost:8080` -->

## 🛠️ Installation

> [!NOTE]
> To run this application, you'll need [Docker](https://docs.docker.com/engine/install/) with [docker-compose](https://docs.docker.com/compose/install/).

Start off by showing some ❤️ and give this repo a star. Then from your command line:

```bash
# Create a new directory
> mkdir reflectiv
> cd reflectiv

# Create docker-compose.yml and copy the example contents into it
> touch docker-compose.yml
> nano docker-compose.yml

# Create .env and copy the example contents into it. Configure as you see fit
> touch .env
> nano .env
```

### docker-compose.yml

```yml
services:
  app:
    image: ghcr.io/giacomo-folli/reflectiv:latest
    container_name: reflectiv
    ports:
      - "3000:3000"
    env_file:
      - .env
    environment:
      - NODE_ENV=production
      - DATA_DIR=/home/node/app/data
    volumes:
      - reflectiv_data:/home/node/app/data
    restart: unless-stopped

volumes:
  reflectiv_data:
```

### .env

> [!IMPORTANT]
> Every time you change the .env file, you need to restart your container for the changes to take effect.

```bash
> curl -o .env https://raw.githubusercontent.com/giacomo-folli/reflectiv/main/.env.example
> nano .env
```

### Running the Application

To run the application run the following command:

```bash
> docker compose up -d
```

The docker container is now running; navigate to `http://localhost:3000/` to access the app.

## 🗺️ Locales and translations

Currently, the app is translated to:

- 🇬🇧 English
- 🇮🇹 Italian

If you want to see a new locale added, please open an issue

<!-- [open a new issue](https://github.com/robiningelbrecht/statistics-for-strava/issues/new?template=translations-and-localisation.md).  -->

Only do this if you are willing to help on the actual translation 🙃.

## 💡 Feature request?

For any feedback, help or feature requests, please [open a new issue](https://github.com/giacomo-folli/reflectiv/issues/new/).
<!-- Before you do, please read [the wiki](https://github.com/robiningelbrecht/statistics-for-strava/wiki). The question you have might be answered over there. -->

## 🛠️ Local setup

Run the following commands to setup the project on your local machine

```bash
> git clone git@github.com:your-name/your-fork.git
> npm i
> npm run dev
```

<!-- ## ❤️ Sponsors -->
