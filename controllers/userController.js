const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const User = require('../model/user/User');
const generateToken = require('../config/token/generateToken');

// register controller
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
      password: req?.body?.password
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully...',
      user
    });

  } catch (error) {
    res.status(500).json({
		success: false,
		message: "Failed to register new user.",
    error: error.message
	});
  }
});


// login controller
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
        id: userExist?.id,
        firstName: userExist?.firstName,
        lastName: userExist?.lastName,
        email: userExist?.email,
        profilePhoto: userExist?.profilePhoto,
        isAdmin: userExist?.isAdmin,
        token: generateToken({ id: userExist?.id })
      }
    });
    
    

  } catch (error) {
    res.status(500).json({
		success: false,
		message: "Login credentials are invalid.",
		error: error?.message,
	});
  }
});

module.exports = {
  userRegister, userLogin
}