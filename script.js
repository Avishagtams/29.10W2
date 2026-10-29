// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)

// Step 2: click a task to toggle the "done" class

// Step 3: delete with the x button (one listener on the ul - event delegation)

// Step 4: "tasks left" counter

// Step 5: filters (All / Active / Done)

// Step 6: Clear completed

// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const prioritySelect = document.querySelector("#priority-select");
const taskList = document.querySelector("#task-list");
const error = document.querySelector("#error");
const leftCounter = document.querySelector("#left");
const filterButtons = document.querySelectorAll("#filters button");
let currentFilter = "all";
const clearDoneBtn = document.querySelector("#clear-done");
const emptyMsg = document.querySelector("#empty");

function updateCounter() {
    const allTasks = taskList.querySelectorAll("li");
    const activeTasks = taskList.querySelectorAll("li:not(.done)");

    leftCounter.textContent = activeTasks.length;

    if (allTasks.length === 0) {
        emptyMsg.removeAttribute("hidden");
    } else {
        emptyMsg.setAttribute("hidden", "");
    }
}

function applyFilter() {
    const tasks = taskList.querySelectorAll("li");

    tasks.forEach(function(li) {
        const isDone = li.classList.contains("done");

        if (currentFilter === "all") {
            li.hidden = false;
        } else if (currentFilter === "active") {
            li.hidden = isDone;
        } else if (currentFilter === "done") {
            li.hidden = !isDone;
        }
    });
}
  // ==============T1==============
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        error.textContent = "Please type a task";
        error.hidden = false;
        return;
    }
    error.hidden = true;
    const priority = prioritySelect.value;
    const li = document.createElement("li");
    li.classList.add("priority-" + priority);
    const span = document.createElement("span");
    span.classList.add("text");
    span.textContent = taskText;


    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "x";
    deleteButton.type = "button";


    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();
    updateCounter();
    applyFilter();
});
// ==============T2==============
taskList.addEventListener("click", function(event) {
    const li = event.target.closest('li');
    
    if (!li) return;

  // ==============T3==============
    if (event.target.classList.contains("delete")){
        li.remove();
        updateCounter();
        applyFilter();    
        return;
    }
    li.classList.toggle("done");
    updateCounter();
    applyFilter();
   });

// ==============T5==============
filterButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      event.target.classList.add("active");
  
      currentFilter = event.target.dataset.filter;
      applyFilter();
    });
  });

// ==============T6==============
clearDoneBtn.addEventListener("click", function() {
    const completedTasks = taskList.querySelectorAll("li.done");

    completedTasks.forEach(function(li) {
        li.remove();
    });

    updateCounter();
    applyFilter();
});


