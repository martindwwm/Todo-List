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
    <button onclick="
    todoList.splice(${index}, 1)
    renderTodoList()
    " class="button-delete">Delete</button>
    `;
    todoHTML += html;
  });
  const displayTodo = document.querySelector(".js-render-todo-list");

  //@ts-ignore
  displayTodo.innerHTML = todoHTML;
}

// Logic to add tasks
function addTodo() {
  const inputNameElement = document.querySelector(".js-input-name");
  const dueDateInputElement = document.querySelector(".js-date-input");

  //@ts-ignore
  const name = inputNameElement?.value;

  //@ts-ignore
  const dueDate = dueDateInputElement?.value;

  if (name && dueDate !== undefined) {
    todoList.push({ name, dueDate });
    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderTodoList();

    // resetting the value of the inputs once a first value has been added
    if (inputNameElement) {
      //@ts-ignore
      inputNameElement.value = "";
    }

    if (dueDateInputElement) {
      //@ts-ignore
      dueDateInputElement.value = "";
    }
  }
}
renderTodoList();
