// models/subcategory.js
const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: { type: String, unique: false },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  subSubcategories: [{ type: mongoose.Schema.ObjectId, ref: 'SubSubcategory' }],
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
