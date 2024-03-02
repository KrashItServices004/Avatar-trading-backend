// models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
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
  subcategories: [{ type: mongoose.Schema.ObjectId, ref: 'Subcategory' }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
