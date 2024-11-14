const todo = document.getElementById("ToDo");
const input = document.getElementById("newtext");
const button = document.getElementById("butonlist");
const saveBtn = document.getElementById("saveBtn");

// Prevent form submission when Enter is pressed in input
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default behavior (form submit)
    addTask(); // Trigger task addition programmatically
  }
});

// Function to save the current state to localStorage
saveBtn.addEventListener("click", () => {
  const tasks = [];
  const taskElements = todo.querySelectorAll(".task");

  taskElements.forEach((taskElement) => {
    const text = taskElement.querySelector("p").innerText;
    const isChecked = taskElement.querySelector(
      "input[type='checkbox']"
    ).checked;
    tasks.push({ text, isChecked });
  });

  // Save task state and input value to localStorage
  const inputValue = input.value.trim();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("inputValue", inputValue); // Save the input value
  alert("Tasks and input value saved!");
});

// Function to restore the state from localStorage
function restoreTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  const savedInputValue = localStorage.getItem("inputValue");

  // Restore the input value
  if (savedInputValue) {
    input.value = savedInputValue;
  }

  if (savedTasks) {
    savedTasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task");

      const p = document.createElement("p");
      p.innerText = task.text;

      const checkButton = document.createElement("input");
      checkButton.type = "checkbox";
      checkButton.checked = task.isChecked; // Restore checkbox state
      checkButton.addEventListener("click", markTaskReady);

      const editButton = document.createElement("button");
      editButton.innerText = "Edit text";
      editButton.addEventListener("click", editTask);

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete Task";
      deleteButton.addEventListener("click", deleteTask);

      div.appendChild(checkButton);
      div.appendChild(p);
      div.appendChild(editButton);
      div.appendChild(deleteButton);

      todo.appendChild(div);

      // Apply task completion status (green if checked)
      if (checkButton.checked) {
        div.style.backgroundColor = "green";
      } else {
        div.style.backgroundColor = "white";
      }
    });
  }
}

// Function to delete a task
const deleteTask = (e) => {
  showModal("Esti sigur ca vrei sa stergi task-ul?")
    .then(() => {
      const element = e.target;
      const parent = element.parentElement;
      todo.removeChild(parent);
    })
    .catch(() => {
      alert("Nu stergem!");
    });
};

// Function to edit the task text
const editTask = (e) => {
  showModal("Esti sigur ca vrei sa editezi?")
    .then(() => {
      const text = prompt("Edit task text:");
      const element = e.target;
      const parent = element.parentElement;
      const p = parent.querySelector("p");
      p.innerText = text;
    })
    .catch(() => {
      alert("Nu editam!");
    });
};

// Function to show the confirmation modal
const showModal = (text) => {
  return new Promise((resolve, reject) => {
    const modal = document.getElementById("modal");
    const para = document.createElement("p");
    para.innerText = text;
    const yes = document.createElement("button");
    const no = document.createElement("button");
    yes.innerText = "Yes";
    yes.addEventListener("click", (e) => {
      modal.style.display = "none";
      e.preventDefault();
      while (modal.firstChild) {
        modal.firstChild.remove();
      }
      resolve();
    });
    no.innerText = "No";
    no.addEventListener("click", (e) => {
      modal.style.display = "none";
      e.preventDefault();
      while (modal.firstChild) {
        modal.firstChild.remove();
      }
      reject();
    });
    modal.style.display = "block";
    modal.appendChild(para);
    modal.appendChild(yes);
    modal.appendChild(no);
  });
};

// Function to mark task as ready (completed)
const markTaskReady = (e) => {
  const task = e.target.parentElement;
  const check = e.target;
  if (check.checked) {
    task.style.backgroundColor = "green";
  } else {
    task.style.backgroundColor = "white";
  }
};

// Add new task on button click
button.addEventListener("click", () => {
  addTask(); // Trigger the task addition function
});

// Function to add a new task
function addTask() {
  const text = input.value.trim();
  if (text) {
    const div = document.createElement("div");
    div.classList.add("task");

    const p = document.createElement("p");
    p.innerText = text;

    const checkButton = document.createElement("input");
    checkButton.type = "checkbox";
    checkButton.addEventListener("click", markTaskReady);

    const editButton = document.createElement("button");
    editButton.innerText = "Edit text";
    editButton.addEventListener("click", editTask);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete Task";
    deleteButton.addEventListener("click", deleteTask);

    div.appendChild(checkButton);
    div.appendChild(p);
    div.appendChild(editButton);
    div.appendChild(deleteButton);

    todo.appendChild(div);

    // Do not clear input after adding a task
  }
}

// Restore tasks and input value on page load (if any tasks are saved in localStorage)
window.addEventListener("load", restoreTasks);
