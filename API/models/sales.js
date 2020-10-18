const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {type: String, required: true},
    actualAmount: {type: Number, required: true},
    saleAmount: {type: Number, required: true},
    profitAmount: {type: Number, required: true},
});

module.exports = mongoose.model('Sale', saleSchema);
