const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({
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
    distance: {
        type: Number,
        required: [true, 'Please Enter the Your Phone Number'],
    },
  

})

module.exports = mongoose.model('Delivery', deliverySchema);