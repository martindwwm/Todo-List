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
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, dueDate } = todoObject;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button onclick="
    todoList.splice(${i}, 1)
    renderTodoList()
    " class="button-delete">Delete</button>
    `;
    todoHTML += html;
  }
  const displayTodo = document.querySelector(".js-render-todo-list");
  displayTodo.innerHTML = todoHTML;
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
    if (inputNameElement) {
      inputNameElement.value = "";
    }

    if (dueDateInputElement) {
      dueDateInputElement.value = "";
    }
  }
}
renderTodoList();
