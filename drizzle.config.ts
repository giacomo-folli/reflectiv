import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables

export default {
  schema: './src/lib/server/schema.ts',
  out: './migrations', // Specify the output directory for migrations
  dialect: 'sqlite', // Specify the dialect
  dbCredentials: {
    url: process.env.DATABASE_URL || './data/reflective-db.sqlite', // Use environment variable or default path
  },
  verbose: true, // Enable verbose logging
  strict: true, // Enable strict mode
} satisfies Config;
