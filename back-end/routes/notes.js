// backend/routes/notes.js
const express = require('express');
const router = express.Router();

// Sample data for testing
let notes = [
  {
    id: 1,
    text: 'Sample Note 1',
    priority: 1,
    category: 'home',
  },
  {
    id: 2,
    text: 'Sample Note 2',
    priority: 2,
    category: 'work',
  },
];

// Get all notes
router.get('/', (req, res) => {
  res.json(notes);
});

// Add a new note
router.post('/', (req, res) => {
  const { text, priority, category } = req.body;
  const newNote = {
    id: new Date().getTime(),
    text,
    priority,
    category,
  };
  notes.push(newNote);
  res.json(newNote);
});
  
// Update a note by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, priority, category } = req.body;
  const updatedNote = { id, text, priority, category };
  notes = notes.map((note) => (note.id === id ? updatedNote : note));
  res.json(updatedNote);
});

// Delete a note by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.json({ message: 'Note deleted successfully' });
});

module.exports = router;
