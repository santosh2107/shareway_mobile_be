const express = require("express");
const user_route = express.Router();
const { user_signUp, user_login } = require("../controllers/userController");



user_route.post("/signUp", user_signUp);
user_route.post("/signIn", user_login);


module.exports = user_route;
