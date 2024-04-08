const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const verifyToken = asyncHandler(async (req, res, next) => {
	let token;

	if (
		!req.headers.authorization ||
		!req.headers.authorization.startsWith("Bearer")
	) {
		res.status(401);
		throw new Error("No token provided");
	}

	// Extract token from authorization header
	token = req.headers.authorization.split(" ")[1];

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Find user associated with token
		const user = await User.findById(decoded.id);
		if (!user) {
			res.status(401);
			throw new Error("Invalid token");
		}

		// Attach user object to request for further processing
		req.user = user;
		next();
	} catch (error) {
		res.status(401);
		throw new Error("Invalid token");
	}
});

module.exports = { verifyToken };
