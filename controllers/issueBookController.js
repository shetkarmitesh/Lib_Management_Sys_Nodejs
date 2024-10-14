const issueBookModel = require("../models").issued_books_records;
const bookModel = require("../models").books;
const studentModel = require("../models").students;

const bcrypt = require("bcrypt");
const { Op, where } = require("sequelize");

exports.issueBook = async function (req,res) {
    // fetch data
        let Bookid = req.body.book_id
        let PRN = req.body.PRN;
        const today = new Date();
        let issuedDate = today.toISOString().split('T')[0];
        let expected_return_date =  new Date(today.getTime()+7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        // before creating new user check user with email exists
        studentModel.findOne({
            where:{
                PRN:PRN
            }
        }).then((student)=>{
            if (student){
                bookModel.findOne({
                    where:{
                        book_id:Bookid,
                        status:"available"
                    }
                }).then((issuebook)=>{
                    if(issuebook){
                        // send status code 400 for data already exists
                        const issuedBook=issueBookModel.create({
                            book_id:issuebook.id,
                            student_id:student.id,
                            status:"issued",
                            issued_date:issuedDate,
                            expected_return_date:expected_return_date
                        }).then((response)=>{
                            bookModel.update({status:"not available"},{
                                where:{
                                    book_id:Bookid,
                                    status:"available"
                                }
                            }).then(()=>{
                                res.status(201).json({
                                    status:1,
                                    message:"Issued Book Successsfully",
                                })
                            })
                           
                        }).catch((errors)=>{
                            res.status(500).json({
                                status:0,
                                message:"Failed to issued book",
                                error:errors.message
                            })
                        })
                    }else{
                        res.status(400).json({
                            status:0,
                            message:"Book does not available"
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
            }else{
                res.status(400).json({
                    status:0,
                    message:"student not found"
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

exports.returnBook = async function (req,res) {
    // fetch data
    let Bookid = req.body.book_id
    let PRN = req.body.PRN;
    const today = new Date();
    let actual_return_date = today.toISOString().split('T')[0];


       studentModel.findOne({
            where:{
                PRN:PRN
            }
        }).then((student)=>{
            if (student){
                bookModel.findOne({
                    where:{
                        book_id:Bookid,
                    }
                }).then((issuebook)=>{
                    if(issuebook){
                        issueBookModel.findOne({
                            where:{
                                student_id:student.id,
                                book_id:issuebook.id,
                                status:"issued",
                            }
                        }).then((issuedBook)=>{
                            // penulty calculation
                            let penulty = 0;
                            if(actual_return_date>issuedBook.expected_return_date){
                                let date2 = moment(expected_return_date);
                                let date1 = moment(issuedBook.expected_return_date);
                                let differenceInDays = date2.diff(date1, 'days');
                                
                                penulty = differenceInDays*5;
                                
                            }
                            const returnBook=issueBookModel.update({
                                status:"returned",
                                actual_return_date:actual_return_date,
                                penulty:penulty
                            },{
                                where:{
                                    book_id:issuebook.id,
                                    student_id:student.id
                                }
                            }).then((response)=>{
                                bookModel.update({status:"available"},{
                                    where:{
                                        book_id:Bookid,
                                    }
                                }).then(()=>{
                                    res.status(201).json({
                                        status:1,
                                        message:"Returned Book Successsfully",
                                    })
                                })
                            
                            }).catch((errors)=>{
                                res.status(500).json({
                                    status:0,
                                    message:"Failed to returned book",
                                    error:errors.message
                                })
                            })

                            }).catch((errors)=>{
                                res.status(500).json({
                                    status:0,
                                    message:"Failed to returned book",
                                    error:errors.message
                                })
                            })
                            
                        
                    }else{
                        res.status(400).json({
                            status:0,
                            message:"Book does not available"
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
            }else{
                res.status(400).json({
                    status:0,
                    message:"student not found"
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

exports.issuedBook = async function (req,res) {

        issueBookModel.findAll().then((books)=>{
                if(books){
                    res.status(200).json({
                        status:1,
                        message:"Issued Book List",
                        data:books
                    })
                    
                }else{
                    res.status(400).json({
                        status:0,
                        message:"book does not exists"
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

exports.lostBook = async function (req,res) {
        
    let Bookid = req.body.book_id
    let PRN = req.body.PRN;
    const today = new Date();
    let actual_return_date = today.toISOString().split('T')[0];


       studentModel.findOne({
            where:{
                PRN:PRN
            }
        }).then((student)=>{
            if (student){
                bookModel.findOne({
                    where:{
                        book_id:Bookid,
                    }
                }).then((issuebook)=>{
                    if(issuebook){
                        issueBookModel.findOne({
                            where:{
                                student_id:student.id,
                                book_id:issuebook.id,
                                status:"issued",
                            }
                        }).then((issuedBook)=>{
                            // penulty calculation
                            let penulty = issuebook.price;
                            
                            if(actual_return_date>issuedBook.expected_return_date){
                                let date2 = moment(expected_return_date);
                                let date1 = moment(issuedBook.expected_return_date);
                                let differenceInDays = date2.diff(date1, 'days');
                                
                                penulty = (differenceInDays*5);
                                
                            }
                            const returnBook=issueBookModel.update({
                                status:"lost",
                                actual_return_date:actual_return_date,
                                penulty:penulty
                            },{
                                where:{
                                    book_id:issuebook.id,
                                    student_id:student.id
                                }
                            }).then((response)=>{
                                bookModel.update({status:"not available"},{
                                    where:{
                                        book_id:Bookid,
                                    }
                                }).then(()=>{
                                    res.status(201).json({
                                        status:1,
                                        message:"Returned Book Successsfully",
                                    })
                                })
                            
                            }).catch((errors)=>{
                                res.status(500).json({
                                    status:0,
                                    message:"Failed to returned book",
                                    error:errors.message
                                })
                            })

                            }).catch((errors)=>{
                                res.status(500).json({
                                    status:0,
                                    message:"Failed to returned book",
                                    error:errors.message
                                })
                            })
                            
                        
                    }else{
                        res.status(400).json({
                            status:0,
                            message:"Book does not available"
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
            }else{
                res.status(400).json({
                    status:0,
                    message:"student not found"
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