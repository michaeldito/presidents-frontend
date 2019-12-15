import axios from 'axios';

// const env = process.env.NODE_ENV;
// let baseURL;

// if (env === 'prod') {
//   baseURL ='https://larry-presidents.herokuapp.com/api/v1';
// } else {
//   baseURL = 'http://localhost:8080/api/v1';
// }

let baseURL = 'https://larry-presidents.herokuapp.com/api/v1';
export default axios.create({
  baseURL,
  timeout: 3000,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  withCredentials: true
});