const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

//@desc      GET goals
//@route     GET /api/goals
//@access    private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ userId: req.user.id });
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

	const goal = await Goal.create({ userId: req.user.id, text });
	res.status(201).json({ goal });
});

//@desc      Update a goal
//@route     PUT /api/goals/:id
//@access    private
const updateGoal = asyncHandler(async (req, res) => {
	const id = req.params.id;

	// Check if id parameter exists
	if (!id) {
		res.status(400);
		throw new Error("Goal ID is missing");
	}
	const goal = await Goal.findById(id);

	if (!goal) {
		res.status(404);
		throw new Error(`Goal not found with ID: ${id}`);
	}

	// Check if the user is authorized to update the goal
	if (goal.userId.toString() !== req.user.id) {
		res.status(403);
		throw new Error("You are not authorized to update the goal");
	}

	const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	res.status(200).json({
		message: `Goal updated with ID: ${id}`,
		updatedGoal,
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

	if (goal.userId.toString() !== req.user.id) {
		res.status(403);
		throw new Error("You are not authorized to update the goal");
	}

	// Delete the goal
	await goal.deleteOne();

	res.status(200).json({
		message: `Goal deleted with ID: ${req.params.id}`,
	});
});

module.exports = { getGoals, postGoal, updateGoal, deleteGoal };
