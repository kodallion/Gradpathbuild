import { useState } from 'react';
import { AddApplicationModal } from '../../components/AddApplicationModal';
import { useApplications } from '../../hooks/useApplications';

export default function ApplicationsPage() {
  const { applications, loading } = useApplications();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Add Application</button>
      <AddApplicationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {loading ? <p>Loading...</p> : (
        <ul>
          {applications.map(a => (
            <li key={a.id}>{a.school_name} - {a.program}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
