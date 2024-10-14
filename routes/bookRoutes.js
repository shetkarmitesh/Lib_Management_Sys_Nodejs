const express = require("express");
const { addBook, removeBook, updateBook, displayBook } = require("../controllers/bookController");
const { checkToken } = require("../config/jwt-middleware");
const routes = express.Router();
// const checkToken = require("../config/jwt-middleware");

routes.post("/book/addBook",checkToken,addBook,)
routes.post("/book/removeBook",checkToken,removeBook)
routes.post("/book/updateBook",checkToken,updateBook)
routes.get("/book/displayBook",checkToken,displayBook)

module.exports = routes