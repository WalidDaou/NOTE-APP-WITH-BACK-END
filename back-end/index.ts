// backend/index.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Prisma Client
const prisma = new PrismaClient();



// Get all notes
app.get('/notes', async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

// Add a new note
app.post('/notes', async (req, res) => {
  const { text, priority, category } = req.body;
  const newNote = await prisma.note.create({
    data: {
      text,
      priority,
      category,
    },
  });
  res.json(newNote);
});

// Update a note by ID
app.put('/notes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { text, priority, category } = req.body;
  const updatedNote = await prisma.note.update({
    where: { id },
    data: { text, priority, category },
  });
  res.json(updatedNote);
});

// Delete a note by ID
app.delete('/notes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.note.delete({
    where: { id },
  });
  res.json({ message: 'Note deleted successfully' });
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}.`);

  try {
    await prisma.$connect();
    console.log('Prisma Client connected to the database.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
