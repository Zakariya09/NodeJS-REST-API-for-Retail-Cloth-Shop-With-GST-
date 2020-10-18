const mongoose = require('mongoose');
const Sale = require('../models/sales');


exports.saveSale = (req, res, next)=>{
    const saleData = new Sale({
        _id : mongoose.Types.ObjectId(),
        date: req.body.date,
        actualAmount: req.body.actualAmount,
        saleAmount: req.body.saleAmount,
        profitAmount: req.body.profitAmount,
    });
    saleData.save().then(result =>{
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

exports.getSale = (req, res, next) =>{
    Sale.find().select('date actualAmount saleAmount profitAmount')
    .exec()
    .then(docs =>{
        if(docs.length > 0){
            const response = {
                status: true,
                data: docs.map(doc =>{
                    return{
                        date: doc.date,
                        actualAmount: doc.actualAmount,
                        saleAmount: doc.saleAmount,
                        profitAmount: doc.profitAmount,
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

exports.updateSale = (req, res, next)=>{
    id = req.params.saleID;
    // Product.update({_id:id}, {$set:{name: req.body.newName, price: req.body.newPrice}}); //to update both values of object
    const updateOps = {
        date: req.body.date,
        actualAmount: req.body.actualAmount,
        saleAmount: req.body.saleAmount,
        profitAmount: req.body.profitAmount
    };
    // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // } 
    // Sale.update({_id:id}, {$set: updateOps})
    Sale.findByIdAndUpdate(id, {$set: updateOps}, {new: true})
    .exec()
    .then(result => {
        res.status(200).json({
            status: true,
            message: 'Record updated successfully!',
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }); 
    
};

exports.deleteSale = (req, res, next)=>{
    id = req.params.id;
    Sale.deleteOne({_id:id})
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
}