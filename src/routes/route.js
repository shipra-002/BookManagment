const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController')

router.post("/register" , UserController.createUserData)

router.post("/login", UserController.loginUser)

module.exports = router;