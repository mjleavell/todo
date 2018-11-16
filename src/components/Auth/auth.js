import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import googleImg from './googleLogin.png';
import './auth.scss';

const loginBtn = () => {
  const domString = `
  <button id="google-login" class="btn btn-outline-light">
    <img src="${googleImg}"></img>
  </button>`;
  $('#login').html(domString);
  $('#google-login').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default loginBtn;
