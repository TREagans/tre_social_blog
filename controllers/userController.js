const expressAsyncHandler = require('express-async-handler');

const User = require('../model/user/User');

// register controller
const userRegister = expressAsyncHandler(async (req, res) => {

  // check if user already exists
  const userExist = await User.findOne({ email: req?.body?.email });

  if (userExist) throw new Error("An account with that email address already exists.");

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
const userLogin = async (req, res) => {

  console.log(req.body);
}


module.exports = {
  userRegister
}