import axios from "axios";
const { REACT_APP_SERVER } = process.env;

const API_URL = `${REACT_APP_SERVER}/api/recipes`;

const createRecipe = async (recipeData, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, recipeData, config);
  return response.data;
};

const getRecipes = async (category, search, ingredients) => {
  const response = await axios.get(
    `${API_URL}${category ? `?category=${category}` : ""}${
      search
        ? `?search=${search}`
        : ingredients
          ? `?ingredients=${ingredients}`
          : ""
    }`,
  );
  return response.data;
};

const getUserRecipes = async (id) => {
  const response = await axios.get(`${API_URL}/user/${id}`);
  return response.data;
};

const deleteRecipe = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/delete/${id}`, config);
  return response.data;
};

const editRecipe = async (id, data, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/edit/${id}`, data, config);
  return response.data;
};

const recipeService = {
  createRecipe,
  getRecipes,
  getUserRecipes,
  deleteRecipe,
  editRecipe,
};

export default recipeService;
