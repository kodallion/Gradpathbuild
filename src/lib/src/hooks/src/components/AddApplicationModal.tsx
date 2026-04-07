import { useState } from 'react';
import { useApplications } from '../hooks/useApplications';

export function AddApplicationModal({ isOpen, onClose }) {
  const { addApplication } = useApplications();
  const [form, setForm] = useState({ school_name:'', program:'', country:'', deadline:'' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addApplication(form);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input name="school_name" placeholder="School Name" onChange={handleChange} required/>
        <input name="program" placeholder="Program" onChange={handleChange} required/>
        <input name="country" placeholder="Country" onChange={handleChange} required/>
        <input name="deadline" type="date" onChange={handleChange} required/>
        <button type="submit">Add Application</button>
      </form>
    </div>
  );
}
