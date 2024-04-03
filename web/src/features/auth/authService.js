import axios from "axios";
const { REACT_APP_SERVER } = process.env;

const API_URL = `${REACT_APP_SERVER}/api/users`;

const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  createUser,
  login,
  logout,
};

export default authService;
