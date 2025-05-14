// See https://kit.svelte.dev/docs/types#app
import type { User } from "$lib/types";
import { SupabaseClient, Session } from "@supabase/supabase-js";

declare global {
  namespace App {
    interface Locals {
      user?: User | null;
      sessionId?: string;
    }
    interface PageData {
      session: Session | null;
    }
    interface Platform {
      env?: {
        DATABASE_URL: string;
        JWT_SECRET: string;
      };
    }
    // interface PrivateEnv {}
    // interface PublicEnv {}
  }
}

export {};
