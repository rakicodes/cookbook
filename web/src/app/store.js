import { configureStore } from "@reduxjs/toolkit";

import recipeReducer from "../features/recipe/recipeSlice";
import recipesReducer from "../features/recipes/recipesSlice";
import userReducer from "../features/user/userSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    recipes: recipesReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
