export default class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

export function updateStatus(task, completed) {
  if (completed) {
    task.completed = true;
  } else {
    task.completed = false;
  }

  return task;
}
