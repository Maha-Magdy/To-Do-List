import lodash from "lodash";
import "./style.css";

let toDoTasks = [
  { description: "wash the dishes", completed: false, index: 0 },
  {
    description: "complete list structure milestone",
    completed: false,
    index: 1,
  },
];

function toDoList(list) {
  const listContainer = document.getElementById("to-do-list");

  list.map((task) => {
    const li = document.createElement("li");
    const description = document.createElement("p");
    const descriptionText = document.createTextNode(task.description);

    description.appendChild(descriptionText);
    li.appendChild(description);
    listContainer.appendChild(li);
  });
}

window.addEventListener("load", toDoList(toDoTasks));
