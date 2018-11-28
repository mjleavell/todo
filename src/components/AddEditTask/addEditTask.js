import $ from 'jquery';
import taskData from '../../helpers/Data/taskData';
import initializeTasksPage from '../TasksPage/tasksPage';
import currentTime from '../../helpers/currentTime';

const formBuilder = (task) => {
  const formString = `
  <div class="form-row d-flex justify-content-center mt-3">
    <div class="form-group col-6 pr-1">
      <input type="text" class="form-control form-input" value="${task.task}" id="form-new-input" placeholder="Enter new task">
    </div>
    <div class="form-group col-2 p-0">
      <button class="btn btn-secondary" id="save-new-task">Add Task</button>
    </div>
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

const getTaskFromEdit = (e) => {
  const task = {
    task: $(e.target).closest('.form-input').val(),
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
  let domString = '';
  domString += formBuilder(emptyTask);
  $('#form').html(domString);
};

const addTask = (e) => {
  const newTaskObj = getTaskFromForm();
  // console.log(newTaskObj);
  if (e.keyCode === 13) {
    taskData.addNewTask(newTaskObj)
      .then(() => {
        $('#form-new-input').val('');
        initializeTasksPage();
      })
      .catch((error) => {
        console.error(error);
      });
  } else if (e.type === 'click') {
    taskData.addNewTask(newTaskObj)
      .then(() => {
        $('#form-new-input').val('');
        initializeTasksPage();
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const changeTaskTitleToInput = (e) => {
  const taskCard = $(e.target).closest('.edit-btn').parents().closest('.card');
  const taskTitle = $(taskCard).children().closest('.card-title');
  const taskTitleElement = $(taskTitle).get(0);
  const taskTitleText = $(taskTitleElement).html();
  const taskId = $(e.target).closest('.edit-btn').data('edit-id');
  $(taskTitleElement).replaceWith(`<input type="text" value="${taskTitleText}" data-edit-input-id=${taskId} class="form-control form-input edit-input" id="edit-task-title">`);
};

const editInputEnterEvent = (e) => {
  if (e.keyCode === 13) {
    const editedTaskId = $(e.target).data('edit-input-id');
    const editedTaskObject = getTaskFromEdit(e);
    taskData.updateTask(editedTaskObject, editedTaskId)
      .then(() => {
        initializeTasksPage();
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

$('body').on('keyup', '#edit-task-title', editInputEnterEvent);
$('body').on('keyup', '#form-new-input', addTask);
$('body').on('click', '#save-new-task', addTask);
$('body').on('click', '.edit-btn', changeTaskTitleToInput);
// $('body').on('click', '#save-edit-btn', editTask);

export default displayForm;
