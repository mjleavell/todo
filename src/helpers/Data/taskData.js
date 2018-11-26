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

const getSingleTask = taskId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tasks/${taskId}.json`)
    .then((result) => {
      const singleTask = result.data;
      singleTask.id = taskId;
      resolve(singleTask);
    })
    .catch((err) => {
      reject(err);
    });
});

const updateTask = (taskObject, taskId) => axios.put(`${baseUrl}/tasks/${taskId}.json`, JSON.stringify(taskObject));

const deleteTask = taskId => axios.delete(`${baseUrl}/tasks/${taskId}.json`);

const addNewTask = taskObject => axios.post(`${baseUrl}/tasks.json`, JSON.stringify(taskObject));

export default {
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  addNewTask,
};
