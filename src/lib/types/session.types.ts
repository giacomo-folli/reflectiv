import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { sessions } from '../../lib/server/schema';

export type Session = InferSelectModel<typeof sessions>;
export type InsertSession = InferInsertModel<typeof sessions>;
