import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recipeService from "./recipeService";

const initialState = {
	data: {
		name: "",
		ingredients: [],
		steps: [],
		image: "",
		category: "",
	},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const getRecipe = createAsyncThunk(
	"recipe/getOne",
	async (id, thunkAPI) => {
		try {
			return await recipeService.getRecipe(id);
		} catch (error) {
			const message = error.response.data
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const recipeSlice = createSlice({
	name: "recipe",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getRecipe.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRecipe.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.data = action.payload;
			})
			.addCase(getRecipe.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});
export const { reset } = recipeSlice.actions;
export default recipeSlice.reducer;
