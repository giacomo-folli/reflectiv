<span style="display:block;text-align:center">

![image logo](https://raw.githubusercontent.com/giacomo-folli/reflectiv/refs/heads/main/static/generated-icon.png){: width=150 height=150} 

</span>

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

### Data Persistence

The application uses SQLite for data persistence:

1. User data, sessions, and links are stored in a SQLite database.
2. The database file is located in the `./data` directory by default.
3. The location can be configured with the `DATA_DIR` environment variable.
4. When using Docker, the database is persisted using a named Docker volume (see Docker Specifics section).

### PDF Generation

The app uses jsPDF to generate reflection diary PDFs:

- Each PDF includes daily reflection questions.
- Customize the questions in `src/routes/api/generate-pdf/+server.js`.

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