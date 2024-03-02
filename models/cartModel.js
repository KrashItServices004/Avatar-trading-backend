const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        required: true
    }



})

module.exports = mongoose.model('Cart', cartSchema);