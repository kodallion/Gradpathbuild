import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchApplications() {
    setLoading(true);
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setApplications(data);
    setLoading(false);
  }

  async function addApplication(app) {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) return console.error(userError);
    
    const { error } = await supabase.from('applications').insert([{
      ...app,
      user_id: user.user.id
    }]);
    if (!error) fetchApplications();
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  return { applications, loading, addApplication };
}
