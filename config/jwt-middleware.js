const JwtConfig = require("./jwt-config");
const JWT = require('jsonwebtoken');

// check token
exports.checkToken = (req,res,next)=>{
    let userToken = req.headers["authorization"];

    if(userToken){
        JWT.verify(userToken,JwtConfig.secret,{
            algorithms:JwtConfig.algorithm
        },((err,data)=>{
            if(err){
                return res.status(500).json({
                    status:0,
                    message:"TOken is not Valid"
                })
            }else{
                req.user = data;
                next();
            }
        })
    )
    }else{
        return res.status(500).json({
            status: 0,
            message: "please provise authentication token value"

        });
    }
}