import axios from "axios";

axios.defaults.baseURL = `${import.meta.env.VITE_BACK_URL}/api`;
axios.defaults.withCredentials = true; // Include credentials (cookies) in requests

export const getImageUrl = (imagePath) =>
  new URL(imagePath, import.meta.env.VITE_BACK_URL).toString();

export default axios;