const express = require("express");
const { addStudent, updateStudent, inactiveStudent, displayStudent } = require("../controllers/studentController");
const { checkToken } = require("../config/jwt-middleware");
const routes = express.Router();

routes.post("/student/addStudent",checkToken,addStudent)
routes.post("/student/inactiveStudent",checkToken,inactiveStudent)
routes.post("/student/updateStudent",checkToken,updateStudent)
routes.get("/student/displayStudent",checkToken,displayStudent)

module.exports = routes