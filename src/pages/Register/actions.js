import axios from "../../config/axios";
import { REGISTER } from "../../actions/constants";
import { successNotification, errorNotification } from "../../actions";

export function registerUser(payload) {
  const request = axios.post(`/users/register`, payload);

  return {
    type: REGISTER,
    payload: request
  };
}

export function register(payload) {
  return async (dispatch, getState) => {
    try {
      await dispatch(registerUser(payload));
      dispatch(
        successNotification("Registration Successful", "Welcome aboard!")
      );
    } catch (err) {
      dispatch(errorNotification("Registration Failed", err.response.data));
    }
  };
}
