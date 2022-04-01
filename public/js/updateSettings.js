import axios from 'axios';
// const axios = require('axios');
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'Password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type} data was updated`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
// export const updateUser = async (email, name) => {
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: '/api/v1/users/updateMe',
//       data: {
//         email,
//         name
//       }
//     });
//     console.log(res);

//     if (res.data.status === 'success') {
//       showAlert('success', 'Data was updated');
//       //   window.setTimeout(() => {
//       //     location.assign('/');
//       //   }, 1500);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };
// export const updateUserPassword = async (
//   passwordCurrent,
//   password,
//   passwordConfirm
// ) => {
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: '/api/v1/users/updateMyPassword',
//       data: {
//         passwordCurrent,
//         password,
//         passwordConfirm
//       }
//     });
//     if (res.data.status === 'success') {
//       showAlert('success', 'Password was updated');
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };
