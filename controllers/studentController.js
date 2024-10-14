const studentModel = require("../models").students;
const bcrypt = require("bcrypt");
const { Op, where } = require("sequelize");

exports.addStudent = async function (req,res) {
    // fetch data
        let name = req.body.first_name;
        let email = req.body.email;
        let mobile_no = req.body.mobile_no;
        let branch= req.body.branch;
        let rollno= req.body.rollno;
        let PRN= req.body.PRN;
        let status = req.body.status;
        
        // before creating new user check user with email exists
            
        studentModel.findOne({
                where:{
                    [Op.or]:[{email:email},{PRN:PRN,}]
                    // email:email
                }
            }).then((student)=>{
                if(student){
                    // send status code 400 for data already exists
                    res.status(400).json({
                        status:0,
                        message:"Student with exists"
                    })
                }else{
                    const student=studentModel.create({
                        name:name,
                        email:email,
                        mobile_no:mobile_no,
                        PRN:PRN,
                        branch:branch,
                        rollno:rollno,
                        status:status
                    }).then((response)=>{
                        res.status(201).json({
                            status:1,
                            message:"Student Created Successsfully",
                            data: student
                        }).catch((error)=>{
                            res.status(500).json({
                                status:0,
                                message:"Internal Server Error"
                            })
                        })
                    })
                }
            }).catch((error)=>{
                res.status(500).json({
                    status:0,
                    message:"something went wrong",
                    error:error.message
                })
                console.log(error);
                
            })
            
       
        
    }

exports.inactiveStudent = async function (req,res) {
    // fetch data
        let PRN= req.body.PRN;
        let status = req.body.status;
      
        studentModel.findOne({
                where:{
                    PRN:PRN
                }
            }).then((student)=>{
                if(student){
                    const student=studentModel.update({
                        status:status
                    },{
                        where:{PRN:PRN}
                    }).then((response)=>{
                        res.status(201).json({
                            status:1,
                            message:"User Status updated Successsfully",
                            data: student
                        }).catch((error)=>{
                            res.status(500).json({
                                status:0,
                                message:"Internal Server Error"
                            })
                        })
                    })
                   
                }else{
                     // send status code 400 for data does not exists
                     res.status(400).json({
                        status:0,
                        message:"User does not exists"
                    })
                }
            }).catch((error)=>{
                res.status(500).json({
                    status:0,
                    message:"something went wrong",
                    error:error.message
                })
                console.log(error);
                
            })
            
    }

exports.updateStudent = async function (req,res) {
    // fetch data
        let name = req.body.name;
        let email = req.body.email;
        let mobile_no = req.body.mobile_no;
        let branch = req.body.branch;
        let PRN = req.body.PRN;
        
        
        // before creating new user check user with email exists
            
        studentModel.findOne({
                where:{
                    PRN:PRN
                }
            }).then((student)=>{
                if(student){
                    const student=studentModel.update({
                        name:name,
                        email:email,
                        mobile_no:mobile_no,
                        branch:branch,
                    },{
                        where:{PRN:PRN}
                    }).then((response)=>{
                        res.status(201).json({
                            status:1,
                            message:"Student information updated Successsfully",
                            data: student
                        }).catch((error)=>{
                            res.status(500).json({
                                status:0,
                                message:"Internal Server Error"
                            })
                        })
                    })
                    
                }else{
                    
                    res.status(400).json({
                        status:0,
                        message:"Student deos not exists"
                    })
                }

            }).catch((error)=>{
                res.status(500).json({
                    status:0,
                    message:"something went wrong",
                    error:error.message
                })
                console.log(error);
                
            })
            
       
        
    }

exports.displayStudent = async function (req,res) {
        
            
        studentModel.findAll().then((students)=>{
                    res.status(200).json({
                        status:1,
                        message:"User Data fetched Successsfully",
                        data: students
                    })
                }).catch((error)=>{
                res.status(500).json({
                    status:0,
                    message:"something went wrong",
                    error:error.message
                })
                console.log(error);
                
            })
            
       
        
    }