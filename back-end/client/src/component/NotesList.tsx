import React from 'react';
import Note from './Note';
import './NotesList.css';

interface NoteItem {
  id: number;
  text: string;
  priority: number;
  category: string;
}

interface NotesListProps {
  notes: NoteItem[];
  onEdit: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
  onEditCategoryPriority: (id: number, newCategory: string, newPriority: number) => void;
}

function NotesList({ notes, onEdit, onDelete, onEditCategoryPriority }: NotesListProps) {
  const sortedNotes = [...notes].sort((a, b) => a.priority - b.priority);

  return (
    <div className='NOte'>
      {sortedNotes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          priority={note.priority}
          category={note.category}
          onDelete={() => onDelete(note.id)}
          onEdit={(newText: string) => onEdit(note.id, newText)}
          onEditCategoryPriority={(newCategory: string, newPriority: number) =>
            onEditCategoryPriority(note.id, newCategory, newPriority)
          }
        />
      ))}
    </div>
  );
}

export default NotesList;
