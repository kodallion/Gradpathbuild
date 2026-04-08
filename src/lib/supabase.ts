import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "hlhjfwyzmsefkbaycrhy";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsaGpmd3l6bXNlZmtiYXljcmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNTk5NTgsImV4cCI6MjA4ODgzNTk1OH0.VivZMZp6xTb_PyxDW7EJyvMYiNxKikDqc2726D2PYzI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
