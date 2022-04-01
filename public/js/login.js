{
  /* <script
  src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.0/axios.min.js"
  integrity="sha512-bPh3uwgU5qEMipS/VOmRqynnMXGGSRv+72H/N260MQeXZIK4PG48401Bsby9Nq5P5fz7hy5UGNmC/W1Z51h2GQ=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>; */
}
import axios from 'axios';
// const axios = require('axios');
import { showAlert } from './alerts';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    console.log(res);

    if (res.data.status === 'success') {
      showAlert('success', 'logged in sucessfuly');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    showAlert('error', 'Errpr logging out! Try Again');
  }
};
