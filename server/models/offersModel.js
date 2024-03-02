const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please Enter the product Name'],
        trim: true
    },

    description: {
        type: String,
        required: [true, 'Please Enter description'],
        trim: true
    },
    offerimage: {

        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },



})

module.exports = mongoose.model('Offer', offerSchema);