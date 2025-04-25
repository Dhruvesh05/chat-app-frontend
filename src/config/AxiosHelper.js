fetch("http://localhost:8080/some-endpoint")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));


import axios from "axios";
export const baseURL = "http://localhost:8080";
export const httpClient = axios.create({
  baseURL: baseURL,
});