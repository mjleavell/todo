/* eslint-disable max-len */
import $ from 'jquery';
import taskData from '../../helpers/Data/taskData';
import './tasksPage.scss';
// import currentTime from '../../helpers/currentTime';

const printActiveTaskBuilder = (tasks) => {
  let taskString = '';
  tasks.forEach((task) => {
    if (task.isCompleted === false) {
      taskString += `
      <div class="card bg-dark text-white">
        <h5 class="card-title">${task.task}</h5>
        <div class="card-body">
          <input type="checkbox" class="form-check-input is-completed-checkbox" id="${task.id}" value="${task.isCompleted}">
          <label class="form-check-label is-completed-checkbox" for="complete-check">Completed</label>
        </div>
        <div class="card-body">
          <p>Created: ${task.timeStamp}</p>
        </div>
        <div class="card-footer card-footer-active">
          <button class="btn btn-success edit-btn" data-edit-id=${task.id}><i class="far fa-edit edit-btn" data-edit-id=${task.id}></i></button>
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
      <div class="card bg-dark text-white">
        <h5 class="card-title">${task.task}</h5>
        <div class="card-body">
          <input type="checkbox" class="form-check-input is-completed-checkbox" id="${task.id}" value="${task.isCompleted}" checked>
          <label class="form-check-label is-completed-checkbox" for="complete-check">Completed</label>
        </div>
        <div class="card-footer card-footer-complete">
          <button class="btn btn-danger delete-btn" data-delete-id=${task.id}><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>`;
    }
  });
  $('#task-completed-container').html(taskString);
};

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
  const idToDelete = $(e.target).closest('.delete-btn').data('delete-id');
  taskData.deleteTask(idToDelete)
    .then(() => {
      getTasks();
    })
    .catch((error) => {
      console.error('error on deleteTask', error);
    });
};

const updateIsCompleted = (e) => {
  const taskId = e.target.id;
  const isCompleted = e.target.checked;
  taskData.updatedIsCompleted(taskId, isCompleted).then(() => {
    getTasks();
  })
    .catch((error) => {
      console.error(error);
    });
};

// if you move task from completed to active, function below updates entire task.
// const updateTaskWhenChecked = (e) => {
//   const ans = e.target.parentNode.previousElementSibling.innerHTML;
//   const taskId = e.target.id;
//   console.log(ans);
//   const taskObject = {
//     id: taskId,
//     task: $(e.target).parent().prev('.card-title').html(),
//     timeStamp: currentTime.getCurrentTime(),
//     isCompleted: e.target.checked,
//   };
//   taskData.updateTask(taskObject, taskId)
//     .then(() => {
//       getTasks();
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };


const bindEvents = () => {
  $('body').on('click', '.delete-btn', deleteTask);
  $('body').on('change', '.is-completed-checkbox', updateIsCompleted);
};

const initializeTasksPage = () => {
  getTasks();
  bindEvents();
};

export default initializeTasksPage;
