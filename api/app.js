const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//Routers
const productRoute = require('./routes/product.route');
const customerRoute = require('./routes/customer.route');

const app = express();
app.use(cors());

//Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/products', productRoute);
app.use('/api/v1/customers', customerRoute);

app.get('/', (req, res) => {
  res.send('Hello world');
});

module.exports = app;
