import $ from 'jquery';
import taskData from '../../helpers/Data/taskData';
import initializeTasksPage from '../TasksPage/tasksPage';
import currentTime from '../../helpers/currentTime';

const formBuilder = (task) => {
  const formString = `
  <div class="form-inline mx-auto">
    <label for="form-task-title">Task:</label>
    <input type="text" class="form-control form-input w-25" value="${task.task}" id="form-task-title" placeholder="Enter new item">
  </div>`;
  return formString;
};

const getTaskFromForm = () => {
  const task = {
    task: $('.form-input').val(),
    timeStamp: currentTime.getCurrentTime(),
    isCompleted: false,
  };
  return task;
};

const displayForm = () => {
  const emptyTask = {
    task: '',
    timeStamp: '',
    isCompleted: '',
  };
  let domString = '<h3>Add Task</h3>';
  domString += formBuilder(emptyTask);
  domString += '<button class="btn btn-secondary" id="save-new-task">Save New Task</button>';
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

const editTask = (e) => {
  const editedTask = getTaskFromForm();
  const taskId = e.target.dataset.singleEditId;
  taskData.updateTask(editedTask, taskId)
    .then(() => {
      $('#form').html('');
      $('#task').show();
      initializeTasksPage();
    })
    .catch((error) => {
      console.error(error);
    });
};

const changeTaskTitleToInput = (e) => {
  const taskCard = $(e.target).closest('.edit-btn').parents().closest('.card');
  const taskTitle = $(taskCard).children().closest('.card-title');
  const taskTitleElement = $(taskTitle).get(0);
  const taskTitleText = $(taskTitleElement).html();
  const taskId = $(e.target).closest('.edit-btn').data('edit-id');
  $(taskTitleElement).replaceWith(`<input type="text" value="${taskTitleText}" data-edit-input-id=${taskId} class="form-control form-input edit-input" id="form-task-title">`);
};

const editInputEnterEvent = (e) => {
  if (e.keyCode === 13) {
    const editedTaskId = $(e.target).data('edit-input-id');
    const editedTaskObject = getTaskFromForm();
    taskData.updateTask(editedTaskObject, editedTaskId)
      .then(() => {
        initializeTasksPage();
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const cancelTaskEdit = () => {
  $('#form').hide();
  $('#task').show();
};

$('body').on('keyup', '.edit-input', editInputEnterEvent);
$('body').on('click', '#save-new-task', addTask);
$('body').on('click', '.edit-btn', changeTaskTitleToInput);
$('body').on('click', '#save-edit-btn', editTask);
$('body').on('click', '#cancel-edit-btn', cancelTaskEdit);

export default displayForm;
