import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
	data: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const register = createAsyncThunk(
	"auth/signup",
	async (userData, thunkAPI) => {
		try {
			return await authService.createUser(userData);
		} catch (error) {
			const message = error.response.data;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message = error.response.data;
		return thunkAPI.rejectWithValue(message);
	}
});

export const logout = createAsyncThunk("auth/logout", async () => {
	await authService.logout();
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.data = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.data = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(logout.fulfilled, (state) => {
				state.data = null;
			});
	},
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
