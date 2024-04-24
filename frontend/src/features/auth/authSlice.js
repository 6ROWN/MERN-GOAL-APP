import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
	user: user ? user : null,
	isAuthenticated: false,
	loading: false,
	error: "",
};

// Register user
export const register = createAsyncThunk(
	"auth/register",
	async (arg, { rejectWithValue }) => {
		try {
			const response = await authService.register(arg);
			return response;
		} catch (error) {
			console.error("Failed to register user:", error);
			return rejectWithValue(
				error?.response?.data?.message || error.message
			);
		}
	}
);

// Login user
export const login = createAsyncThunk(
	"auth/login",
	async (arg, { rejectWithValue }) => {
		try {
			const response = await authService.login(arg);
			return response;
		} catch (error) {
			console.error("Failed to login user:", error);
			console.log(error);
			return rejectWithValue(
				error?.response?.data?.message || error.message
			);
		}
	}
);

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
	localStorage.removeItem("user");
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetUser: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			state.loading = false;
			state.error = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.error = "";
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to register user";
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.isAuthenticated = false;
			})
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = "";
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to login user";
			});
	},
});

export const { resetUser } = authSlice.actions;
export default authSlice.reducer;
