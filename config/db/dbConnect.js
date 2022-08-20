const mongoose = require("mongoose");

const connectDB = async () => {

  // database connection options
  const connectOptions = {
		useUnifiedTopology: true,
		useNewUrlParser: true,
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, connectOptions);

    console.log("[SUCCESS]: Successfully connected to database");
  } catch (error) {
    console.log(`[FAIL]: Failed to connect to database`);
    console.log(`Error: ${error.message}`);
  }
}

module.exports = connectDB;