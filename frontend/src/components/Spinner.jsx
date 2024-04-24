import React from "react";
import { ImSpinner9 } from "react-icons/im";

const Spinner = () => {
	return (
		<div className="w-full h-[80vh] flex justify-center items-center flex-col">
			<div className="animate-spin">
				<ImSpinner9 size={30} className="text-indigo-600" />
			</div>
		</div>
	);
};

export default Spinner;
