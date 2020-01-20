import axios from "../config/axios";
import { notification } from "antd";
import {
  GET_USER,
  SUCCESS_NOTIFICATION,
  INFO_NOTIFICATION,
  WARNING_NOTIFICATION,
  ERROR_NOTIFICATION
} from "./constants";

// NOTIFICATION

const openNotificationWithIcon = type => message => description => {
  notification[type]({
    message,
    description
  });
};

export const successNotification = (message, description) => {
  openNotificationWithIcon("success")(message)(description);

  return {
    type: SUCCESS_NOTIFICATION
  };
};

export const infoNotification = (message, description) => {
  openNotificationWithIcon("info")(message)(description);

  return {
    type: INFO_NOTIFICATION
  };
};

export const warningNotification = (message, description) => {
  openNotificationWithIcon("warning")(message)(description);

  return {
    type: WARNING_NOTIFICATION
  };
};

export const errorNotification = (message, description) => {
  openNotificationWithIcon("error")(message)(description);

  return {
    type: ERROR_NOTIFICATION
  };
};

// USER

export const getUser = id => {
  const request = axios.get(`users/${id}`);

  return {
    type: GET_USER,
    payload: request
  };
};
