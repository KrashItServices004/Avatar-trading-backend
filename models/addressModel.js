const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter the product Name'],
        trim: true
    },

    pincode: {
        type: Number,
        required: [true, 'Please Enter the your pin code'],
        maxLength: [6, 'pin code cannot exceed 6 characters']
    },
    phone: {
        type: Number,
        required: [true, 'Please Enter the Your Phone Number'],
    },
    address: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    }


})

module.exports = mongoose.model('Address', addressSchema);