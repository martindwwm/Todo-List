// storing tasks in the browser
const savedTodos = localStorage.getItem("todoList");
const todoList = savedTodos
  ? JSON.parse(savedTodos)
  : [{ name: "make dinner", dueDate: "2024-12-25" }];

const btnAdd = document.querySelector(".js-button-add");

btnAdd?.addEventListener("click", () => {
  addTodo();
});

// Logic to view and delete tasks
function renderTodoList() {
  let todoHTML = "";
  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button class="js-delete-todo-button button-delete">Delete</button>
    `;
    todoHTML += html;
  });
  const displayTodo = document.querySelector(".js-render-todo-list");

  displayTodo.innerHTML = todoHTML;

  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    });
}

// Logic to add tasks
function addTodo() {
  const inputNameElement = document.querySelector(".js-input-name");
  const dueDateInputElement = document.querySelector(".js-date-input");

  const name = inputNameElement?.value;
  const dueDate = dueDateInputElement?.value;

  if (name && dueDate !== undefined) {
    todoList.push({ name, dueDate });
    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderTodoList();

    // resetting the value of the inputs once a first value has been added
    inputNameElement.value = "";
    dueDateInputElement.value = "";
  }
}
renderTodoList();
