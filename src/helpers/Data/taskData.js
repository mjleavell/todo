import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllTasks = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/tasks.json`)
    .then((result) => {
      const allTasksObject = result.data;
      const allTasksArray = [];
      if (allTasksObject != null) {
        Object.keys(allTasksObject).forEach((taskId) => {
          const newTask = allTasksObject[taskId];
          newTask.id = taskId;
          allTasksArray.push(newTask);
        });
      }
      resolve(allTasksArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const deleteTask = taskId => axios.delete(`${baseUrl}/tasks/${taskId}.json`);

export default {
  getAllTasks,
  deleteTask,
};
