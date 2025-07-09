import React, { useState, useEffect } from 'react';
import '../css/noteform.css';

function NoteForm({ note, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNote = { ...note, title, content };
    onSave(updatedNote);
  };

  return (
    <div className="note-form-container">
        <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        required
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="actions">
        <button type="submit" className="save-btn">Save</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
    </div>
    );
}

export default NoteForm;
