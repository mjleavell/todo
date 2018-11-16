import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';
import displayNavbar from './components/Navbar/navbar';
import './index.scss';
import loginBtn from './components/Auth/auth';

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  displayNavbar();
  loginBtn();
};

initApp();
