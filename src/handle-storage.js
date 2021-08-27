export default class HandleStorage {
  static setTask(task) {
    let to_do_list = HandleStorage.getToDoList();
    let index = HandleStorage.getIndex();
    task.index = index;
    to_do_list.push(task);
    localStorage.setItem('to_do_list', JSON.stringify(to_do_list));
  }

  static getToDoList() {
    let to_do_list;

    if (!localStorage.getItem('to_do_list')) {
      to_do_list = [];
    } else {
      to_do_list = JSON.parse(localStorage.getItem('to_do_list'));
    }

    return to_do_list;
  }

  static updateToDoList(list) {
    localStorage.setItem('to_do_list', JSON.stringify(list));
  }

  static getIndex() {
    let index;

    if (!localStorage.getItem("index")) {
      index = 0;
      localStorage.setItem("index", JSON.stringify(index));
    } else {
      index = JSON.parse(localStorage.getItem("index")) + 1;
      localStorage.setItem("index", JSON.stringify(index));
    }

    return index;
  }

  static resetToDoList() {
    localStorage.clear();
  }
}
