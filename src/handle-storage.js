export default class HandleStorage {
  static setTask(task) {
    const toDoList = HandleStorage.getToDoList();
    const index = HandleStorage.getIndex();
    task.index = index;
    toDoList.push(task);
    localStorage.setItem('to_do_list', JSON.stringify(toDoList));
  }

  static getToDoList() {
    let toDoList;

    if (!localStorage.getItem('to_do_list')) {
      toDoList = [];
    } else {
      toDoList = JSON.parse(localStorage.getItem('to_do_list'));
    }

    return toDoList;
  }

  static updateToDoList(list) {
    localStorage.setItem('to_do_list', JSON.stringify(list));
  }

  static getIndex() {
    let index;

    if (!localStorage.getItem('index')) {
      index = 0;
      localStorage.setItem('index', JSON.stringify(index));
    } else {
      index = JSON.parse(localStorage.getItem('index')) + 1;
      localStorage.setItem('index', JSON.stringify(index));
    }

    return index;
  }

  static resetToDoList() {
    localStorage.clear();
  }
}
