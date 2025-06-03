import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  passwordHash: text('passwordHash').notNull(),
  createdAt: text('createdAt').notNull(),
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: text('createdAt').notNull(),
  expiresAt: text('expiresAt').notNull(),
});

export const links = sqliteTable('links', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title'),
  url: text('url').notNull(),
  createdAt: text('createdAt').notNull(),
});
