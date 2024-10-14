const bookModel = require("../models").books;
const bcrypt = require("bcrypt");
const { Op, where } = require("sequelize");

exports.addBook = async function (req,res) {
    // fetch data
        let Bookid = req.body.book_id
        let Title = req.body.title;
        let Author = req.body.author;
        let Publication = req.body.publication;
        let ISBN = req.body.ISBN;
        let Price = req.body.price;
        let Status = req.body.status;
        // before creating new user check user with email exists
            
        bookModel.findOne({
                where:{
                    [Op.or]:[{title:Title},{book_id:Bookid},{ISBN:ISBN}]
                    // email:email
                }
            }).then((book)=>{
                if(book){
                    // send status code 400 for data already exists
                    res.status(400).json({
                        status:0,
                        message:"Book already exists"
                    })
                }else{
                    const book=bookModel.create({
                        book_id:Bookid,
                        title:Title,
                        author:Author,
                        ISBN:ISBN,
                        publiction:Publication,
                        price:Price,
                        status:Status

                    }).then((response)=>{
                        res.status(201).json({
                            status:1,
                            message:"Book Created Successsfully",
                            data: book
                        }).catch((error)=>{
                            res.status(500).json({
                                status:0,
                                message:"Failed to create book",
                                error:error
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

exports.removeBook = async function (req,res) {
    // fetch data
        let book_id= req.body.book_id;
        let status = req.body.status;
      
        bookModel.findOne({
                where:{
                    book_id:book_id
                }
            }).then((book)=>{
                if(book){
                    const book=bookModel.update({
                        status:status
                    },{
                        where:{book_id:book_id}
                    }).then((response)=>{
                        res.status(201).json({
                            status:1,
                            message:"Book removed Successsfully",
                        }).catch((error)=>{
                            res.status(500).json({
                                status:0,
                                message:"Failed to remvove book"
                                ,error:error
                            })
                        })
                    })
                   
                }else{
                     // send status code 400 for data does not exists
                     res.status(400).json({
                        status:0,
                        message:"Book does not exists"
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

exports.updateBook = async function (req,res) {
    // fetch data
        let book_id = req.body.book_id;
        let title = req.body.title;
        let author = req.body.author;
        let publication = req.body.publication;
        let price = req.body.price;
        let status = req.body.status;
        
        
        // before creating new user check user with email exists
            
        bookModel.findOne({
                where:{
                    book_id:book_id
                }
            }).then((book)=>{
                if(book){
                    const book =bookModel.update({
                        title:title,
                        author:author,
                        publication:publication,
                        price:price,
                        status:status
                    },{
                        where:{book_id:book_id}
                    }).then((response)=>{
                        res.status(201).json({
                            status:1,
                            message:"Book information updated Successsfully",
                            data: book
                        })
                    }).catch((error)=>{
                        res.status(500).json({
                            status:0,
                            message:"Failed to update book information"
                            ,error:error
                        })
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

exports.displayBook = async function (req,res) {
        
            
        bookModel.findAll().then((books)=>{
                    res.status(200).json({
                        status:1,
                        message:"Books Data fetched Successsfully",
                        data: books
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