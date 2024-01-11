// src/App.tsx
import React, { useState, useEffect } from 'react';
import AddNoteForm from './component/AddNoteForm';
import NotesList from './component/NotesList';
import './main.css';

type Note = {
  id: number;
  text: string;
  priority: number;
  category: string;
};

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const handleDelete = async (id: number) => {
    // Make a DELETE request to the backend to delete the note
    await fetch(`http://localhost:4000/notes/${id}`, {
      method: 'DELETE',
    });

    // Update the state with the remaining notes
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleEdit = async (id: number, newText: string) => {
    // Make a PUT request to the backend to update the note
    await fetch(`http://localhost:4000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newText }),
    });

    // Update the state with the edited note
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  const handleAdd = async (text: string, priority: number, category: string) => {
    // Make a POST request to the backend to add a new note
    const response = await fetch('http://localhost:4000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, priority, category }),
    });

    const newNote = await response.json();

    // Update the state with the new note
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleEditCategoryPriority = async (id: number, newCategory: string, newPriority: number) => {
    // Make a PUT request to the backend to update the category and priority of the note
    await fetch(`http://localhost:4000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category: newCategory, priority: newPriority }),
    });

    // Update the state with the edited category and priority
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, category: newCategory, priority: newPriority } : note
      )
    );
  };

  useEffect(() => {
    // Load notes from the backend on component mount
    const fetchNotes = async () => {
      const response = await fetch('http://localhost:4000/notes');
      const data = await response.json();
      setNotes(data);
    };

    fetchNotes();
  }, []); // Run only on mount

  return (
    <div>
      <div className='main'>
        <NotesList
          notes={notes}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onEditCategoryPriority={handleEditCategoryPriority}
        />
        <AddNoteForm onAdd={handleAdd} />
      </div>
    </div>
  );
};

export default App;
