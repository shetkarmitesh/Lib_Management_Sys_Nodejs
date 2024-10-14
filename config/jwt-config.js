const express = require("express"); 
module.exports={
    secret : "librarySys",
    expiresIn : 120, //2min
    notBefore : 2, //for 2 sec
    audience : "site-users",
    issuer : "librarian",
    algorithm:"HS384"
}