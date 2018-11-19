// import $ from 'jquery';
import getTasksData from './taskData';

const displayTasks = () => {
  getTasksData().then((tasks) => {
    console.log(tasks);
  }).catch((error) => {
    console.error(error);
  });
};

export default displayTasks;
