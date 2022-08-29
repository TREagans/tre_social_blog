// packages
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// models
const User = require("../../model/user/User");


// when creating a middleware function, we must pass the next method
const authMiddleware = expressAsyncHandler(async (req, res, next) => {

	// check whether we have a token attached 
  // to the headers that starts with "Bearer"
	if (req?.headers?.authorization?.startsWith("Bearer")) {

    try {
      // assign token to variable and then split the value (bearer) at the space
      // using split creates an array, so grab the token at the 2nd index ([1])
      const token = req.headers.authorization.split(" ")[1];

		  if (token) {

				// now that we have a token we need to verify it
				// we pass the token and our secret key to jwt's verify method
				// if this is a valid token, it will have an id, iat, and exp date
				const validToken = jwt.verify(token, process.env.JWT_SECRET);

				// find the user by id that this token belongs to.
				const tokenOwner = await User.findById(validToken?._id);

				// assign the tokenOwner to the request object's user
				req.user = tokenOwner;

				// call next middleware
				next();

			} else {
        res.status(401).json({
          success: false,
          message: "Unauthorized Access",
          error: error.message,
        });
      }
	  } catch (error) {
		  res.status(401).json({ 
        success: false, 
        message: "Unauthorized Access",
        error: error.message
      });
	  }
  }
});

module.exports = authMiddleware;