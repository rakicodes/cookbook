import axios from 'axios';

const API_URL = 'http://localhost:3333/api/recipes'

const getRecipe = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`)
    
    return response.data
}

const recipeService = {
    getRecipe,
}

export default recipeService