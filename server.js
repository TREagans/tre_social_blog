// npm packages
const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db/dbConnect");

const { errorHandler, notFound } = require("./middlewares/error/errorHandler");

// we call express as a function and then assign it to
// a variable, because functions are 1st class citizens
const app = express();


// middleware
app.use(express.json());  // parses inc JSON requests


// connect to database after creating app
connectDB();


// importing routers
const userRouters = require('./routes/userRoutes');


// using routes as middleware so that with every
// incoming request, the correct endpoint will be called
app.use('/api/users', userRouters);

// call err handler middleware after all routes
app.use(notFound);
app.use(errorHandler);

// using the global variable from node. If there's a
// port variable, we'll use that, if not, we use 5000
const PORT = process.env.PORT || 5000;


// establish an open connection to listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port... ${5000}`);
});