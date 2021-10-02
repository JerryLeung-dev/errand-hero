const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product must have a name'],
    trim: true,
    maxLength: [
      40,
      'The product name must have less  or equal to 40 characters'
    ],
    minLength: [
      3,
      'The product name must have at least or equal to 10 characters'
    ]
  },
  price: {
    type: Number,
    required: [true, 'product must have a price']
  },
  description: {
    type: String,
    required: [true, ' product must have a description']
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
