import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { users } from '../../lib/server/schema';

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;
