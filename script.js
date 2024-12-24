const btnAdd = document.querySelector(".js-add-button");

btnAdd?.addEventListener("click", () => {
  addTodo();
});

function saveTodos() {
  localStorage.setItem("TodoList", JSON.stringify(todoList));
}

function loadTodos() {
  const savedTodos = localStorage.getItem("todoList") || [
    {
      name: "make dinner",
      dueDate: "2024-12-25",
    },
  ];
}

const todoList = [
  {
    name: "make dinner",
    dueDate: "2024-12-25",
  },
];

function renderTodoList() {
  let todoHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, dueDate } = todoObject;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button onclick="
    todoList.splice(${i}, 1);
    renderTodoList();
    " class="button-delete">Delete</button>
    `;
    todoHTML += html;
  }

  const displayTodo = document.querySelector(".js-render-todo-list");
  if (displayTodo) {
    displayTodo.innerHTML = todoHTML;
  }
}

function addTodo() {
  const inputNameElement = document.querySelector(".js-name-input");
  const dueDateinputElement = document.querySelector(".js-input-date");
  //@ts-ignore
  const name = inputNameElement?.value;
  //@ts-ignore
  const dueDate = dueDateinputElement?.value;

  if (name && dueDate !== undefined) {
    todoList.push({ name, dueDate });
    saveTodos();
    renderTodoList();

    if (inputNameElement) {
      //@ts-ignore
      inputNameElement.value = "";
    }

    if (dueDateinputElement) {
      //@ts-ignore
      dueDateinputElement.value = "";
    }
  }
}

loadTodos();
renderTodoList();
