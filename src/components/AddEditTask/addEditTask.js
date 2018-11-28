import $ from 'jquery';
import taskData from '../../helpers/Data/taskData';
import initializeTasksPage from '../TasksPage/tasksPage';

const formBuilder = (task) => {
  const formString = `
  <div class="form-group form-inline mx-auto">
    <label for="form-task-title">Task:</label>
    <input type="text" class="form-control w-25" value="${task.task}" id="form-task-title" placeholder="Enter new item">
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

const displayEditForm = (e) => {
  const editBtn = $(e.target).closest('.edit-btn');
  const idToEdit = $(editBtn).data('edit-id');
  taskData.getSingleTask(idToEdit)
    .then((singleTask) => {
      let domString = '<h3>Edit Task</h3>';
      domString += formBuilder(singleTask);
      domString += `<button class="btn btn-primary" id="save-edit-task" data-single-edit-id=${singleTask.id}>Save Task</button>`;
      $('#form').html(domString).show();
      $('#task').hide();
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

$('body').on('click', '#save-new-task', addTask);
$('body').on('click', '.edit-btn', displayEditForm);
$('body').on('click', '#save-edit-task', editTask);

export default displayForm;
