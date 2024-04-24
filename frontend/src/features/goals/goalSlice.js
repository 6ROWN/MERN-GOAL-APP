import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
	goals: [],
	loading: false,
	error: "",
};

//create goal
export const createGoal = createAsyncThunk(
	"goals/createGoal",
	async (arg, { rejectWithValue, getState }) => {
		try {
			const { token } = getState().auth.user; // Assuming user token is stored in state.user
			const response = await goalService.createGoal(arg, token);
			return response;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Failed to create goal"
			);
		}
	}
);

//Get all goals
export const getGoals = createAsyncThunk(
	"allGoals/getGoals",
	async (_, { rejectWithValue, getState }) => {
		try {
			const { token } = getState().auth.user; // Assuming user token is stored in state.user
			const response = await goalService.getGoals(token);
			return response;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Failed to get goals"
			);
		}
	}
);

//Delete goals
export const deleteGoal = createAsyncThunk(
	"goals/deleteGoal",
	async (arg, { rejectWithValue, getState }) => {
		try {
			const { token } = getState().auth.user; // Assuming user token is stored in state.user
			const response = await goalService.deleteGoal(arg, token);
			return response;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Failed to create goal"
			);
		}
	}
);

const goalSlice = createSlice({
	name: "goals",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(createGoal.pending, (state) => {
				state.loading = true;
			})
			.addCase(createGoal.fulfilled, (state, action) => {
				state.goals.goals.push(action.payload.goal);
				state.loading = false;
				state.error = "";
			})
			.addCase(createGoal.rejected, (state, action) => {
				state.loading = false;
				state.goals = [];
				state.error = action.error.message || "Failed to create goal";
			})

			//GET ALL GOALS
			.addCase(getGoals.pending, (state) => {
				state.loading = true;
			})
			.addCase(getGoals.fulfilled, (state, action) => {
				state.loading = false;
				state.goals = action.payload;
				state.error = "";
			})
			.addCase(getGoals.rejected, (state, action) => {
				state.loading = false;
				state.goals = [];
				state.error = action.error.message || "Failed to create goal";
			})

			//Delete goals
			.addCase(deleteGoal.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteGoal.fulfilled, (state, action) => {
				state.loading = false;
				state.goals.goals = state.goals.goals.filter(
					(goal) => goal._id !== action.payload.id
				);
				state.error = "";
			})

			.addCase(deleteGoal.rejected, (state, action) => {
				state.loading = false;
				state.goals = [];
				state.error = action.error.message || "Failed to create goal";
			});
	},
});

export const {} = goalSlice.actions;

export default goalSlice.reducer;
