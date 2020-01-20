import axios from "../../config/axios";
import { LOGIN } from "../../actions/constants";
import { successNotification, errorNotification } from "../../actions";

export function _login(username, password) {
  const request = axios.put(`users/login`, { username, password });

  return {
    type: LOGIN,
    payload: request
  };
}

export function login(username, password) {
  return async (dispatch, getState) => {
    try {
      await dispatch(_login(username, password));
      dispatch(successNotification("Log In Successful", "Welcome back!"));
    } catch (err) {
      dispatch(errorNotification("Log In Failed", err.response.data));
    }
  };
}
