const btnAdd = document.querySelector(".js-button-add");

btnAdd?.addEventListener("click", () => {
  addTodo();
});

const saveTodos = () =>
  localStorage.setItem("todoList", JSON.stringify(todoList));

const loadTodos = () => {
  const savedTodos = localStorage.getItem("todoList") || [
    { name: "make dinner", dueDate: "2024-12-25" },
  ];
};

const todoList = [{ name: "make dinner", dueDate: "2024-12-25" }];

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

function addTodo() {
  const inputNameElement = document.querySelector(".js-input-name");
  const dueDateInputElement = document.querySelector(".js-date-input");

  const name = inputNameElement?.value;
  const dueDate = dueDateInputElement?.value;

  if (name && dueDate !== undefined) {
    todoList.push({ name, dueDate });
    saveTodos();
    renderTodoList();

    if (inputNameElement) {
      inputNameElement.value = "";
    }

    if (dueDateInputElement) {
      dueDateInputElement.value = "";
    }
  }
}
loadTodos();
renderTodoList();
