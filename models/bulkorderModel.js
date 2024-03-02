const mongoose = require('mongoose')

const bulkorderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter the product Name'],
        trim: true
    },

    location: {
        type: String,
        required: [true, 'Please Enter the your Location'],
        
    },
    phone: {
        type: Number,
        required: [true, 'Please Enter the Your Phone Number'],
    },
    requirementdetail: {
        type: String,
        required: true
    }





})

module.exports = mongoose.model('Bulkorder', bulkorderSchema);