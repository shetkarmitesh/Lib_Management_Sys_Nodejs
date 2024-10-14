const express = require("express");
const { createUser, loginUser } = require("../controllers/userController");
const routes = express.Router();

routes.post("/user/signup",createUser)
routes.post("/user/login",loginUser)

module.exports = routes