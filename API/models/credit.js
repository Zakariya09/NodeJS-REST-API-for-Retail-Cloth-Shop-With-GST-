const mongoose = require('mongoose');

const creditSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    date: String,
    creditAmount: {type: Number, required: true},
    paidAmount: {type: Number, required: true},
    remainingAmount: {type: Number, required: true}
});

module.exports = mongoose.model('Credit', creditSchema);
