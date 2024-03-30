import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recipesService from "./recipesService";

const initialState = {
	data: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const createRecipe = createAsyncThunk(
	"recipes/create",
	async (recipeData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			return await recipesService.createRecipe(recipeData, token);
		} catch (error) {
			const message = error.response.data;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getRecipes = createAsyncThunk(
	"recipes/getAll",
	async (params, thunkAPI) => {
		try {
			if (params) {
				const { category, search, ingredients } = params;
				return await recipesService.getRecipes(category, search, ingredients);	
			} else {
				return await recipesService.getRecipes();	
			}
		} catch (error) {
			const message = error.response.data;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getUserRecipes = createAsyncThunk(
	"recipes/getUser",
	async (id, thunkAPI) => {
		try {
			return await recipesService.getUserRecipes(id);	
		} catch (error) {
			const message = error.response.data;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const deleteRecipe = createAsyncThunk(
	"recipes/delete",
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			return await recipesService.deleteRecipe(id, token);
		} catch (error) {
			const message = error.response.data;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const editRecipe = createAsyncThunk(
	"recipes/edit",
	async (editInfo, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			const { id, data } = editInfo; // recipe id
			console.log("going to recipes service....", editInfo);
			console.log("image", data.get("image"))
			return await recipesService.editRecipe(id, data, token);
		} catch (error) {
			const message = error.response.data;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(createRecipe.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createRecipe.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.data = [...state.data, action.payload];
			})
			.addCase(createRecipe.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getRecipes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRecipes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.data = action.payload;
			})
			.addCase(getRecipes.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getUserRecipes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserRecipes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.data = action.payload;
			})
			.addCase(getUserRecipes.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteRecipe.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteRecipe.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.data = state.data.filter((d) => d._id !== action.payload.id);
			})
			.addCase(deleteRecipe.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(editRecipe.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editRecipe.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.data = state.data.map((d) =>
					d._id === action.payload.id ? action.payload : d
				);
			})
			.addCase(editRecipe.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});
export const { reset } = recipesSlice.actions;
export default recipesSlice.reducer;
