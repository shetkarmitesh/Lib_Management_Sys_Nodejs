const express = require("express");
const { issueBook, returnBook, issuedBook, lostBook } = require("../controllers/issueBookController");
const { checkToken } = require("../config/jwt-middleware");
const routes = express.Router();

routes.post("/book_issue/issueBook",checkToken,issueBook)
routes.post("/book_issue/returnBook",checkToken,returnBook)
routes.get("/book_issue/issuedBook",checkToken,issuedBook)
routes.post("/book_issue/lostBook",checkToken,lostBook)

module.exports = routes