const mongoose = require('mongoose');
const receiptSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String},
    receiptDate: {type:String},
    taxableAmount: {type:Number},
    mobileNumber: {type:String},
    cgst: {type:Number},
    sgst: {type:Number},
    grandTotal: {type:Number},
    gst:{type:Number},
    products: [{
        customerName: {type:String},
        productName: {type:String},
        quantity: {type:String},
        receiptDate: {type:String},
        rate: {type:String},
        taxableAmount: {type:Number},
        gst: {type:Number},
        cgst: {type:Number},
        sgst: {type:Number},
        igst: {type:Number},
        total: {type:Number},
    }],
});

module.exports = mongoose.model('Receipt', receiptSchema);