// models/subsubcategory.js
const mongoose = require('mongoose');

const subsubcategorySchema = new mongoose.Schema({
  name: { type: String, unique: false },
});

const SubSubcategory = mongoose.model('SubSubcategory', subsubcategorySchema);

module.exports = SubSubcategory;
