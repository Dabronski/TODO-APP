// app.js
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/tasks/create', (req, res) => {
  const newTask = {
    task: req.body.task,
    priority: req.body.priority,
    dueDate: req.body.dueDate
  };
  tasks.push(newTask);
  res.redirect('/');
});

app.post('/tasks/:id/update', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = {
    task: req.body.task,
    priority: req.body.priority,
    dueDate: req.body.dueDate
  };
  tasks[taskId] = updatedTask;
  res.redirect('/');
});

app.post('/tasks/:id/complete', (req, res) => {
  const taskId = req.params.id;
  tasks.splice(taskId, 1);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

