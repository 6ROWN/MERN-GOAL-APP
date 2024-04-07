const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

//@desc      GET goals
//@route     GET /api/goals
//@access    private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find();
	res.status(200).json({
		goals,
	});
});

//@desc      Set a goal
//@route     POST /api/goals
//@access    private
const postGoal = asyncHandler(async (req, res) => {
	const { text } = req.body;
	if (!text) {
		res.status(400);
		throw new Error("Text field is mandatory");
	}

	const goal = await Goal.create({ text });
	res.status(201).json({ goal });
});

//@desc      Update a goal
//@route     PUT /api/goals/:id
//@access    private
const updateGoal = asyncHandler(async (req, res) => {
	const id = req.params.id.toString(); // Convert id to string
	const goal = await Goal.findById(id);

	if (!goal) {
		res.status(404);
		throw new Error(`Goal not found with ID: ${id}`);
	}
	const updateGoal = await Goal.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	res.status(200).json({
		message: `Goal updated with ID: ${id}`,
		updateGoal,
	});
});

//@desc      Delete a goal
//@route     DELETE /api/goals/:id
//@access    private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(404);
		throw new Error(`Could not find goal with id: ${req.params.id}`);
	}

	await goal.remove();

	//const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

	res.status(200).json({
		message: `Goal deleted with ID: ${req.params.id}`,
	});
});

module.exports = { getGoals, postGoal, updateGoal, deleteGoal };
