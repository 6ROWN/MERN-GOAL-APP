const router = require("express").Router();
const {
	registerUser,
	loginUser,
	currentUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authToken");

router.route("/").post(registerUser);

router.route("/login").post(loginUser);

// Add verifyToken middleware to the /me route
router.route("/me").get(verifyToken, currentUser);

module.exports = router;
