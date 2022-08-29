const mongoose = require("mongoose");

const validateUserId = (id) => {

  // using mongoose's Types.ObjectId.isValid method we're
  // able to get a true or false return on the id passed in
  const isValid = mongoose.Types.ObjectId.isValid(id);

  // if the ID is not valid, throw an error
  if (!isValid) throw new Error("Invalid user ID");
}

module.exports = validateUserId;