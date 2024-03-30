import axios from "axios";

const API_URL = "http://localhost:3333/api/users";

const createUser = async (userData) => {
	console.log("sending info to create user to db", userData);
	const response = await axios.post(`${API_URL}/signup`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

	return response.data;
};

const login = async (userData) => {
	console.log("sending info to login to db", userData);
	const response = await axios.post(`${API_URL}/login`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

	return response.data;
};

export const logout = async () => {
    console.log("logging out...")
    localStorage.removeItem('user')
}

const authService = {
	createUser,
    login,
    logout
};

export default authService;
