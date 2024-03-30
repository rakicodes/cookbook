import axios from "axios";
const { REACT_APP_SERVER } = process.env;

const API_URL = `${REACT_APP_SERVER}/api/users`;

const createUser = async (userData) => {
	console.log("sending info to create user to db", userData);
	const response = await axios.post(`${API_URL}/signup`, userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}

	return response.data;
};

const login = async (userData) => {
	console.log("sending info to login to db", userData);
	const response = await axios.post(`${API_URL}/login`, userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}

	return response.data;
};

export const logout = async () => {
	console.log("logging out...");
	localStorage.removeItem("user");
};

const authService = {
	createUser,
	login,
	logout,
};

export default authService;
