import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://basic-burger-app.firebaseio.com/'
});

export default instance;