/* eslint-disable array-callback-return */
import "./style.css";
import { default as Task, updateStatus } from "./task";
import handleStorage from "./handle-storage";

// let toDoTasks = [
//   { description: "Wash the dishes", completed: false, index: 0 },
//   {
//     description: "Complete list structure milestone",
//     completed: false,
//     index: 1,
//   },
// ];

let toDoTasks = handleStorage.getToDoList();

function toDoList(list) {
  list.sort((a, b) => (a.index > b.index ? 1 : -1));

  const listContainer = document.getElementById("to-do-list");
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
    
    checkbox.addEventListener("change", function (e) {
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

      let all_tasks = handleStorage.getToDoList();
      const selectedTask = all_tasks[index];

      const task = updateStatus(selectedTask, completed);

      all_tasks.splice(index, 1, task);

      handleStorage.updateToDoList(all_tasks);
    });

    const btn = document.createElement("button");

    li.appendChild(checkbox);
    li.appendChild(description);
    li.appendChild(btn);

    listContainer.appendChild(li);
  });
}

window.addEventListener("load", toDoList(toDoTasks));

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function () {
  handleStorage.resetToDoList();
});

const newTask = document.getElementById("new-task");

function addNewTask() {
  if (newTask.value) {
    const taskDescription = newTask.value;
    let task = new Task(taskDescription, false, 0);
    handleStorage.setTask(task);
    toDoTasks = handleStorage.getToDoList();
    newTask.value = "";
    toDoList(toDoTasks);
  }
}

const addToYourList = document.getElementById("add-to-your-list");

addToYourList.addEventListener("click", addNewTask);

newTask.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addNewTask();
  }
});
