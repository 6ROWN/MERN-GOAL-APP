import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

//Register a new user
const register = async (userData) => {
	try {
		const response = await axios.post(API_URL, userData);
		if (response.data) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	} catch (error) {
		throw error;
	}
};

//Login  user
const login = async (userData) => {
	try {
		const response = await axios.post(
			`http://localhost:5000/api/users/login`,
			userData
		);
		if (response.data) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	} catch (error) {
		throw error;
	}
};

//Logout user
const logout = async () => {
	localStorage.removeItem("user");
};

const authService = {
	register,
	login,
	logout,
};

export default authService;
