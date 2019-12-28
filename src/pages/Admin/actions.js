import axios from '../../config/axios';
import { GET_INSTANCE_SET, GET_INSTANCE } from '../../actions/constants'

export const getInstanceSet = service => {
  const request = axios.get(`/${service}`);

  return {
    type: GET_INSTANCE_SET,
    payload: request
  }
}


export const getInstance = (service, id) => {
  const request = axios.get(`/${service}/${id}`);

  return {
    type: GET_INSTANCE,
    payload: request
  }
}
