import $ from 'jquery';
import taskData from '../../helpers/Data/taskData';
import './tasksPage.scss';

const printTasks = (tasks) => {
  let taskString = '';
  tasks.forEach((task) => {
    taskString += `
    <div class="card  border-dark">
      <h5 class="card-title">${task.task}</h5>
      <div class="card-body">
        <button class="btn btn-secondary edit-btn" data-edit-id=${task.id}><i class="far fa-edit"></i></button>
        <button class="btn btn-danger delete-btn" data-delete-id=${task.id}><i class="fas fa-trash-alt"></i></button>
      </div>
    </div>`;
  });
  $('#task').html(taskString);
};

const getTasks = () => {
  taskData.getAllTasks()
    .then((taskArray) => {
      printTasks(taskArray);
    })
    .catch((error) => {
      console.error('error on getTasks', error);
    });
};

const deleteTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  taskData.deleteTask(idToDelete)
    .then(() => {
      getTasks();
      console.log(getTasks);
    })
    .catch((error) => {
      console.error('error on deleteTask', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.delete-btn', deleteTask);
};

const initializeTasksPage = () => {
  bindEvents();
  getTasks();
};

export default initializeTasksPage;
