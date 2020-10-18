const mongoose = require('mongoose');
const Credit = require('../models/credit');

exports.saveCredit = (req, res, next)=>{
    const importData = new Credit({
        _id : mongoose.Types.ObjectId(),
        name: req.body.name,
        date: req.body.date,
        creditAmount: req.body.creditAmount,
        paidAmount: req.body.paidAmount,
        remainingAmount: req.body.remainingAmount,
    });
    importData.save().then(result =>{
        res.status(201).json({
            status: true,
            message: 'Record saved successfully!'
        })
    }).catch(err =>{
        res.status(500).json({
            error: err
        })
    })
};

exports.getCredit =  (req, res, next) =>{
    Credit.find().select('name date creditAmount paidAmount remainingAmount')
    .exec()
    .then(docs =>{
        if(docs.length > 0){
            const response = {
                status: true,
                data: docs.map(doc =>{
                    return{
                        date: doc.date,
                        name: doc.name,
                        remainingAmount: doc.remainingAmount,
                        paidAmount: doc.paidAmount,
                        creditAmount: doc.creditAmount,
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

exports.updateCredit = (req, res, next)=>{
    id = req.params.creditID;
    // Product.update({_id:id}, {$set:{name: req.body.newName, price: req.body.newPrice}}); //to update both values of object
    const updateOps = {
        date: req.body.date,
        name: req.body.name,
        creditAmount: req.body.creditAmount,
        paidAmount: req.body.paidAmount,
        remainingAmount: req.body.remainingAmount,
    };
    // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // } 
    // Credit.update({_id:id}, {$set: updateOps})
    Credit.findByIdAndUpdate(id, {$set: updateOps}, {new: true})
    .exec()
    .then(result => {
        res.status(200).json({
            status: true,
            message: 'Package updated successfully!',
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }); 
    
};

exports.deleteCredit = (req, res, next)=>{
    id = req.params.id;
    Credit.deleteOne({_id:id})
    .exec()
    .then(result =>{
        res.status(200).json({
            status: true,
            message: 'Record deleted successfull!'
        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    });
};