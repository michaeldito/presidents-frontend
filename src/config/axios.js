import axios from "axios";

let baseURL = "https://larry-presidents.herokuapp.com/api/v1";
baseURL = "http://localhost:8080/api/v1";
export default axios.create({
  baseURL,
  timeout: 5000,
  headers: { "X-Requested-With": "XMLHttpRequest" },
  withCredentials: true
});
