import $ from 'jquery';
import taskData from '../../helpers/Data/taskData';
import initializeTasksPage from '../TasksPage/tasksPage';
import currentTime from '../../helpers/currentTime';

const formBuilder = (task) => {
  const formString = `
  <div class="form-inline mx-auto">
    <label for="form-task-title">Task:</label>
    <input type="text" class="form-control w-25" value="${task.task}" id="form-task-title" placeholder="Enter new item">
  </div>`;
  return formString;
};

const getTaskFromForm = () => {
  const task = {
    task: $('#form-task-title').val(),
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

// const displayEditForm = (e) => {
//   const editBtn = $(e.target).closest('.edit-btn');
//   const idToEdit = $(editBtn).data('edit-id');
//   taskData.getSingleTask(idToEdit)
//     .then((singleTask) => {
//       let domString = '<h3>Edit Task</h3>';
//       domString += formBuilder(singleTask);
// eslint-disable-next-line max-len
//       domString += `<button class="btn btn-primary" id="save-edit-btn" data-single-edit-id=${singleTask.id}>Save Task</button>`;
//       domString += '<button class="btn btn-secondary" id="cancel-edit-btn">Cancel</button>';
//       $('#form').html(domString).show();
//       $('#task').hide();
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

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

const editEvent = (e) => {
  // $('body').on('click', '.edit-btn', (e) => {
  const taskCard = $(e.target).closest('.edit-btn').parents().closest('.card');
  const taskTitle = $(taskCard).children().closest('.card-title');
  const taskTitleElement = $(taskTitle).get(0);
  const taskTitleText = $(taskTitleElement).html();
  $(taskTitleElement).replaceWith(`<input type="text" value="${taskTitleText}" class="form-control edit-input" id="form-task-title">`);
  // $(editInput).val(taskTitleText);
  // });
};

const cancelTaskEdit = () => {
  $('#form').hide();
  $('#task').show();
};

$('body').on('click', '#save-new-task', addTask);
$('body').on('click', '.edit-btn', editEvent);
$('body').on('click', '#save-edit-btn', editTask);
$('body').on('click', '#cancel-edit-btn', cancelTaskEdit);

export default displayForm;
