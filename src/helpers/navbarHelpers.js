import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const getUserLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#task-active').show();
      $('#task-completed').show();
      $('#login').hide();
      $('#navbar-btn-logout').show();
      $('#navbar-btn-task').show();
    } else {
      $('#task-active').hide();
      $('#task-completed').hide();
      $('#login').show();
      $('#navbar-btn-logout').hide();
      $('#navbar-btn-task').hide();
    }
  });
};

export default getUserLoginStatus;
