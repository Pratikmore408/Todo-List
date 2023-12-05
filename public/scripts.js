
document.addEventListener('DOMContentLoaded', function () {
  const todoList = document.getElementById('todoList');
  let todos = [];

  // toggle the state of a task

  todoList.addEventListener('change', function (event) {
    if (event.target.type === 'checkbox') {
      const listItem = event.target.parentElement;
      listItem.classList.toggle('completed');
    }
  });

  todoList.addEventListener('click', function (event) {
    const removeButton = event.target.closest('.removeButton');
    
    if (removeButton) {
      const index = removeButton.dataset.index;
      removeTodoItem(index);
    }
  });

  // to delete the array element 

  function removeTodoItem(index) {
    todos.splice(index, 1);
    renderTodos();
  }

  // to render the array element 

  function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <input type="checkbox" id="todo${index}" class="checkbox">
        <label for="todo${index}">
          ${todo.text}
          ${todo.dueDate ? `<span class="due-date">(Due: ${todo.dueDate})</span>` : ''}
        </label>
        <button class="removeButton" data-index="${index}">Remove</button>
      `;

      todoList.appendChild(listItem);
    });
  }

  // Fetch the initial 'todos' data from the server
  fetch('/initialTodos')
    .then(response => response.json())
    .then(data => {
      todos = data;
      renderTodos();
    });

  // Form submission handling
  const addForm = document.getElementById('addForm');
  addForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const newTodo = {
      text: document.getElementById('newTodo').value,
      dueDate: document.getElementById('dueDate').value,
    };

    todos.push(newTodo);
    renderTodos();

    // Clear form fields
    document.getElementById('newTodo').value = '';
    document.getElementById('dueDate').value = '';
  });
});

    