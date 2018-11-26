import firebase from 'firebase/app';
import 'bootstrap';
import $ from 'jquery';

import apiKeys from '../db/apiKeys.json';
import displayNavbar from './components/Navbar/navbar';
import './index.scss';
import loginBtn from './components/Auth/auth';
import getUserLoginStatus from './helpers/navbarHelpers';
import tasksPage from './components/TasksPage/tasksPage';
import displayForm from './components/AddTask/addTask';

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  displayNavbar();
  getUserLoginStatus();
  loginBtn();
  tasksPage();
  $('body').on('click', '#navbar-new-task', displayForm);
};

initApp();
