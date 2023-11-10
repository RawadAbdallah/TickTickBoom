// DOM elements variables
const tasks_done = document.getElementById("tasks-done"),
  tasks_left = document.getElementById("tasks-left"),
  task_form_wrapper = document.getElementById("form-wrapper"),
  tasks_list_element = document.querySelector(".tasks-list");
(task_form = document.getElementById("task-form")),
  (create_task_btn = document.getElementById("create-task-btn")),
  (add_task_btn = document.getElementById("add-task-btn")),
  (form_exit_btn = document.getElementById("task-form-exit-btn")),
  (task_input = document.getElementById("task-text")),
  (due_date_input = document.getElementById("due-date")),
  (priority_input = document.getElementById("priority"));

let tasks_done_count = 0;
let tasks_left_count = 0;
  
// Function to load existing tasks from localStorage
function loadExistingTasks() {
  const tasks_list = JSON.parse(localStorage.getItem("tasks_list")) || [];
  tasks_list.forEach(function (task) {
    if (!document.getElementById(task.id)) {
      createTaskElement(task);

      if (task.isChecked) {
        tasks_done_count++;
      } else {
        tasks_left_count++;
      }
    }
  });
}

updateCounters();

// On Window load insert saved tasks elements to the DOM.
loadExistingTasks();

function updateCounters(){
  tasks_done.innerText = tasks_done_count;
  tasks_left.innerText = tasks_left_count;
}

// Event Listeners

create_task_btn.addEventListener("click", function () {
  task_form_wrapper.classList.toggle("hidden");
});

form_exit_btn.addEventListener("click", function () {
  task_form_wrapper.classList.toggle("hidden");
});

add_task_btn.addEventListener("click", function (e) {
  e.preventDefault();
  let text = task_input.value,
    priority = priority_input.value,
    due_date = due_date_input.value;

  if (text.length > 1 && priority_input.value !== "Select Priority") {
    createTask(text, due_date, priority);
    task_input.value = "";
    due_date_input.value = "";
    task_form_wrapper.classList.toggle("hidden");
  } else {
    if (text.length <= 1) {
      alert("enter a task");
    } else {
      alert("select a priority");
    }
  }
});

function createTaskElement(task) {
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";
  taskItem.id = task.id;

  if (task.due_date.length > 1) {
    const dueDateSpan = document.createElement("span");
    const taskHeader = document.createElement("div");
    taskHeader.className = "task-header";

    dueDateSpan.id = "task-due-date";
    dueDateSpan.textContent = task.due_date;
    dueDateSpan.className = "task-due-date";
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

  // Delete task
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/icons/delete-icon.svg";
  deleteIcon.alt = "Delete";
  deleteIcon.addEventListener("click", function () {
    tasks_list_element.removeChild(taskItem);
    let new_tasks_list = JSON.parse(localStorage.getItem("tasks_list")) || [];

    const taskIndex = new_tasks_list.findIndex((t) => t.id === task.id);
    if (taskIndex !== -1) {
      new_tasks_list.splice(taskIndex, 1);
      localStorage.setItem("tasks_list", JSON.stringify(new_tasks_list));
    }

    if (taskCheckbox.checked) {
      tasks_done_count++;
      tasks_left_count--;
    } else {
      tasks_done_count--;
      tasks_left_count++;
    }
    updateCounters();

  });

  const editIcon = document.createElement("img");
  editIcon.src = "./assets/icons/edit-icon.svg";
  editIcon.alt = "Edit";
  editIcon.addEventListener("click", function (e) {
    editForm.classList.toggle("jidd");
    const editForm = document.getElementById("editForm");
    const editTaskInput = document.getElementById("editTaskInput");
    editTaskInput.value = task.text;
    const editTaskForm = document.getElementById("editTaskForm");

    editTaskForm.addEventListener("submit", function (event) {
      event.preventDefault();
      editForm.classList.toggle("hidden2");
      const updatedText = editTaskInput.value.trim();
      if (updatedText !== "") {
        task.text = updatedText;
        taskLabel.textContent = task.text;
        let new_tasks_list =
          JSON.parse(localStorage.getItem("tasks_list")) || [];
        const taskIndex = new_tasks_list.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          new_tasks_list[taskIndex].text = updatedText;
          localStorage.setItem("tasks_list", JSON.stringify(new_tasks_list));
        }
      }
    });

    const cancelEditBtn = document.getElementById("cancelEditBtn");
    cancelEditBtn.addEventListener("click", function () {
      editForm.classList.add("hidden2");
    });
  });

  taskButtons.appendChild(dragBtn);
  taskButtons.appendChild(deleteIcon);
  taskButtons.appendChild(editIcon);

  taskBody.appendChild(taskButtons);

  const taskLabel = document.createElement("label");
  taskLabel.htmlFor = task.id;
  taskLabel.className = "task-input-text";
  taskLabel.textContent = task.text;

  const taskCheckbox = document.createElement("input");
  taskCheckbox.id = task.id;
  taskCheckbox.className = "task-checkbox";
  taskCheckbox.type = "checkbox";
  taskCheckbox.name = "task-checkbox";
  taskCheckbox.checked = task.isChecked;

  taskCheckbox.addEventListener("change", function () {
    if (taskItem.classList.contains("task-done")) {
      taskItem.classList.remove("task-done");
    } else {
      taskItem.classList.add("task-done");
    }
    task.isChecked = taskCheckbox.checked;
    let new_tasks_list = JSON.parse(localStorage.getItem("tasks_list")) || [];
    const taskIndex = new_tasks_list.findIndex((t) => t.id === task.id);
    if (taskIndex !== -1) {
      new_tasks_list[taskIndex].isChecked = taskCheckbox.checked;
      localStorage.setItem("tasks_list", JSON.stringify(new_tasks_list));
    }
  });

  taskBody.appendChild(taskLabel);
  taskBody.appendChild(taskCheckbox);

  taskItem.appendChild(taskBody);
  tasks_list_element.appendChild(taskItem);
}

function createTask(text, due_date = "", priority = "LOW", isChecked = false) {
  // Creating unique id
  const taskId = text + Math.floor(Math.random() * 100000);

  const newTask = {
    id: taskId,
    text: text,
    due_date: due_date,
    priority: priority,
    isChecked: isChecked,
  };

  // Add the new task to the localStorage
  let new_tasks_list = JSON.parse(localStorage.getItem("tasks_list")) || [];
  new_tasks_list.push(newTask);
  localStorage.setItem("tasks_list", JSON.stringify(new_tasks_list));

  // Create the task element in the DOM
  createTaskElement(newTask);
}

// Setting min attribute for the Date element
let today = new Date().toISOString().split("T")[0];
due_date_input.setAttribute("min", today);
