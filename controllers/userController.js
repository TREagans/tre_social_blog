const User = require('../model/user/User');

const userRegister = async (req, res) => {

  try {
    // check if user already exists
    const userExist = await User.findOne({ email: req?.body?.email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }


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
    res.status(201).json({
		success: false,
		message: "Failed to register new user.",
    error: error.message
	});
  }
   
};


module.exports = {
  userRegister
}