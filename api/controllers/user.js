const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
/**
 ** @desc    login user
 ** @route   POST /api/users/login
 ** @access  Public
 */
const login = asyncHandler(async (req, res) => {
	try {
		console.log("user logging in...", req.body);
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400).json("Please add all fields");
		}

		// check for user email
		const user = await User.findOne({ email: email });

		if (user && (await bcrypt.compare(password, user.password))) {
			res.json({
				_id: user.id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(400).json("Invalid credentials");
		}
	} catch (error) {
		console.log(error);
		res.status(200).json("Sorry something went wrong. Couldn't log in");
	}
});

/**
 ** @desc    register new user
 ** @route   POST /api/users
 ** @access  Public
 */
const signup = asyncHandler(async (req, res) => {
	try {
		console.log("adding user to db...", req.body);

		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			res.status(400).json("Please add all fields");
			return;
		}

		// check if valid email
		if (!validateEmail(email)) {
			res.status(400).json("Invalid email");
			return;
		}

		// password length
		if (password.length <= 5) {
			res.status(400).json("Password must be at least 6 characters");
			return;
		}

		const userExists = await User.findOne({ email });
		if (userExists) {
			res.status(400).json("User already exists");
			return;
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			name,
			email,
			password: hashPassword,
		});

		if (user) {
			res.status(201).json({
				_id: user.id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(400).json("Invalid user data");
			return;
		}
	} catch (error) {
		console.log(error);
		res.status(400).json("Sorry something went wrong. Couldn't sign up");
	}
});
/**
 ** @desc    get user
 ** @route   GET /api/users/:id
 ** @access  Public
 */
const getUser = asyncHandler(async (req, res) => {
	try {
		console.log("getting user...", req.params.id);

		const user = await User.findById(req.params.id);

		if (user) {
			res.status(200).json(user);
		} else {
			res.status(400).json("Sorry user does not exist");
		}
	} catch (error) {
		console.log(error);
		res.status(400).json("Sorry user does not exist");
	}
});

module.exports = {
	login,
	signup,
	getUser,
};

// Generate JWT token - sign a new token w the id + secret which will expire in 30 days
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

// validate email
const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
