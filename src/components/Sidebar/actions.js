import axios from "../../config/axios";
import {
  LOGOUT,
  GET_GAMES_TO_JOIN,
  GET_SCHEMAS
} from "../../actions/constants";

export const logout = () => {
  return {
    type: LOGOUT
  };
};
export const getGamesToJoin = () => {
  const request = axios.get(`/presidents/details`);

  return {
    type: GET_GAMES_TO_JOIN,
    payload: request
  };
};

export const getSchemas = () => {
  const request = axios.get(`/`);

  return {
    type: GET_SCHEMAS,
    payload: request
  };
};

export const getConfigNames = () => {
  const request = axios.get(`/gameConfigurations`);

  return {
    type: "GET_CONFIG_NAMES",
    payload: request
  };
};
