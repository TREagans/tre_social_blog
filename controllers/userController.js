const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../model/user/User");
const generateToken = require("../config/token/generateToken");
const validateUserId = require("../utils/validateUserId");

// -----------------------------------
// ------  USER REGISTER
// -----------------------------------
const userRegister = expressAsyncHandler(async (req, res) => {
	// check if user already exists
	const userExist = await User.findOne({ email: req?.body?.email });

	if (userExist) throw new Error("An account with that email address already exist.");

	try {
		// creates and saves a new user into the database
		const user = await User.create({
			firstName: req?.body?.firstName,
			lastName: req?.body?.lastName,
			email: req?.body?.email,
			password: req?.body?.password,
		});

		res.status(201).json({
			success: true,
			message: "User registered successfully...",
			user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to register new user.",
			error: error.message,
		});
	}
});

// -----------------------------------
// ------  USER LOGIN
// -----------------------------------
const userLogin = expressAsyncHandler(async (req, res) => {
	// destructure the incoming req.body
	const { email, password } = req.body;

	// see if user exist
	const userExist = await User.findOne({ email });
	if (!userExist) throw new Error("Login credentials are invalid.");

	try {
		// compare the user's password with the database password
		const isPasswordsMatch = await bcrypt.compare(password, userExist?.password);
		if (!isPasswordsMatch) throw new Error("Login credentials are invalid.");

		// if user exists and passwords match we log that
		// user in, and we also attach a token to the user
		res.status(200).json({
			success: true,
			message: "Login successful",
			loggedIn: {
				_id: userExist?.id,
				firstName: userExist?.firstName,
				lastName: userExist?.lastName,
				email: userExist?.email,
				profilePhoto: userExist?.profilePhoto,
				isAdmin: userExist?.isAdmin,
				token: generateToken({ id: userExist?.id }),
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Login credentials are invalid.",
			error: error?.message,
		});
	}
});

// -----------------------------------
// ------  FETCH ALL USERS
// -----------------------------------
const fetchAllUsers = expressAsyncHandler(async (req, res) => {

  try {
    // the find method returns an array of all users
		// using select we can exclude fields we want returned
	  const users = await User.find({}).select("-password");

	  res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {
    res.status(500).json({
			success: false,
			error: error.message,
		});
  }
});

// -----------------------------------
// ------  DELETE USER
// -----------------------------------
const deleteUser = expressAsyncHandler(async (req, res) => {

	// destructure ID from request params
	const { id } = req.params

	// validate user id before trying to delete the user
	validateUserId(id);

	try {
		// find user in database from the ID in the route param
		const deletedUser = await User.findByIdAndDelete(id);

		res.status(200).json({
			success: true,
			message: "User deleted successfully",
			deletedUser,
		});

	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to delete user",
			error: error.message
		});
	}
});

// -----------------------------------
// ------  FETCH SINGLE USER
// -----------------------------------
const fetchUser = expressAsyncHandler(async (req, res) => {
	
	// get ID from request params
	const { id } = req.params

	// validate user ID
	validateUserId(id);

	try {
		// using select we can exclude fields we want returned
		const user = await User.findById(id).select("-password");

		res.status(200).json({
			success: true,
			message: "User",
			user,
		});
		
	} catch (error) {
		res.status(404).json({
			success: false,
			message: "User not found",
			error: error.message,
		});
	}
});


module.exports = {
	userRegister,
	userLogin,
	fetchAllUsers,
	deleteUser,
	fetchUser,
};
