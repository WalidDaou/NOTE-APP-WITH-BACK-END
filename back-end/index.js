const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const notesRouter = require('./routes/notes');

const app = express(); // Initialize app here

app.use(cors());
app.use(bodyParser.json());

// Use the notesRouter for handling /notes routes
app.use('/notes', notesRouter);

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
