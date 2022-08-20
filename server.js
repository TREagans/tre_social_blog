const express = require("express");

// we call express as a function and then assign it to
// a variable, because functions are 1st class citizens
const app = express();

// using the global variable from node. If there's a
// port variable, we'll use that, if not, we use 5000
const PORT = process.env.PORT || 5000;

// establish an open connection to listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port... ${5000}`);
});