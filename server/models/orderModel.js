const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({


    cart: {
        type: mongoose.Schema.ObjectId,
        ref: 'Cart'
    },
    adress: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address'
    },
  
    shippingPrice: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true
    },





})

module.exports = mongoose.model('Cart', orderSchema);