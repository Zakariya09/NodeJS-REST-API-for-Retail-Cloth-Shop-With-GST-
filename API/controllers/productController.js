const Product = require('../models/product');
const mongoose = require('mongoose');

exports.getProducts =  (req, res, next) =>{
    Product.find().select('name price _id productImage')
    .exec()
    .then(docs =>{
        if(docs.length >=0){
            const response = {
                status: true,
                products:docs.map( doc => {
                 return{
                     name: doc.name,
                     price: doc.price,
                     productImage: doc.productImage,
                     _id : doc._id,
                     request:{
                         type: 'GET',
                         url: 'http://localhost:3000/products/' + doc._id
                     }
                 }                   
                })
            }
        res.status(200).json(response);
        
        } else {
            res.status(404).json({
                message: 'No data found!'
            })
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    });
 }

 exports.uploadProducts = (req, res, next) =>{
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save().then(result=>        {
        res.status(201).json({
            status: true,
            message: 'Product save successfully!',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request:{
                    type: 'POST',
                    url: 'http://localhost:3000/' + result._id
                }
            }
        });
    }).catch(err => {
        console.log(err)
        res.status(500).json ({
            error: err
        })
    });
    
}

exports.getProductByID = (req, res, next)=>{
    const id = req.params.productId;
    Product.findById(id).select('name price _id productImage').exec()
    .then(doc=> {
        console.log("From database", doc);
        if(doc){
            
         res.status(200).json({
            status: true,
             data:doc,
             request:{
                 type: 'GET',
                 url: 'http://localhost:3000/products/' + doc._id
             }
         });
        }else {
            res.status(404).json({
                message: 'No data found!'
            })
        }
         })
    .catch(err=> {
             console.log(err)
            res.status(500).json({
                error: err
            })
            }
        
        );
};

exports.updateProduct =  (req, res, next)=>{
    id = req.params.productId;
    // Product.update({_id:id}, {$set:{name: req.body.newName, price: req.body.newPrice}}); //to update both values of object
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    } 
    Product.update({_id:id}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            status: true,
            message: 'Product updated successfully!',
            request: {
              type: 'POST',
              url: 'http://localhost:3000/products/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }); 
    
}

exports.deleteProduct = (req, res, next)=>{
    id = req.params.productId;
    Product.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            status: true,
            message: 'Product deleted successfully!',
            request:{
                type: 'POST',
                url: 'http://localhost:3000/products/'

            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
        
    });
}