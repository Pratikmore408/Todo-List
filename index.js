

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// define array for tasks

let todos = [];

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.get('/initialTodos', (req, res) => {
  res.json(todos);
});

app.post('/add', (req, res) => {
  const newTodo = {
    text: req.body.newTodo,
    dueDate: req.body.dueDate,
  };

  todos.push(newTodo);
  res.redirect('/');
});

// using public as a static file

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
