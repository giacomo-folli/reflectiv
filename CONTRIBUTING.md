# Contributing to Monthly Reflection Diary

Thanks for your interest in contributing! Whether you're fixing a bug, improving documentation, or suggesting a new feature, your help is deeply appreciated.

This guide will help you get the project up and running locally.

---

## 🧱 Project Overview

- Fullstack app (Node.js + SQLite)
- Uses Docker for containerized deployment
- Supports PDF generation and user authentication

---

## ⚙️ Getting Started

You can develop using **Docker (recommended)** or **Node.js locally**.

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/monthly-reflection-diary.git
cd monthly-reflection-diary
```

### 2. Set up environment variables

Copy the example file:

```bash
cp .env.example .env
```

Then customize `.env`. At a minimum, set:

* `PUBLIC_BASE_URL`: `http://localhost:3000` for local dev
* `OPENAI_API_KEY`: Optional, for AI-powered features

---

## 🚀 Running the App

### Option A: With Docker (Recommended)

```bash
docker-compose up --build -d
```

To follow logs:

```bash
docker-compose logs -f
```

### Option B: Node.js Locally

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 🧪 Test Credentials

To simplify testing during development:

* **Email:** `test@example.com`
* **Password:** `password123`

---

## 🗃️ Data Persistence

* Data is stored in a SQLite database in the `./data` folder.
* You can change the location with the `DATA_DIR` env variable.
* When using Docker, data is persisted with a named volume.

---

## 📄 PDF Generation

* The app uses `jsPDF` to generate monthly reflection PDFs.
* To customize questions or structure, edit:

  ```bash
  src/routes/api/generate-pdf/+server.js
  ```

---

## 🔍 Health Checks & Monitoring (Docker)

* Health check endpoint: `http://localhost:3000/health`
* Automatic container restart policy
* Resource limits and log rotation are configured

---

## 🧼 Before You Submit

* Ensure your code follows project structure and style.
* Test your changes locally.
* Open a Pull Request with a clear description of the change.
* If you're suggesting a big change, please open an issue first to discuss it.

---

Thank you again for your interest in contributing! 🙏