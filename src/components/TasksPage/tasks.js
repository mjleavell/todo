import $ from 'jquery';
import taskData from '../../helpers/Data/taskData';
import './tasksPage.scss';

const printTasks = (tasks) => {
  let taskString = '';
  tasks.forEach((task) => {
    taskString += `
    <div class="card">
      <h5 class="card-title">${task.task}</h5>
      <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete friend</button>
      <button class="btn btn-secondary edit-btn" data-edit-id=${task.id}>Edit friend</button>
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

export default getTasks;
