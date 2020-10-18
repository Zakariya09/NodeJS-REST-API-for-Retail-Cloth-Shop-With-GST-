const mongoose = require('mongoose');
const Receipt = require('../models/receipt');

exports.saveReceipt = (req, res, next)=>{
    const receiptData = new Receipt({
        _id : mongoose.Types.ObjectId(),
        name: req.body.name,
        receiptDate: req.body.receiptDate,
        mobileNumber: req.body.mobileNumber,
        taxableAmount: req.body.taxableAmount,
        cgst: req.body.cgst,
        sgst: req.body.sgst,
        gst: req.body.gst,
        grandTotal: req.body.grandTotal,
        products: req.body.products
    });
    receiptData.save().then(result =>{
        res.status(201).json({
            status: true,
            message: 'Receipt saved successfully!'
        })
    }).catch(err =>{
        res.status(500).json({
            error: err
        })
    })
};

exports.getReceipt =  (req, res, next) =>{
    Receipt.find().select('name receiptDate mobileNumber taxableAmount cgst sgst gst grandTotal products')
    .exec()
    .then(docs =>{
        if(docs.length > 0){
            const response = {
                status: true,
                data: docs.map(doc =>{
                    return{
                        receiptDate: doc.receiptDate,
                        name: doc.name,
                        mobileNumber: doc.mobileNumber,
                        taxableAmount: doc.taxableAmount,
                        cgst: doc.cgst,
                        sgst: doc.sgst,
                        gst: doc.gst,
                        grandTotal: doc.grandTotal,
                        products: doc.products,
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

exports.updateReceipt = (req, res, next)=>{
    id = req.params.receiptId;
    // Product.update({_id:id}, {$set:{name: req.body.newName, price: req.body.newPrice}}); //to update both values of object
    const updateOps = {
        name: req.body.name,
        receiptDate: req.body.receiptDate,
        mobileNumber: req.body.mobileNumber,
        taxableAmount: req.body.taxableAmount,
        cgst: req.body.cgst,
        sgst: req.body.sgst,
        gst: req.body.gst,
        grandTotal: req.body.grandTotal,
        products: req.body.products
    };
    // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // } 
    // Credit.update({_id:id}, {$set: updateOps})
    Receipt.findByIdAndUpdate(id, {$set: updateOps}, {new: true})
    .exec()
    .then(result => {
        res.status(200).json({
            status: true,
            message: 'Invoice updated successfully!',
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }); 
    
};

exports.deleteReceipt = (req, res, next)=>{
    id = req.params.id;
    Receipt.deleteOne({_id:id})
    .exec()
    .then(result =>{
        res.status(200).json({
            status: true,
            message: 'Receipt deleted successfull!'
        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    });
};