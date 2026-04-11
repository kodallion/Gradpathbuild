import { useState, useEffect, useCallback } from "react";
import { supabase, type Application, type NewApplication } from "@/lib/supabase";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from("applications").select("*").order("created_at", { ascending: false });
    if (err) { console.error("[fetch error]", err); setError(err.message); }
    else { console.log("[fetch success] rows:", data?.length); setApplications(data ?? []); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const addApplication = useCallback(async (formData: NewApplication) => {
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    console.log("[insert] user:", user?.id);
    if (authErr || !user) return { error: "Not signed in." };
    const { error: insertErr } = await supabase
      .from("applications").insert([{ ...formData, user_id: user.id }]);
    console.log("[insert] error:", insertErr);
    if (insertErr) return { error: insertErr.message };
    await fetchApplications();
    return { error: null };
  }, [fetchApplications]);

  return { applications, loading, error, addApplication, refresh: fetchApplications };
}
