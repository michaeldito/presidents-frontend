import axios from 'axios';

module.exports = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 1000,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  withCredentials: true
});