import React from "react";
import { GoGoal } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, logout } from "../features/auth/authSlice";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const { user, isAuthenticated } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout());
		dispatch(resetUser());
		navigate("/");
	};

	return (
		<header className="bg-indigo-600 text-white p-4  w-full">
			<div className="mx-auto max-w-7xl flex justify-between items-center bg-indigo-600">
				{/* Logo and title */}

				<div className="flex justify-center items-center space-x-2">
					<GoGoal size={28} />
					<span className="text-base font-bold text-gray-200">
						GoalSetter
					</span>
				</div>

				{/* Sign-in and register buttons */}
				<div>
					{!isAuthenticated ? (
						<div className="flex flex-row space-x-8">
							<button
								onClick={() => navigate("/login")}
								className="bg-white hover:bg-[#d8d8d8] text-[#002072] font-semibold py-2 px-4 rounded-lg "
							>
								Sign In
							</button>
							<button
								onClick={() => navigate("/register")}
								className="bg-indigo-800 hover:border-white border-transparent border text-white font-semibold py-2 px-4 rounded-lg"
							>
								Register
							</button>
						</div>
					) : (
						<button
							onClick={onLogout}
							className="bg-indigo-800 hover:border-white border-transparent border text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2"
						>
							<CgLogOut size={20} />
							<span>Logout</span>
						</button>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
