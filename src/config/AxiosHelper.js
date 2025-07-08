fetch("https://chat-app-backend-qmgt.onrender.com/api/some-endpoint")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));


import axios from "axios";
export const baseURL = "https://chat-app-backend-qmgt.onrender.com/api/some-endpoint";
export const httpClient = axios.create({
  baseURL: baseURL,
});
