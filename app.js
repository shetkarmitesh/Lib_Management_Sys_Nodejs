const express = require("express")
const sequelize = require("sequelize")
const bodyParser = require("body-parser")
const JWT = require("jsonwebtoken");

const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const bookRoutes = require("./routes/bookRoutes");
const issued_books_recordsRoutes = require("./routes/issued_book_recordRoutes");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 8888;
app.use(bodyParser.json());

app.use("/",userRoutes);
app.use("/",bookRoutes);
app.use("/",studentRoutes);
app.use("/",issued_books_recordsRoutes);


app.listen(PORT,()=>{
    console.log("Application is running");
    
})