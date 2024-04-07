const asyncHandler = require("express-async-handler");

//@desc      GET goals
//@route     GET /api/goals
//@access    private
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: "Goals retrieved",
	});
});

//@desc      Set a goal
//@route     POST /api/goals
//@access    private
const postGoal = asyncHandler(async (req, res) => {
	const { name } = req.body;
	if (!name) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}
	res.status(201).json({ message: "goals created" });
});

//@desc      Update a goal
//@route     PUT /api/goals/:id
//@access    private
const updateGoal = asyncHandler(async (req, res) => {
	const id = req.params.id;

	res.status(200).json({
		message: `Goal updated with ID: ${id}`,
	});
});

//@desc      Delete a goal
//@route     DELETE /api/goals/:id
//@access    private
const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: `Goal deleted with ID: ${req.params.id}`,
	});
});

module.exports = { getGoals, postGoal, updateGoal, deleteGoal };
