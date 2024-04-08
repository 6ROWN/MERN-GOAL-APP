const router = require("express").Router();
const {
	getGoals,
	postGoal,
	updateGoal,
	deleteGoal,
} = require("../controllers/goalControllers");
const { verifyToken } = require("../middleware/authToken");

router.use(verifyToken);

// Handling routes for the base URL ("/")
router.route("/").get(getGoals).post(postGoal);

// Handling routes with dynamic IDs ("/:id")
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
