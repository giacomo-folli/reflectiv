<p align="center">
   <img width="150px" src="https://raw.githubusercontent.com/giacomo-folli/reflectiv/refs/heads/main/static/generated-icon.png" />
</p>

# Monthly Reflection Diary

<p align="center">
  <img src="https://img.shields.io/badge/docker-ready-blue?logo=docker" alt="Docker" />
  <img src="https://img.shields.io/badge/node.js-18.x-brightgreen?logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="License: MIT" />
  <img src="https://img.shields.io/badge/platform-docker%20%7C%20node.js-lightgrey" alt="Platform" />
  <img src="https://img.shields.io/badge/status-beta-orange" alt="Status" />
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen" alt="Contributions Welcome" />
</p>

**Monthly Reflection Diary** is an open source app to help you collect and organize meaningful conversations and links—like your chats with ChatGPT—and generate monthly PDF reflection diaries with AI.

## ⚠️ Disclaimer

This project is a personal reflection tool, **not a substitute for professional help**. If you're struggling, please consider reaching out to a counselor, therapist, or a trusted friend. You're not alone.

## ⚙️ Getting Started

You can run the app either with **Docker** (recommended) or using **Node.js locally**.

### 1. Clone the repository

```bash
git clone https://github.com/giacomo-folli/reflectiv.git
cd reflectiv
```

### 2. Set up environment variables

Copy the example environment file and customize it:

```bash
cp .env.example .env
```

**Required:**

- `PUBLIC_BASE_URL`: The base URL where your application is accessible. For local use, set this to `http://localhost:3000`.

**AI Features:**

The application can leverage AI services for enhanced functionality. If you wish to use these features, you'll need to configure the following:

- `AI_SERVICE_PROVIDER`: Specify the AI service you want to use. Options are:
    - `"gemini"` *(RECOMMENDED)*
    - `"openai"` *(in testing)*
    - `"local"` *(in testing)*
    <!-- - `"claude"` -->

- If `AI_SERVICE_PROVIDER="local"`, set:
    - **`LOCAL_LLM_BASE_URI`**: The HTTP endpoint of your locally running llm.
    - **`LOCAL_LLM_MODEL`**: The local model to use.

**Expected API Behavior for Local LLM:**
- The endpoint specified by `LOCAL_LLM_BASE_URI` should be a POST endpoint.
- It must accept a JSON request body with the following structure: `{"prompt": "your prompt here", "stream": false}`.
- It should return a JSON response. The service supports two common formats:
    1.  Standard format: `{"response": "The LLM's answer"}`
    2.  OpenAI-compatible format: `{"choices": [{"message": {"content": "The LLM's answer"}}]}`

### 3. Start the app

#### Option A: With Docker (Recommended)

```bash
docker compose up -d
```

#### Option B: Locally with Node.js

```bash
npm install
npm run dev
```

The app should now be running at: [http://localhost:3000](http://localhost:3000)

## 🙏 How You Can Help

We're excited to have you involved! Your support and contributions are invaluable to us. For detailed information on how to contribute, including setting up your development environment and understanding the project structure, please check out our [CONTRIBUTING.md](CONTRIBUTING.md) file.

Here are some ways you can help:
- 🐛 **Found a bug?** Please open an issue!
- 📚 **Documentation unclear?** We appreciate suggestions for edits!
- 💡 **Have an idea for a feature?** Reach out or create a feature request!
- ❤️ **Just want to say hi or give feedback?** We’d love to hear from you!
- 🗣️ **Share the project:** Know someone who might find this reflection diary useful? Please spread the word!

Whether you’re a developer, a designer, or simply someone curious about the project, your feedback and contributions mean a lot. Every little bit helps, and we’re grateful for your involvement!

## 🚀 Next Steps & Future Plans

This project is continuously evolving, and we're excited about the future! We are actively working on expanding its capabilities and making it even more versatile for our users. Check out the full roadmap at [openchangelog.com](https://reflectiv.openchangelog.com)

Some major next steps are:

-   **Broader LLM Support:** support wider range of LLMs to give you more choices. This includes upcoming support for:
    -   Integration with more models from OpenAI and Anthropic.
    -   more flexible configuration options for different models and providers.
-   **Self-Hosted LLMs:** Basic support for self-hosted LLMs via a generic API endpoint.

We believe in community-driven development. If you're interested in contributing to these features, or if you have other ideas and suggestions, please don't hesitate to reach out or open an issue. Your input is highly valued!
