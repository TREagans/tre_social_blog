const jwt = require('jsonwebtoken');

const generateToken = id => {

  // create a JWT token from: payload, secret key, options
  // the payload is what we use from the user to track them 
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

module.exports = generateToken;