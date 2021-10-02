const mongoose = require('mongoose');
const slugify = require('slugify');

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'customer must have a name'],
    trim: true,
    maxLength: [
      25,
      'The product name must have less  or equal to 25 characters'
    ],
    minLength: [
      1,
      'The product name must have at least or equal to 1 characters'
    ]
  },
  slug: String,
  phone: {
    type: String,
    required: [true, 'customer must have a phone']
  },
  address: {
    type: String,
    required: [true, 'customer must have an address']
  },
  purchaseList: [
    {
      name: {
        type: String
      },
      quantity: {
        type: Number
      }
    }
  ]
});

customerSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
