const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Product = require('../models/product.model');
const Customer = require('../models/customer.model');

dotenv.config({ path: '../../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(() => console.log('DB successfully connected'));

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8')
);
const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/customers.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Product.create(products);
    await Customer.create(customers);
    console.log('Data imported successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await Customer.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
