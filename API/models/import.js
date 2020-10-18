const mongoose = require('mongoose');
const importSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {type:String},
    amount: {type:String},
    description: {type:String}
});

module.exports = mongoose.model('Import', importSchema);