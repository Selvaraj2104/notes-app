import React from 'react';
import '../css/notecard.css';

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <p className="note-date">{note.date}</p>
      <button className="edit-btn" onClick={onEdit}>Edit</button>
      <button className="delete-btn" onClick={onDelete}>Delete</button>
    </div>
  );
}

export default NoteCard;
