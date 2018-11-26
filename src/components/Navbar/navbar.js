import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    if (e.target.id === 'navbar-btn-logout') {
      firebase.auth().signOut().then(() => {
        $('#login').show();
        $('#task').hide();
      }).catch((err) => {
        console.error(err);
      });
    } else if (e.target.id === 'navbar-btn-task') {
      $('#login').hide();
      $('#task').show();
    }
  });
};

const displayNavbar = () => {
  const domString = `
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <a class="navbar-brand" href="#">todo</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" id="navbar-new-task">new task</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="navbar-logout">logout</a>
        </li>
      </ul>
    </div>
  </nav>`;
  $('#navbar').html(domString);
  navbarEvents();
};

export default displayNavbar;
