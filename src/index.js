/* eslint-disable array-callback-return */
/* eslint-disable import/no-named-default */
import "./style.css";
import { default as Task, updateStatus, updateDescription } from "./task.js";
import handleStorage from "./handle-storage.js";

let toDoTasks = handleStorage.getToDoList();
const listContainer = document.getElementById("to-do-list");

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
      const selectedTask = allTasks[index];

      const task = updateStatus(selectedTask, completed);

      allTasks.splice(index, 1, task);

      handleStorage.updateToDoList(allTasks);
    });

    const btn = document.createElement("button");
    btn.addEventListener("click", (e) => {
      const index = Array.prototype.indexOf.call(
        listContainer.childNodes,
        e.target.offsetParent
      );

      const allTasks = handleStorage.getToDoList();
      const selectedTask = allTasks[index];

      updateOrDeleteTask(e.target.offsetParent, index, selectedTask);
    });

    li.appendChild(checkbox);
    li.appendChild(description);
    li.appendChild(btn);

    listContainer.appendChild(li);
  });
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

  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.value = task.description;

  input.addEventListener("change", (e) => {
    const index = Array.prototype.indexOf.call(
      listContainer.childNodes,
      e.target.offsetParent
    );

    let allTasks = handleStorage.getToDoList();
    const selectedTask = allTasks[index];

    const task = updateDescription(selectedTask, e.target.value);

    allTasks.splice(index, 1, task);

    handleStorage.updateToDoList(allTasks);

    toDoList(list);
  });

  li.appendChild(input);
}
