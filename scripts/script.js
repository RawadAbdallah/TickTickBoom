// const tasks_list = localStorage.getItem('tasks_list') ? localStorage.getItem('tasks_list') : localStorage.setItem('tasks_list', [])
const tasks_list = [];

// DOM elements variables
const tasks_done = document.getElementById("tasks-done"),
  tasks_left = document.getElementById("tasks-left"),
  task_form_wrapper = document.getElementById("form-wrapper"),
  tasks_list_element = document.querySelector(".tasks-list");
task_form = document.getElementById("task-form"),
  create_task_btn = document.getElementById("create-task-btn"),
  add_task_btn = document.getElementById("add-task-btn"),
  form_exit_btn = document.getElementById("task-form-exit-btn"),
  task_input = document.getElementById("task-text"),
  due_date_input = document.getElementById("due-date"),
  priority_input = document.getElementById("priority");

let tasks_done_count = 0;
let tasks_left_count = 0;

tasks_done.innerText = tasks_done_count;
tasks_left.innerText = tasks_left_count;

// Event Listeners

create_task_btn.addEventListener("click", function () {
  task_form_wrapper.classList.toggle("hidden");
});

form_exit_btn.addEventListener("click", function () {
  task_form_wrapper.classList.toggle("hidden");
});

add_task_btn.addEventListener("click", function (e) {
  e.preventDefault();
  createTask();
  let text = task_input.value,
    priority = priority_input.value,
    due_date = due_date_input.value;
  if (text.length > 1 && priority_input.value !== "Select Priority") {
    createTask(text, due_date, priority);
  } else {
    if (text.length <= 1) {
      alert("enter a task");
    } else {
      alert("select a priority");
    }
  }

  task_form_wrapper.classList.toggle("hidden");
});

function createTask(text, due_date = "", priority = "LOW") {
  //Creating unique id
  const taskId = text + Math.floor(Math.random() * 100000);
  const checkboxId = text + Math.floor(Math.random() * 100000);

  const taskItem = document.createElement("div");
  taskItem.className = "task-item";
  taskItem.id = taskId;

  if (due_date.length > 1) {
    const dueDateSpan = document.createElement("span");
    const taskHeader = document.createElement("div");
    taskHeader.className = "task-header";

    dueDateSpan.id = "task-due-date";
    dueDateSpan.textContent = due_date;
    taskHeader.appendChild(dueDateSpan);
    taskItem.appendChild(taskHeader);
  }

  const taskBody = document.createElement("div");
  taskBody.className = "task-body";

  const taskButtons = document.createElement("div");
  taskButtons.className = "task-btns";

  const dragBtn = document.createElement("img");
  dragBtn.className = "drag-btn";
  dragBtn.src = "./assets/icons/drag-dots.svg";
  dragBtn.alt = "|";

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/icons/delete-icon.svg";
  deleteIcon.alt = "Delete";

  const editIcon = document.createElement("img");
  editIcon.src = "./assets/icons/edit-icon.svg";
  editIcon.alt = "Edit";

  taskButtons.appendChild(dragBtn);
  taskButtons.appendChild(deleteIcon);
  taskButtons.appendChild(editIcon);

  taskBody.appendChild(taskButtons);

  const taskLabel = document.createElement("label");
  taskLabel.htmlFor = checkboxId;
  taskLabel.className = "task-input-text";
  taskLabel.textContent = text;

  const taskCheckbox = document.createElement("input");
  taskCheckbox.id = checkboxId;
  taskCheckbox.className = "task-checkbox";
  taskCheckbox.type = "checkbox";
  taskCheckbox.name = "task-checkbox";

  taskBody.appendChild(taskLabel);
  taskBody.appendChild(taskCheckbox);

  taskItem.appendChild(taskBody);
  tasks_list_element.appendChild(taskItem);
}

function removeTask(taskId) {
  const taskToRemove = document.getElementById(taskId);

  if (taskToRemove) {
    taskToRemove.remove();
  }
}
