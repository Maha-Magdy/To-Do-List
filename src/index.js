/* eslint-disable array-callback-return */
/* eslint-disable import/no-named-default */
/* eslint-disable no-use-before-define */
import "./style.css";
import { default as Task, updateStatus, updateDescription } from "./task.js";
import handleStorage from "./handle-storage.js";

let toDoTasks = handleStorage.getToDoList();
const listContainer = document.getElementById("to-do-list");
let draggable = document.querySelectorAll(".to-do-list li");

function getSelectedTask(e) {
  const index = Array.prototype.indexOf.call(
    listContainer.childNodes,
    e.target.offsetParent
  );

  const allTasks = handleStorage.getToDoList();
  const selectedTask = allTasks[index];

  return [index, selectedTask, allTasks];
}

function toDoList(list) {
  list.sort((a, b) => (a.index > b.index ? 1 : -1));

  listContainer.innerHTML = "";

  list.map((task) => {
    const li = document.createElement("li");
    const description = document.createElement("p");
    const descriptionText = document.createTextNode(task.description);
    description.appendChild(descriptionText);

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    if (task.completed) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }

    checkbox.addEventListener("change", (e) => {
      let completed;
      if (e.target.checked) {
        completed = true;
      } else {
        completed = false;
      }

      const index = Array.prototype.indexOf.call(
        listContainer.childNodes,
        e.target.offsetParent
      );

      const allTasks = handleStorage.getToDoList();
      const selectedTask = getSelectedTask(e)[1];

      const task = updateStatus(selectedTask, completed);

      allTasks.splice(index, 1, task);

      handleStorage.updateToDoList(allTasks);
    });

    const btn = document.createElement("button");
    btn.addEventListener("click", (e) => {
      const index = getSelectedTask(e)[0];
      const selectedTask = getSelectedTask(e)[1];

      updateOrDeleteTask(e.target.offsetParent, index, selectedTask);
    });

    li.appendChild(checkbox);
    li.appendChild(description);
    li.appendChild(btn);

    li.setAttribute("draggable", "true");

    listContainer.appendChild(li);
  });

  makeDraggableItems();
}

window.addEventListener("load", toDoList(toDoTasks));

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  handleStorage.resetToDoList();
  toDoTasks = handleStorage.getToDoList();
  toDoList(toDoTasks);
});

const newTask = document.getElementById("new-task");

function addNewTask() {
  if (newTask.value) {
    const taskDescription = newTask.value;
    const task = new Task(taskDescription, false, 0);
    handleStorage.setTask(task);
    toDoTasks = handleStorage.getToDoList();
    newTask.value = "";
    toDoList(toDoTasks);
  }
}

const addToYourList = document.getElementById("add-to-your-list");

addToYourList.addEventListener("click", addNewTask);

newTask.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNewTask();
  }
});

function updateOrDeleteTask(li, index, task) {
  li.removeChild(li.lastElementChild);
  li.removeChild(li.lastElementChild);

  // handling update functionality
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.value = task.description;

  input.addEventListener("change", (e) => {
    const selectedTask = getSelectedTask(e)[1];
    const task = updateDescription(selectedTask, e.target.value);
    const allTasks = getSelectedTask(e)[2];

    allTasks.splice(index, 1, task);

    handleStorage.updateToDoList(allTasks);

    toDoList(allTasks);
  });

  li.appendChild(input);

  // handling delete functionality
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "delete-button");
  deleteBtn.addEventListener("click", (e) => {
    const index = Array.prototype.indexOf.call(
      listContainer.childNodes,
      e.target.offsetParent
    );

    const allTasks = handleStorage.getToDoList();

    allTasks.splice(index, 1);

    handleStorage.updateToDoList(allTasks);

    toDoList(allTasks);
  });

  li.appendChild(deleteBtn);
}

const clearCompletedTasksBtn = document.getElementById("clear-completed-tasks");
clearCompletedTasksBtn.addEventListener("click", () => {
  toDoTasks = handleStorage.getToDoList();
  const unCompletedTasks = toDoTasks.filter((task) => task.completed === false);
  handleStorage.updateToDoList(unCompletedTasks);
  toDoList(unCompletedTasks);
});

// Add the drag and drop functionality
function makeDraggableItems() {
  draggable = document.querySelectorAll(".to-do-list li");
  draggable.forEach((draggedItem) => {
    draggedItem.addEventListener("dragstart", () => {
      console.log("Hii", draggable);
      draggedItem.classList.add("dragging");
    });

    draggedItem.addEventListener("dragend", () => {
      draggedItem.classList.remove("dragging");
    });
  });
}

listContainer.addEventListener("dragover", (e) => {
  e.preventDefault;
  const afterElement = getDragAfterElement(e.clientY);
  let draggable = document.querySelector(".dragging");
  if (afterElement == null) {
    listContainer.appendChild(draggable);
  } else {
    listContainer.insertBefore(draggable, afterElement);
  }
});

function getDragAfterElement(y_position) {
  const draggableElements = [
    ...listContainer.querySelectorAll(".to-do-list li:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y_position - box.y - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
