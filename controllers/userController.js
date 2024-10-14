const userModel = require("../models").users;
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { emit } = require("nodemon");
const { where } = require("sequelize");
const JWTConfig= require("../config/jwt-config");
const jwtConfig = require("../config/jwt-config");
exports.createUser = async function (req,res) {
// fetch data
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let mobile_no = req.body.mobile_no;
    let status = req.body.status;
    // encrypt or hashed the password
    let password = await bcrypt.hash(req.body.password,10);
    
    
    // before creating new user check user with email exists
        
        userModel.findOne({
            where:{
                email:email
            }
        }).then((user)=>{
            if(user){
                
                // send status code 400 for data already exists
                res.status(400).json({
                    status:0,
                    message:"User with this email exists"
                })
            }else{
                const user=userModel.create({
                    first_name:first_name,
                    last_name:last_name,email:email,
                    mobile_no:mobile_no,
                    password:password,
                    status:status
                }).then((response)=>{
                    res.status(201).json({
                        status:1,
                        message:"User Created Successsfully",
                        data: user
                    }).catch((error)=>{
                        res.status(500).json({
                            status:0,
                            message:"Internal Server Error"
                        })
                    })
                })
            }
        })
        
   
    
}
exports.loginUser = async function (req,res) {

    let username = req.body.username;
    let password = req.body.password;

    // how to check wherther requested body is empty 
    
    try {
        userModel.findOne({
            where:{
                email:username
            }
        }).then((user)=>{
            // if user exists
            if (user) {
                // password validation
                if(bcrypt.compareSync(password,user.password)){
                    // token creation
                    let userToken = JWT.sign({
                        email:username,
                        id:user.id
                    },JWTConfig.secret,{
                        expiresIn:JWTConfig.expiresIn,
                        notBefore:JWTConfig.notBefore,
                        audience:JWTConfig.audience,
                        issuer:JWTConfig.issuer,
                        algorithm:JWTConfig.algorithm
                    })

                    res.status(200).json({
                        status:1,
                        message:"User login successfully",
                        token:userToken
                    })
                }else{
                    // password wrong
                    res.status(401).json({
                        status:0,
                        message:"Invalid Credentails"
                    })
                }
                
            } else {
                // user does not exists
                res.status(404).json({
                    status:0,
                    message:"User does not exists"
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            status:0,
            message:"Something went wrong"
        })
    }
    
    
}