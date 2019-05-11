import axios from 'axios';

export const LOGIN_USER = 'LOGIN_USER';

export function loginUser(payload) {
  const request = axios.get(`/login`, payload);

  return {
    type: LOGIN_USER,
    payload: request
  }
}

