/* eslint-disable max-len */
import $ from 'jquery';
import taskData from '../../helpers/Data/taskData';
import './tasksPage.scss';

const printActiveTaskBuilder = (tasks) => {
  let taskString = '';
  tasks.forEach((task) => {
    if (task.isCompleted === false) {
      taskString += `
      <div class="card border-dark">
        <h5 class="card-title">${task.task}</h5>
        <div class="card-body">
          <input type="checkbox" class="form-check-input is-completed-checkbox" id="${task.id}">
          <label class="form-check-label is-completed-checkbox" for="complete-check">Completed</label>
        </div>
        <div class="card-body">
          <button class="btn btn-secondary edit-btn" data-edit-id=${task.id}><i class="far fa-edit edit-btn" data-edit-id=${task.id}></i></button>
          <button class="btn btn-danger delete-btn" data-delete-id=${task.id}><i class="fas fa-trash-alt delete-btn" data-delete-id=${task.id}></i></button>
        </div>
      </div>`;
    }
  });
  $('#task-active-container').html(taskString);
};

const printCompletedTaskBuilder = (tasks) => {
  let taskString = '';
  tasks.forEach((task) => {
    if (task.isCompleted === true) {
      taskString += `
      <div class="card border-dark">
        <h5 class="card-title">${task.task}</h5>
        <div class="card-body">
          <input type="checkbox" class="form-check-input is-completed-checkbox" id="${task.id}" checked>
          <label class="form-check-label is-completed-checkbox" for="complete-check">Completed</label>
        </div>
        <div class="card-body">
          <button class="btn btn-secondary edit-btn" data-edit-id=${task.id}><i class="far fa-edit edit-btn" data-edit-id=${task.id}></i></button>
          <button class="btn btn-danger delete-btn" data-delete-id=${task.id}><i class="fas fa-trash-alt delete-btn" data-delete-id=${task.id}></i></button>
        </div>
      </div>`;
    }
  });
  $('#task-completed-container').html(taskString);
};

// const printTasks = (tasks) => {
//   tasks.forEach((task) => {
//     if (task.isCompleted === false) {
//       activeTaskBuilder(task);
//     } else if (task.isCompleted === true) {
//       completedTaskBuilder(task);
//     }
//   });
// };

const getTasks = () => {
  taskData.getAllTasks()
    .then((taskArray) => {
      printActiveTaskBuilder(taskArray);
      printCompletedTaskBuilder(taskArray);
    })
    .catch((error) => {
      console.error('error on getTasks', error);
    });
};

const deleteTask = (e) => {
  // const idToDelete = $(e.target).closest('[data-delete-id]');
  // console.log(idToDelete);
  const idToDelete = e.target.dataset.deleteId;
  taskData.deleteTask(idToDelete)
    .then(() => {
      getTasks();
      // console.log(getTasks);
    })
    .catch((error) => {
      console.error('error on deleteTask', error);
    });
};

const updateIsCompleted = (e) => {
  const taskId = e.target.id;
  const isCompleted = e.target.checked;
  taskData.updatedIsCompleted(taskId, isCompleted)
    .then(() => {
      getTasks();
    })
    .catch((error) => {
      console.error(error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.delete-btn', deleteTask);
  $('body').on('change', '.is-completed-checkbox', updateIsCompleted);
};

const initializeTasksPage = () => {
  getTasks();
  bindEvents();
};

export default initializeTasksPage;
