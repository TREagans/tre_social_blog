// import npm packages
const express = require("express");

const { userRegister } = require('../controllers/userController');

const router = express();

// REGISTER => POST: /api/user/register
router.post("/register", userRegister);


module.exports = router;