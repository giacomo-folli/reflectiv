import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { links } from '../../lib/server/schema';

export type Link = InferSelectModel<typeof links>;
export type InsertLink = InferInsertModel<typeof links>;
