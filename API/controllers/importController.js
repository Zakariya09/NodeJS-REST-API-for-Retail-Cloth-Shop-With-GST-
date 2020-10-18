const mongoose = require('mongoose');
const Import = require('../models/import');

exports.saveImport = (req, res, next)=>{
    const importData = new Import({
        _id : mongoose.Types.ObjectId(),
        date: req.body.date,
        amount: req.body.amount,
        description: req.body.description,
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

exports.getImport = (req, res, next) =>{
    Import.find().select('date amount description')
    .exec()
    .then(docs =>{
        if(docs.length > 0){
            const response = {
                status: true,
                data: docs.map(doc =>{
                    return{
                        date: doc.date,
                        amount: doc.amount,
                        description: doc.description,
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

exports.updateImport =  (req, res, next)=>{
    id = req.params.packageID;
    // Product.update({_id:id}, {$set:{name: req.body.newName, price: req.body.newPrice}}); //to update both values of object
    const updateOps = {
        date: req.body.date,
        amount: req.body.amount,
        description: req.body.description
    };
    // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // } 
    // Import.update({_id:id}, {$set: updateOps})
    Import.findByIdAndUpdate(id, {$set: updateOps}, {new: true})
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

exports.deleteImport = (req, res, next)=>{
    id = req.params.id;
    Import.deleteOne({_id:id})
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
