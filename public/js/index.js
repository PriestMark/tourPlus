// console.log('parcel');

import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login } from './login';
import { logout } from './login';
import { updateSettings } from './updateSettings';
// import { updateUserPassword } from './updateSettings';
//DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutButton = document.querySelector('.nav__el--logout');
const updateUserDataForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-settings');
// Delegation
if (mapBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  displayMap(locations);
}

if (loginForm) {
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
if (logoutButton) logoutButton.addEventListener('click', logout);

if (updateUserDataForm) {
  updateUserDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    updateSettings(form, 'User');
  });
}
if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    updateSettings({ passwordCurrent, password, passwordConfirm }, 'Password');
  });
}
