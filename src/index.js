/* eslint-disable array-callback-return */
import './style.css';
import task from './task';
import handleStorage from './handle-storage';

const toDoTasks = [
  { description: 'wash the dishes', completed: false, index: 0 },
  {
    description: 'complete list structure milestone',
    completed: false,
    index: 1,
  },
];

function toDoList(list) {
  list.sort((a, b) => (a.index > b.index ? 1 : -1));

  const listContainer = document.getElementById('to-do-list');

  list.map((task) => {
    const li = document.createElement('li');
    const description = document.createElement('p');
    const descriptionText = document.createTextNode(task.description);
    description.appendChild(descriptionText);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    const btn = document.createElement('button');

    li.appendChild(checkbox);
    li.appendChild(description);
    li.appendChild(btn);

    listContainer.appendChild(li);
  });
}

window.addEventListener('load', toDoList(toDoTasks));
