import axios from "axios";
const { REACT_APP_SERVER } = process.env;

const API_URL = `${REACT_APP_SERVER}/api/recipes`

const getUser = async (id) => {
	const response = await axios.get(`${API_URL}/${id}`);
	return response.data;
};

const userService = {
	getUser,
};

export default userService;
