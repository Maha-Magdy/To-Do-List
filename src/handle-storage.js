export default class HandleStorage {
  setTask(task) {
    let to_do_list = getToDoList();
    let index = getIndex()
    task.index = index++;
    to_do_list.push(task)
    localStorage.setItem('to_do_list', JSON.stringify(to_do_list));
  }

  getToDoList() {
    let to_do_list;

    if (!localStorage.getItem('to_do_list')) {
      to_do_list = [];
    } else {
        to_do_list = JSON.parse(localStorage.getItem('to_do_list'));
    }

    return to_do_list;
  }

  getIndex() {
    let index;

    if (!localStorage.getItem('index')) {
        index = 0;
    } else {
        index = JSON.parse(localStorage.getItem('index'));
    }

    return index;
  }

  resetToDoList() {
      localStorage.clear;
  }
}
