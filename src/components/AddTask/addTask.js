import $ from 'jquery';
import taskData from '../../helpers/Data/taskData';
import initializeTasksPage from '../TasksPage/tasksPage';

const formBuilder = (task) => {
  const formString = `
  <div id="task-form">
    <div class="form-group form-inline mx-auto">
      <label for="form-task-title">Task:</label>
      <input type="text" class="form-control w-25" value="${task.task}" id="form-task-title" placeholder="Enter new item">
    </div>
    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="complete-check">
      <label class="form-check-label" for="complete-check">Completed</label>
    </div>
    <button class="btn btn-secondary" id="save-task">Save Task</button>
  </div>`;
  return formString;
};

const getTaskFromForm = () => {
  const task = {
    task: $('#form-task-title').val(),
    isCompleted: false,
  };
  return task;
};

const displayForm = () => {
  const emptyTask = {
    task: '',
    isCompleted: '',
  };
  let domString = '<h4>Add Task</h4>';
  domString += formBuilder(emptyTask);
  $('#form').html(domString).show();
  $('#task').hide();
};

const addTask = () => {
  const newTaskObj = getTaskFromForm();
  // console.log(newTaskObj);
  taskData.addNewTask(newTaskObj)
    .then(() => {
      $('#form').html('').hide();
      $('#task').show();
      initializeTasksPage();
    })
    .catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '#save-task', addTask);

export default displayForm;
