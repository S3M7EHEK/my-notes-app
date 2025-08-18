import React, { useState } from 'react';
import '../style.css';

function NotesDashboard() {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem('token');

  const handleCreateNote = async () => {
    const res = await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content: newNote })
    });
    const data = await res.json();
    setNotes([...notes, data]);
    setNewNote('');
  };

  const handleDeleteNote = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setNotes(notes.filter(note => note._id !== id));
  };

  return (
    <div className="container">
      <h2>Your Notes</h2>
      <input
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
        placeholder="New note"
      />
      <button onClick={handleCreateNote}>Add Note</button>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            {note.content}
            <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesDashboard;
