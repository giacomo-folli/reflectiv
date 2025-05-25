<div style="width:100%; display:flex; flex-direction:row; justify-items: center;">
   <img width="150px" src="https://raw.githubusercontent.com/giacomo-folli/reflectiv/refs/heads/main/static/generated-icon.png" />
</div>

# Monthly Reflection Diary

**Monthly Reflection Diary** is an open source app to help you collect and organize meaningful conversations and links—like your chats with ChatGPT—and generate monthly PDF reflection diaries from them.

This is my first fullstack project using **Node.js, Docker, and SQLite**, and I'm a **junior developer** learning as I build. It’s a big personal project and I’m excited to share it!

---

## 🙏 How You Can Help

I’d love your support in any of the following ways:

* 🐛 **Found a bug?** Open an issue!
* 📚 **Documentation unclear?** Suggest edits!
* 💡 **Have an idea?** Reach out or create a feature request!
* ❤️ **Just want to say hi or give feedback?** I’d love to hear from you!

Whether you’re a dev, a designer, or just curious, your feedback and contributions mean a lot. Don’t hesitate to get involved—every little bit helps!

---

## ⚙️ Getting Started

You can run the app either with **Docker** (recommended) or using **Node.js locally**.

### 1. Clone the repository

```bash
git clone <repository-url>
cd reflectiv
```

### 2. Set up environment variables

Copy the example environment file and customize it:

```bash
cp .env.example .env
```

At minimum, set:

* `SESSION_SECRET` — a strong secret for securing sessions
* `OPENAI_API_KEY` — optional, if you want AI features
* `PUBLIC_BASE_URL` — for local use, set to `http://localhost:3000`

### 3. Start the app

#### Option A: With Docker (Recommended)

```bash
docker-compose up --build -d
```

#### Option B: Locally with Node.js

```bash
npm install
npm run dev
```

The app should now be running at: [http://localhost:3000](http://localhost:3000)

---

## ⚠️ Disclaimer

This project is a personal reflection tool, **not a substitute for professional help**. If you're struggling, please consider reaching out to a counselor, therapist, or a trusted friend. You're not alone.