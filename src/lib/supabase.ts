import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);
export type ApplicationStatus = "not_started" | "in_progress" | "submitted" | "accepted" | "rejected" | "waitlisted";
export interface Application {
  id: string; user_id: string; school_name: string;
  program: string; country: string; deadline: string;
  status: ApplicationStatus; created_at: string;
}
export type NewApplication = Omit<Application, "id" | "user_id" | "created_at">;
