import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const getUserLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#task').show();
      $('#form').show();
      $('#login').hide();
      $('#navbar-btn-logout').show();
    } else {
      $('#task').hide();
      $('#login').show();
      $('#form').hide();
      $('#navbar-btn-logout').hide();
    }
  });
};

export default getUserLoginStatus;
