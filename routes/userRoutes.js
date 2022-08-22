// import npm packages
const express = require("express");

const { userRegister, userLogin } = require("../controllers/userController");

const router = express();

// REGISTER => POST: /api/user/register
router.post("/register", userRegister);
router.post("/login", userLogin);


module.exports = router;