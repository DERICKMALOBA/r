const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await db.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a task
app.post('/api/tasks', async (req, res) => {
  try {
    const task = await db.addTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await db.deleteTask(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Edit a task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await db.editTask(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
