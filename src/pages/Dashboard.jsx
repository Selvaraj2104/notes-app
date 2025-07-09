import React, { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import '../css/dashboard.css';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (!isLoggedIn) window.location.href = '/';

    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const saveNotesToStorage = (newNotes) => {
    localStorage.setItem('notes', JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  const handleAddNote = () => {
    setEditNote(null);
    setShowForm(true);
  };

  const handleEditNote = (note) => {
    setEditNote(note);
    setShowForm(true);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotesToStorage(updatedNotes);
  };

  const handleSaveNote = (note) => {
    let updatedNotes;
    if (note.id) {
      updatedNotes = notes.map(n => (n.id === note.id ? note : n));
    } else {
      note.id = Date.now();
      note.date = new Date().toLocaleString();
      updatedNotes = [...notes, note];
    }
    saveNotesToStorage(updatedNotes);
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/';
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h2 className="dashboard-heading">My Notes</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <button onClick={handleAddNote} className="add-note-btn">+ Add Note</button>

      {showForm && (
        <NoteForm note={editNote} onSave={handleSaveNote} onCancel={() => setShowForm(false)}/>
      )}

      <div className="note-grid">
        {notes.map(note => (
          <NoteCard key={note.id} note={note} onEdit={() => handleEditNote(note)} onDelete={() => handleDeleteNote(note.id)}/>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
