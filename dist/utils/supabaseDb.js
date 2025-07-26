"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabaseClient = getSupabaseClient;
const supabase_js_1 = require("@supabase/supabase-js");
function getSupabaseClient() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error("Supabase URL or Service role is not defined in environment variables.");
    }
    return (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceRoleKey);
}
//# sourceMappingURL=supabaseDb.js.map