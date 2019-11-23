import axios from 'axios';

export default axios.create({
  // baseURL: 'https://larry-presidents.herokuapp.com/api/v1',
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 3000,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  withCredentials: true
});