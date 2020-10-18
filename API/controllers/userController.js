const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.userSignup = (req, res, nex) =>{
    User.find({userName: req.body.userName})
    .exec()
    .then(user =>{
        if(user.length >= 1){
            res.status(409).json({
                message: 'User already exist!'
            })
        } else{
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                if(err){
                    res.status(500).json({
                        error: err
                    })
                } else{ 
                 const user = new User({
                 _id : new mongoose.Types.ObjectId(),
                 userName: req.body.userName,
                 password:hash
                })
                user.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({ 
                        status: true,
                        message: 'User created!'
                        
                    });
                })
                .catch(err =>{
                 res.status(500).json({ 
                     error: err
                     
                 })
                });
                 };
         });
        }
    })
};

exports.userLogin = (req, res, next) =>{
    User.find({ userName: req.body.userName})
    .exec()
    .then(user =>{
        if(user.length < 1){
           return res.status(401).json({
                message: 'Invalid username or password!'
            });
        }
        console.log('test' + user[0].password)
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err){
            return  res.status(401).json({
                    message: 'Invalid username or password!'
                })
            }
            if(result){
              const token =  jwt.sign(
                  {
                    userName: user[0].userName,
                    userId: user[0]._id
                },
                 process.env.JWT_KEY,
                 {
                     expiresIn: "10h"
                 });
                 
                return  res.status(200).json({
                    status: true,
                    message: 'Login success!',
                    token: token
                })
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    });
};

exports.userDelete = (req,res, next) =>{
    User.deleteOne({_id: req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({
            status: true,
            message: 'User deleted successfully!'
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    }) 
};

exports.getUsers = (req, res, next) =>{
    User.find().select('userName password')
    .exec()
    .then(docs =>{
        if(docs.length > 0){
            const response = {
                status: true,
                data: docs.map(doc =>{
                    return{
                        userName: doc.userName,
                        password: doc.password,
                        _id : doc._id
                    }
                })
            };
            res.status(200).json(response);
        }
        else{
            res.status(404).json({
                message: 'No record found!'
            })
        }
    })
    .catch(err=>{
        res.status(505).json({
            error: err
        })
    });
};


exports.updateUser = (req, res, next)=>{
    id = req.params._id;
    // Product.update({_id:id}, {$set:{name: req.body.newName, price: req.body.newPrice}}); //to update both values of object
    const updateOps = {
        date: req.body.userName,
        actualAmount: req.body.password,
    };
    // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // } 
    // Sale.update({_id:id}, {$set: updateOps})
    User.findByIdAndUpdate(id, {$set: updateOps}, {new: true})
    .exec()
    .then(result => {
        res.status(200).json({
            status: true,
            message: 'User updated successfully!',
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }); 
};
