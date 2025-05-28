import Database from "better-sqlite3";
import { dev } from "$app/environment";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Link } from "$lib/types/link.types";
import type { Session } from "$lib/types/session.types";
import type { User } from "$lib/types/user.types";

// Get the current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define data directory
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "../../../data");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Database path
const DB_PATH = path.join(DATA_DIR, "reflection-diary.sqlite");

// Create/connect to SQLite database
const db = new Database(DB_PATH);

// Enable foreign keys
db.pragma("foreign_keys = ON");

// Set up tables if they don't exist
const initDb = () => {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      passwordHash TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);

  // Sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      expiresAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Links table
  db.exec(`
    CREATE TABLE IF NOT EXISTS links (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      title TEXT,
      url TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Add a test user if in development mode and no users exist
  if (dev) {
    const userCount = db
      .prepare("SELECT COUNT(*) as count FROM users")
      .get() as any;

    if (userCount.count === 0) {
      db.prepare(
        `
        INSERT INTO users (id, email, name, passwordHash, createdAt) 
        VALUES (?, ?, ?, ?, ?)
      `
      ).run(
        "1",
        "test@example.com",
        "Test User",
        "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3", // 'password123' with SHA-256
        new Date("2025-05-01").toISOString()
      );

      // Add a sample link for the test user
      db.prepare(
        `
        INSERT INTO links (id, userId, title, url, createdAt)
        VALUES (?, ?, ?, ?, ?)
      `
      ).run(
        "1",
        "1",
        "Sample ChatGPT Conversation",
        "https://chat.openai.com/share/abc123",
        new Date("2025-05-10").toISOString()
      );
    }
  }
};

// Run database initialization
initDb();

// User repository
export const userDb = {
  findByEmail(email: string): User | null {
    return db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email) as User | null;
  },

  findById(id: string | number): User | null {
    return db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(id) as User | null;
  },

  createUser(userData: any): User | null {
    const { id, email, passwordHash, name, createdAt } = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...userData,
    };

    db.prepare(
      `
      INSERT INTO users (id, email, name, passwordHash, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `
    ).run(id, email, name, passwordHash, createdAt);

    return this.findById(id);
  },

  updateUser(id: string | number, userData: any): User | null {
    const user = this.findById(id);
    if (!user) return null;

    const updates = [];
    const values = [];

    for (const [key, value] of Object.entries(userData)) {
      if (key !== "id" && key !== "createdAt") {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (updates.length === 0) return user;

    values.push(id); // for the WHERE clause

    db.prepare(
      `
      UPDATE users 
      SET ${updates.join(", ")}
      WHERE id = ?
    `
    ).run(...values);

    return this.findById(id);
  },

  deleteUser(id: string | number) {
    const result = db.prepare("DELETE FROM users WHERE id = ?").run(id);
    return result.changes > 0;
  },

  debug() {
    if (dev) {
      return db.prepare("SELECT * FROM users").all();
    }
    return null;
  },
};

// Session repository
export const sessionDb = {
  createSession(userId: string | number): Session | null {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString(); // 7 days

    db.prepare(
      `
      INSERT INTO sessions (id, userId, createdAt, expiresAt)
      VALUES (?, ?, ?, ?)
    `
    ).run(id, userId, createdAt, expiresAt);

    return this.findById(id);
  },

  findById(sessionId: string | number) {
    return db
      .prepare("SELECT * FROM sessions WHERE id = ?")
      .get(sessionId) as Session | null;
  },

  deleteSession(sessionId: string | number) {
    const result = db
      .prepare("DELETE FROM sessions WHERE id = ?")
      .run(sessionId);
    return result.changes > 0;
  },

  deleteAllUserSessions(userId: string | number) {
    const result = db
      .prepare("DELETE FROM sessions WHERE userId = ?")
      .run(userId);
    return result.changes > 0;
  },

  debug() {
    if (dev) {
      return db.prepare("SELECT * FROM sessions").all();
    }
    return null;
  },
};

// Link repository
export const linkDb = {
  createLink(linkData: any): Link | null {
    const { id, userId, title, url, createdAt } = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...linkData,
    };

    db.prepare(
      `
      INSERT INTO links (id, userId, title, url, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `
    ).run(id, userId, title || "", url, createdAt);

    return this.findById(id);
  },

  findByUserId(userId: string | number) {
    return db
      .prepare("SELECT * FROM links WHERE userId = ? ORDER BY createdAt DESC")
      .all(userId) as Link[] | null;
  },

  findById(id: string | number) {
    return db
      .prepare("SELECT * FROM links WHERE id = ?")
      .get(id) as Link | null;
  },

  updateLink(id: string | number, linkData: any): Link | null {
    const link = this.findById(id);
    if (!link) return null;

    const updates = [];
    const values = [];

    // Build dynamic update query
    for (const [key, value] of Object.entries(linkData)) {
      if (key !== "id" && key !== "userId" && key !== "createdAt") {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (updates.length === 0) return link;

    values.push(id); // for the WHERE clause

    db.prepare(
      `
      UPDATE links
      SET ${updates.join(", ")}
      WHERE id = ?
    `
    ).run(...values);

    return this.findById(id);
  },

  deleteLink(id: string | number) {
    const result = db.prepare("DELETE FROM links WHERE id = ?").run(id);
    return result.changes > 0;
  },

  // For debugging in development mode only
  debug() {
    if (dev) {
      return db.prepare("SELECT * FROM links").all();
    }
    return null;
  },
};
