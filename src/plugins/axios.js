import axios from "axios";

const api = axios.create({ baseURL: "https://todo.api.devcode.gethired.id" });

export default api;
