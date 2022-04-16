import axios from 'axios';

export default axios.create({
  baseURL: 'https://api-nodejs-todolist.herokuapp.com',
  headers: {
    'Content-type': 'application/json',
  },
});
