import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, resetUser } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { BiSolidError } from "react-icons/bi";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthenticated, loading, error } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}

		//dispatch(resetUser());
	}, [isAuthenticated, navigate, dispatch]);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Handle form submission, e.g., submit data to backend
		// Dispatch registerUser action with form data
		try {
			dispatch(login(formData));
		} catch (error) {
			console.log("Login failed:", error);
			throw new error();
		}
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className=" h-[90vh] flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					{error && (
						<div className="bg-red-300 p-2 rounded text-red-950  flex flex-rol space-x-4 items-center justify-center">
							<BiSolidError size={24} color="#e70033" />
							<span>{error}</span>
						</div>
					)}
				</div>
				<div className="-mt-16 my-12 text-center flex flex-row justify-center items-center space-x-6 ">
					<h2 className="text-2xl font-bold text-gray-800">Login</h2>
				</div>
				<form className=" space-y-6" onSubmit={handleSubmit}>
					<input type="hidden" name="remember" defaultValue="true" />

					<div>
						<label htmlFor="email" className="sr-only">
							Email address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Email address"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="password" className="sr-only">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Login
						</button>
					</div>
					<div className="text-center text-sm">
						Don't have an account yet?{" "}
						<Link
							to="/register"
							className="text-indigo-600 hover:underline"
						>
							Register here
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
