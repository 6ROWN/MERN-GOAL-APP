const asyncHandler = require("express-async-handler");
const validator = require("validator");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Generate token
const generateToken = (id) => {
	return jwt.sign(
		{
			id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRES_IN,
		}
	);
};

//@desc     Register a new user
//@route    POST api/users/
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
	// Extract name, email, and password from request body
	const { name, email, password } = req.body;
	// Check if all required fields are provided
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}

	// Validate email format
	if (!validator.isEmail(email)) {
		res.status(400).json({ message: "Invalid email address" });
		return;
	}

	// Validate password strength
	if (!validator.isStrongPassword(password)) {
		res.status(400).json({
			message:
				"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
		});
		return;
	}

	// Check if user with the provided email already exists
	const user = await User.findOne({ email });
	if (user) {
		res.status(400).json({ message: "User already exists" });
		return;
	}

	//Generate salt
	const salt = await bcrypt.genSalt(10);

	//Hash the password
	const hashedPassword = await bcrypt.hash(password, salt);

	//Create new user
	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	res.status(201).json({
		message: "Register user",
		newUser,
		token: generateToken(newUser._id),
	});
});

//@desc     Authenticate a user
//@route    POST api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
	// Extract email and password from req.body
	const { email, password } = req.body;

	// Check if all required fields are provided
	if (!email || !password) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}

	//Find the user with the provided email in your database.
	const user = await User.findOne({ email });

	if (!user) {
		res.status(400);
		throw new Error("Invalid credentials");
	}

	// Compare the password provided with the hashed password stored in the database.
	if (!(await bcrypt.compare(password, user.password))) {
		res.status(400);
		throw new Error("Invalid credentials");
	}

	// Generate JWT token
	const token = generateToken(user._id);

	res.status(200).json({
		message: `${user.name} is logged in`,
		token,
	});
});

//@desc     GET current user data
//@route    GET api/users/me
//@access   Private
const currentUser = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
