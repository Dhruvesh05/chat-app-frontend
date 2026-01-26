
import axios from "axios";
export const baseURL = "https://chat-app-backend-qmgt.onrender.com";
export const httpClient = axios.create({
  baseURL: baseURL,
});
