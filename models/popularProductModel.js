const mongoose = require('mongoose')

const popularProductSchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },


})

module.exports = mongoose.model('PopularProduct', popularProductSchema);