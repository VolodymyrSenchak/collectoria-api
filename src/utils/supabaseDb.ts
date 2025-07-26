import {createClient} from "@supabase/supabase-js";

export function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase URL or Service role is not defined in environment variables.");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
}