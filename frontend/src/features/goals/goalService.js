import axios from "axios";

const API_URL = "http://localhost:5000/api/goals";

//Create goals
const createGoal = async (goalData, token) => {
	try {
		const response = await axios.post(`${API_URL}`, goalData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

//Get all goals
const getGoals = async (token) => {
	try {
		const response = await axios.get(`${API_URL}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

const deleteGoal = async (id, token) => {
	try {
		const response = await axios.delete(`${API_URL}/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

const goalService = {
	createGoal,
	getGoals,
	deleteGoal,
};

export default goalService;
