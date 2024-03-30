import axios from 'axios';
const { REACT_APP_SERVER } = process.env;


const API_URL = `${REACT_APP_SERVER}/api/recipes`

const getRecipe = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`)
    
    return response.data
}

const recipeService = {
    getRecipe,
}

export default recipeService