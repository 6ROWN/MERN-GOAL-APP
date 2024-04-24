import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGoals, createGoal, deleteGoal } from "../features/goals/goalSlice";
import { MdDeleteForever } from "react-icons/md";

const Dashboard = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { goals, loading, error } = useSelector((state) => state.goals);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [goal, setGoal] = useState("");

	const onDeleteGoal = async (id) => {
		try {
			await dispatch(deleteGoal(id));
			navigate(window.location.pathname, { replace: true });
		} catch (error) {
			throw new error();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await dispatch(createGoal({ text: goal }));
			setGoal("");
			navigate(window.location.pathname, { replace: true });
		} catch (error) {
			throw new error();
		}
	};

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		} else {
			dispatch(getGoals());
		}
	}, [isAuthenticated, navigate, dispatch]);

	return (
		<>
			<div className="max-w-lg mx-auto mt-8 bg-indigo-50 p-12 rounded-lg">
				<h1 className="text-2xl font-bold mb-6 text-center">
					Goals Form
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col space-y-6">
						<input
							type="text"
							className="flex-1 rounded-lg p-3 border-t mr-0 border-b border text-gray-800 border-gray-200 bg-white"
							placeholder="Enter your goal"
							value={goal}
							onChange={(e) => setGoal(e.target.value)}
							required
						/>
						<button
							type="submit"
							className="rounded-lg bg-indigo-600 text-white font-bold p-3 uppercase border-indigo-600 border"
							disabled={loading} // Disable the button while loading
						>
							{loading ? "Submitting..." : "Submit"}
						</button>
					</div>
				</form>
			</div>
			<div className="text-center max-w-4xl mx-auto mt-12">
				{error ? (
					<div>
						<h1>{error}</h1>
					</div>
				) : (
					<div className="container mx-auto mt-8">
						<h1 className="text-3xl font-bold my-8">
							Your Goals Collection
						</h1>
						{goals?.goals?.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{goals.goals.map((goal) => (
									<div
										key={goal._id}
										className="bg-gray-100 rounded-lg shadow-lg p-4 relative flex flex-col space-y-4"
									>
										<div className="text-sm text-gray-400">
											{new Date(
												goal.createdAt
											).toDateString()}
										</div>
										<h2 className="text-xl font-bold mb-2">
											{goal.text}
										</h2>
										<div className="absolute right-2 bottom-2">
											<div className="flex flex-row space-x-2">
												<div
													onClick={() =>
														onDeleteGoal(goal._id)
													}
													className="cursor-pointer"
												>
													<MdDeleteForever
														size={20}
														className="text-red-600"
													/>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<div>No goals in collection</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default Dashboard;
