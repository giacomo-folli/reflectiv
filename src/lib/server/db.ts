import Database from "better-sqlite3";
import { dev } from "$app/environment";
import path from "path";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq, desc } from "drizzle-orm";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";
import type { Link, Session, User } from "./schema";

// Define data directory
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");

// Database path
const DB_PATH = path.join(DATA_DIR, "reflective-db.sqlite");

// Create/connect to SQLite database
const sqlite = new Database(DB_PATH);

// Enable foreign keys
sqlite.pragma("foreign_keys = ON");

export const drizzleDb = drizzle({ client: sqlite, schema });

// Run migrations
try {
  console.log("Running database migrations...");
  migrate(drizzleDb, { migrationsFolder: "./migrations" });
  console.log("Database migrations completed successfully.");
} catch (error) {
  console.error("Failed to run database migrations:", error);
  throw error;
}

// User repository
export const userDb = {
  findByEmail(email: string): User | undefined {
    return drizzleDb
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .get();
  },

  findById(id: string): User | undefined {
    return drizzleDb
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .get();
  },

  createUser(userData: Partial<User>): User | undefined {
    const id = userData.id || crypto.randomUUID();
    const createdAt = userData.createdAt || new Date().toISOString();

    const newUser: typeof schema.users.$inferInsert = {
      id,
      email: userData.email!,
      name: userData.name!,
      passwordHash: userData.passwordHash!,
      createdAt,
    };

    drizzleDb.insert(schema.users).values(newUser).run();
    return this.findById(id);
  },

  updateUser(
    id: string,
    userData: Partial<Omit<User, "id" | "createdAt">>
  ): User | undefined {
    const user = this.findById(id);
    if (!user) return undefined;

    // Ensure only valid fields are passed to set
    const { email, name, passwordHash } = userData;
    const updateData: Record<string, any> = {};
    if (email !== undefined) updateData.email = email;
    if (name !== undefined) updateData.name = name;
    if (passwordHash !== undefined) updateData.passwordHash = passwordHash;

    if (Object.keys(updateData).length === 0) return user;

    drizzleDb
      .update(schema.users)
      .set(updateData)
      .where(eq(schema.users.id, id))
      .run();
    return this.findById(id);
  },

  deleteUser(id: string) {
    const result = drizzleDb
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .run();
    return result.changes > 0;
  },

  debug() {
    if (dev) {
      return drizzleDb.select().from(schema.users).all();
    }
    return [];
  },
};

// Session repository
export const sessionDb = {
  createSession(userId: string): Session | undefined {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    ).toISOString();

    const newSession: typeof schema.sessions.$inferInsert = {
      id,
      userId,
      createdAt,
      expiresAt,
    };

    drizzleDb.insert(schema.sessions).values(newSession).run();
    return this.findById(id);
  },

  findById(sessionId: string): Session | undefined {
    return drizzleDb
      .select()
      .from(schema.sessions)
      .where(eq(schema.sessions.id, sessionId))
      .get();
  },

  deleteSession(sessionId: string) {
    const result = drizzleDb
      .delete(schema.sessions)
      .where(eq(schema.sessions.id, sessionId))
      .run();
    return result.changes > 0;
  },

  deleteAllUserSessions(userId: string) {
    const result = drizzleDb
      .delete(schema.sessions)
      .where(eq(schema.sessions.userId, userId))
      .run();
    return result.changes > 0;
  },

  debug() {
    if (dev) {
      return drizzleDb.select().from(schema.sessions).all();
    }
    return [];
  },
};

// Link repository
export const linkDb = {
  createLink(linkData: Partial<Link>): Link | undefined {
    const id = linkData.id || crypto.randomUUID();
    const createdAt = linkData.createdAt || new Date().toISOString();
    const title = linkData.title || "";

    const newLink: typeof schema.links.$inferInsert = {
      id,
      userId: linkData.userId!,
      title,
      url: linkData.url!,
      createdAt,
    };
    drizzleDb.insert(schema.links).values(newLink).run();
    return this.findById(id);
  },

  findByUserId(userId: string): Link[] {
    return drizzleDb
      .select()
      .from(schema.links)
      .where(eq(schema.links.userId, userId))
      .orderBy(desc(schema.links.createdAt))
      .all();
  },

  findById(id: string): Link | undefined {
    return drizzleDb
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, id))
      .get();
  },

  updateLink(
    id: string,
    linkData: Partial<Omit<Link, "id" | "userId" | "createdAt">>
  ): Link | undefined {
    const link = this.findById(id);
    if (!link) return undefined;

    const { title, url } = linkData;
    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (url !== undefined) updateData.url = url;

    if (Object.keys(updateData).length === 0) return link;

    drizzleDb
      .update(schema.links)
      .set(updateData)
      .where(eq(schema.links.id, id))
      .run();
    return this.findById(id);
  },

  deleteLink(id: string) {
    const result = drizzleDb
      .delete(schema.links)
      .where(eq(schema.links.id, id))
      .run();
    return result.changes > 0;
  },

  // For debugging in development mode only
  debug() {
    if (dev) {
      return drizzleDb.select().from(schema.links).all();
    }
    return [];
  },
};
