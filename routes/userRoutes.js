// import npm packages
const express = require("express");

const {
	userRegister,
	userLogin,
	fetchAllUsers,
	deleteUser,
  fetchUser,
} = require("../controllers/userController");

const router = express();

// REGISTER => POST: /api/users/register
router.post("/register", userRegister);

// LOGIN => POST: /api/users/login
router.post("/login", userLogin);

// FETCH ALL USERS => POST: /api/users
router.get("/", fetchAllUsers);

// DELETE USER => POST: /api/users/delete/id
router.delete("/delete/:id", deleteUser);

// FETCH USER => POST: /api/users/id
router.get("/:id", fetchUser);

module.exports = router;